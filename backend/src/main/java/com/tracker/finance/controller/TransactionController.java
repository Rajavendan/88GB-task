package com.tracker.finance.controller;

import com.tracker.finance.dto.SummaryDTO;
import com.tracker.finance.dto.TransactionDTO;
import com.tracker.finance.entity.User;
import com.tracker.finance.service.TransactionService;
import com.tracker.finance.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;
    private final UserService userService;

    @GetMapping("/transactions")
    public ResponseEntity<Page<TransactionDTO>> getTransactions(
            @AuthenticationPrincipal UserDetails userDetails,
            Pageable pageable) {
        User user = getUser(userDetails);
        return ResponseEntity.ok(transactionService.getUserTransactions(user, pageable));
    }

    @GetMapping("/transactions/all")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getUser(userDetails);
        return ResponseEntity.ok(transactionService.getAllUserTransactions(user));
    }

    @PostMapping("/transactions")
    public ResponseEntity<TransactionDTO> createTransaction(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TransactionDTO transactionDTO) {
        User user = getUser(userDetails);
        return ResponseEntity.ok(transactionService.createTransaction(user, transactionDTO));
    }

    @PutMapping("/transactions/{id}")
    public ResponseEntity<TransactionDTO> updateTransaction(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody TransactionDTO transactionDTO) {
        User user = getUser(userDetails);
        return ResponseEntity.ok(transactionService.updateTransaction(user, id, transactionDTO));
    }

    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<Void> deleteTransaction(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getUser(userDetails);
        transactionService.deleteTransaction(user, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<SummaryDTO> getSummary(@AuthenticationPrincipal UserDetails userDetails) {
        User user = getUser(userDetails);
        return ResponseEntity.ok(transactionService.getSummary(user));
    }

    private User getUser(UserDetails userDetails) {
        return userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
