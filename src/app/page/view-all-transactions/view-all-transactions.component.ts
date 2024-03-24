import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../common/nav/nav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-transactions',
  standalone: true,
  imports: [NavComponent, HttpClientModule, CommonModule],
  templateUrl: './view-all-transactions.component.html',
  styleUrl: './view-all-transactions.component.css'
})
export class ViewAllTransactionsComponent implements OnInit{

  public allTransactions:any=[ ];

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.loadTransactions();
    
  }
  loadTransactions(){
    this.http.get("http://localhost:8082/get-all").subscribe(data=>{
      console.log(data);
      this.allTransactions=data;
    });
  }

}
