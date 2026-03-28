package com.tracker.finance.service;

import com.tracker.finance.dto.SummaryDTO;
import com.tracker.finance.dto.TransactionDTO;
import com.tracker.finance.entity.Transaction;
import com.tracker.finance.entity.User;
import com.tracker.finance.exception.ResourceNotFoundException;
import com.tracker.finance.exception.UnauthorizedException;
import com.tracker.finance.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public Page<TransactionDTO> getUserTransactions(User user, Pageable pageable) {
        return transactionRepository.findByUserOrderByTxnDateDesc(user, pageable)
                .map(this::convertToDTO);
    }

    public List<TransactionDTO> getAllUserTransactions(User user) {
        return transactionRepository.findByUserOrderByTxnDateDesc(user)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TransactionDTO createTransaction(User user, TransactionDTO dto) {
        Transaction transaction = Transaction.builder()
                .title(dto.getTitle())
                .amount(dto.getAmount())
                .type(dto.getType())
                .category(dto.getCategory())
                .txnDate(dto.getTxnDate())
                .notes(dto.getNotes())
                .user(user)
                .build();
        return convertToDTO(transactionRepository.save(transaction));
    }

    public TransactionDTO updateTransaction(User user, Long id, TransactionDTO dto) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to update this transaction");
        }

        transaction.setTitle(dto.getTitle());
        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setCategory(dto.getCategory());
        transaction.setTxnDate(dto.getTxnDate());
        transaction.setNotes(dto.getNotes());

        return convertToDTO(transactionRepository.save(transaction));
    }

    public void deleteTransaction(User user, Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to delete this transaction");
        }

        transactionRepository.delete(transaction);
    }

    public SummaryDTO getSummary(User user) {
        List<Transaction> transactions = transactionRepository.findByUserOrderByTxnDateDesc(user);

        BigDecimal totalIncome = transactions.stream()
                .filter(t -> t.getType() == Transaction.TransactionType.INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = transactions.stream()
                .filter(t -> t.getType() == Transaction.TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, BigDecimal> categoryExpenses = transactions.stream()
                .filter(t -> t.getType() == Transaction.TransactionType.EXPENSE)
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));

        return SummaryDTO.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .balance(totalIncome.subtract(totalExpense))
                .categoryExpenses(categoryExpenses)
                .build();
    }

    private TransactionDTO convertToDTO(Transaction t) {
        return TransactionDTO.builder()
                .id(t.getId())
                .title(t.getTitle())
                .amount(t.getAmount())
                .type(t.getType())
                .category(t.getCategory())
                .txnDate(t.getTxnDate())
                .notes(t.getNotes())
                .build();
    }
}
