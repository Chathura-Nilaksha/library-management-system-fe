import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavComponent } from "../../common/nav/nav.component";

@Component({
    selector: 'app-view-all-books',
    standalone: true,
    templateUrl: './view-all-books.component.html',
    styleUrl: './view-all-books.component.css',
    imports: [HttpClientModule, CommonModule, FormsModule, NavComponent]
})

export class ViewAllBooksComponent implements OnInit{
  private http;
  public bookList:any = { };
  public selectedBook: any;

  constructor(private httpClient:HttpClient){
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(){
    this.http.get("http://localhost:8080/book/get").subscribe((data)=> {
      this.bookList = data;
      console.log(this.bookList);
    });
  }
  deleteBook(){
    let api="http://localhost:8080/book/"+this.selectedBook;
    this.http.delete(api,{responseType:'text'}).subscribe((response:string)=>{
      console.log(response);
      this.loadBooks();
      Swal.fire({
        title: "DELETED!",
        text: `${this.selectedBook.title} book is deleted`,
        icon: "success"
      });
      this.selectedBook=null;
    });
  }
  setSelectedBook(book:any){
    this.selectedBook=book;
  }


  saveBook(){
    let postApi="http://localhost:8080/book/add";
    this.http.post(postApi, this.selectedBook).subscribe((data)=>{
      console.log("saved!");
      this.loadBooks();
      Swal.fire({
        title: "UPDATED!",
        text: `${this.selectedBook.title} book is updated`,
        icon: "success"
      });
      this.selectedBook=null;
    })
  } 
  
  
}
