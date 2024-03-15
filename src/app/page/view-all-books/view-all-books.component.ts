import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all-books',
  standalone: true,
  imports: [],
  templateUrl: './view-all-books.component.html',
  styleUrl: './view-all-books.component.css'
})

export class ViewAllBooksComponent implements OnInit{
  private http;
  public bookList:any = { };

  constructor(private httpClient:HttpClient){
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadBooks();
  }
  loadBooks(){
    this.http.get('http://localhost:8080/book/get').subscribe((data)=> {
      console.log(data);
    })
  }
}
