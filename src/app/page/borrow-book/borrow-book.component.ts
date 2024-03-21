import { Component } from '@angular/core';
import { NavComponent } from '../../common/nav/nav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrow-book',
  standalone: true,
  imports: [NavComponent, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './borrow-book.component.html',
  styleUrl: './borrow-book.component.css'
})
export class BorrowBookComponent {
  public user:any;
  public bookId:any="";
  public borrowBook:any={
    userId:"",
    bookId:"",
    date:new Date(),
    fine:"",
    qty:""
  }
  private http;
  public userName:String="";
  public searchBookRes:any;
  public cartList:any=[ ]

  bookIds:any=[ ];



  constructor(http:HttpClient){
    this.http=http;
  }

  searchUser(){
    console.log(this.userName);
    this.http.get(`http://localhost:8080/user/find-by-user-name/${this.userName}`).subscribe(data=>{
      console.log(data);
      this.user=data;
    });
  }
  searchBook(){
    this.http.get(`http://localhost:8080/book/search/${this.bookId}`).subscribe(data=>{
      console.log(data);
      //sweet alert===get at home===ss 3nos at about 11.13am
    });
  }

  loadBookIds(){
    this.cartList.forEach((element:any) => {
      this.bookIds.push(element.id);
    });
  }
  borrowBooks(){
    this.loadBookIds();
    const borrowBook:any={
      borrowId:this.user.id,
      books:this.bookIds,
      date:new Date(),
      fine:""
    }
    console.log(borrowBook);
    
  }

}
