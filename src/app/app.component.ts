import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authenticationservice: AuthenticationService){}
  
  ngOnInit(): void {
    this.authenticationservice.autoLogin();
  }
  title = 'OnBoarding';
  
}
