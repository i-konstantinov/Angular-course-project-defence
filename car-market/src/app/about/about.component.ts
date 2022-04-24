import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private userService: UserService) {
    if (this.userService.loggedUser) {
      console.log(this.userService.currentUser?.email);
    } else {
      console.log('NO LOGGED USER');
    }
  }
  ngOnInit(): void {
  }
}
