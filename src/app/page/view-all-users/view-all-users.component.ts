import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavComponent } from "../../common/nav/nav.component";

@Component({
    selector: 'app-view-all-users',
    standalone: true,
    templateUrl: './view-all-users.component.html',
    styleUrl: './view-all-users.component.css',
    imports: [HttpClientModule, FormsModule, CommonModule, NavComponent]
})
export class ViewAllUsersComponent implements OnInit {
  public userList: any;
  private baseUrl: String = "http://localhost:8080/";
  public selectedUser:any = {
    "id": null,
    "firstName": null,
    "lastName": null,
    "userName": null,
    "email": null,
    "address1": null,
    "address2": null,
    "phoneNumber": null,
    "country": null,
  };

  constructor(private http: HttpClient, public router:Router) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.http.get(this.baseUrl + "/user/get-all-users").subscribe((res: any) => {
      console.log(res);
      this.userList = res;
    });
  }
  setSelectedUser(user: any) {
    this.selectedUser = user;
    console.log(this.selectedUser);
  }
  deleteUser() {
    this.http.delete(this.baseUrl + "/user/delete/"+ this.selectedUser.id, {responseType:'text'}).subscribe((res:string) => {
      console.log(res);
      this.selectedUser = {
        "id": null,
        "firstName": null,
        "lastName": null,
        "userName": null,
        "email": null,
        "address1": null,
        "address2": null,
        "phoneNumber": null,
        "country": null,
      };
      this.loadUsers();
      Swal.fire({
        title: "DELETED!",
        text: `${this.selectedUser.userName} is been deleted successfully`,
        icon: "success"
      });
    });
  }
  saveUser() {
    this.http.post(this.baseUrl + "/user/add-user", this.selectedUser).subscribe((res: any) => {
      this.selectedUser = {
        "id": null,
        "firstName": null,
        "lastName": null,
        "userName": null,
        "email": null,
        "address1": null,
        "address2": null,
        "phoneNumber": null,
        "country": null,
      };
      this.loadUsers();
      console.log(res);
      Swal.fire({
        title: "UPDATED!",
        text: `The user with the username of ${this.selectedUser.userName} is been updated`,
        icon: "success"
      });
    });
    
  }

}
