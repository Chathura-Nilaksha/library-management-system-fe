import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavComponent } from '../../common/nav/nav.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [NavComponent, RouterLink, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

  constructor(private http:HttpClient){
  }
  public book:any={
    isbn:"",
    title:"",
    author:"",
    category:"",
    qty:""
  }

  addBook(){
    console.log(this.book);
    this.http.post("http://Localhost:/8081/book/add", this.book).subscribe(data=>{
      console.log("Add Book");
      Swal.fire({
        position: "center",
        showConfirmButton:false,
        timer:1500,
        title: `${this.book.title} is been added`,
        icon: "success"
      });
    })

  }
}
