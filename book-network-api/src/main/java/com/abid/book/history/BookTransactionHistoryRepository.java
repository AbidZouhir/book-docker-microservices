package com.abid.book.history;

import com.abid.book.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Integer> {
    Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageable, List<Book> books);
}
