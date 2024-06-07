import {Component, OnInit} from '@angular/core';
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BookService} from "../../../../services/services/book.service";
import {FeedBackResponse} from "../../../../services/models/feed-back-response";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {FeedBackService} from "../../../../services/services/feed-back.service";

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.css'
})
export class BorrowedBookListComponent implements OnInit{
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  feedBackRequest: FeedbackRequest = {bookId: 0, comment: "", note: 0};
  page =0;
  size = 3;
  selectedBook: BorrowedBookResponse | undefined = undefined;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedBackService
  ) {
  }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }
  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedBackRequest.bookId = book.id as number;

  }

  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.borrowedBooks = resp;
      }
    });
  }

  goToFirstPage() {
    this.page = 0
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(page : number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean{
    return this.page == this.borrowedBooks.totalPages as number - 1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () =>{
        if (withFeedback){
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedBack({
      body: this.feedBackRequest
    }).subscribe({
      next: () =>{

      }
    });
  }
}
