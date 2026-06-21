package com.belek.library.repository;

import com.belek.library.model.Loan;
import com.belek.library.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    List<Loan> findByUser(User user);

    List<Loan> findByReturnDateIsNull();
}