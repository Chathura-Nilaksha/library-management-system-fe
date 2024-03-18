import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-users',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './view-all-users.component.html',
  styleUrl: './view-all-users.component.css'
})
export class ViewAllUsersComponent implements OnInit {
  public userList: any;
  private baseUrl: String = "http://localhost:8080/";
  public selectedUser = {
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

  constructor(private http: HttpClient) {
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
  }
  deleteUser() {
    this.http.post(this.baseUrl + "/user/delete", this.selectedUser).subscribe((res: any) => {
      console.log(res);
    });
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
  }
  saveUser(selectedUserr:any) {
    this.selectedUser = selectedUserr;
    this.http.post(this.baseUrl + "/user/add-user", this.selectedUser).subscribe((res: any) => {
      console.log(res);
    });
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
  }

}
