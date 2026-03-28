package com.tracker.finance.repository;

import com.tracker.finance.entity.Transaction;
import com.tracker.finance.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserOrderByTxnDateDesc(User user);
    Page<Transaction> findByUserOrderByTxnDateDesc(User user, Pageable pageable);
}
