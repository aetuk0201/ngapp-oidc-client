import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() isLoggedIn = false;
  @Output() btnClick = new EventEmitter<boolean>();
  userName: string | undefined;
  userId: string | undefined;
  
  constructor(private _authService: AuthService) {

    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;

      this.userId = localStorage.getItem("userId")?.toString();
      this.userName = localStorage.getItem("userName")?.toString();

      console.log(this.userId, this.userName);

    });

   }

  ngOnInit(): void {
   
    
    // console.log('======= nav bar =======');
    // console.log(this.isLoggedIn);

    // this._authService.isLoggedIn().then(loggedIn => {
    //     this.isLoggedIn = loggedIn;
    // });
  }

  
  login() {
    //this._authService.login();
    this.btnClick.emit(true);
  }

  logout() {
    //this._authService.logout();
    this.btnClick.emit(false);
  }

}
