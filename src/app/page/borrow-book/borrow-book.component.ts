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

  constructor(http:HttpClient){
    this.http=http;
  }

  // searchUser(){
  //   console.log(this.userName);
  //   this.http.get(`http://localhost:8080/user/find-by-user-name/${this.userName}`).subscribe(data=>{
  //     console.log(data);
  //     this.user=data;
  //   })
  // }

}
