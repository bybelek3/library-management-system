package com.belek.library.controller;

import com.belek.library.model.Loan;
import com.belek.library.service.LoanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "*")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping("/borrow")
    public Loan borrowBook(@RequestParam Long userId, @RequestParam Long bookId) {
        return loanService.borrowBook(userId, bookId);
    }

    @PutMapping("/return/{loanId}")
    public Loan returnBook(@PathVariable Long loanId) {
        return loanService.returnBook(loanId);
    }

    @GetMapping
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/active")
    public List<Loan> getActiveLoans() {
        return loanService.getActiveLoans();
    }

    @GetMapping("/user/{userId}")
    public List<Loan> getUserLoans(@PathVariable Long userId) {
        return loanService.getUserLoans(userId);
    }
}