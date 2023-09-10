import { AppUser } from './../shared/Models/appUser.model';
import { Injectable } from '@angular/core';
import { UserManager, User } from "oidc-client";
import { Subject } from 'rxjs';
import { Constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User | null = null;
  private _loginChangedSubject = new Subject<boolean>();
  appUser: AppUser | null = null;

  loginChanged = this._loginChangedSubject.asObservable();

  constructor() {

    const stsSettings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientAppRoot}signin-callback`,
      scope: 'openid profile familyaffair.fullaccess familyaffairgateway.fullaccess',
      response_type: 'code',
      post_logout_redirect_url: `${Constants.clientAppRoot}signout-callback`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${Constants.clientAppRoot}assets/silent-callback.html`
    };

    this._userManager = new UserManager(stsSettings);

    this._userManager.events.addAccessTokenExpired(_ => {
      this._loginChangedSubject.next(false);
    });

    this._userManager.events.addUserLoaded(user => {
      if (this._user !== user) {
        this._user = user;
        
        localStorage.setItem('userId', user.profile?.id);
        localStorage.setItem('userName', user.profile?.userName);

        this._loginChangedSubject.next(!!user && !user.expired);
      }
    });


  }

  login() {
    return this._userManager.signinRedirect().then(result => {
       this._loginChangedSubject.next(true);
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this._userManager.getUser().then(user => {
      const userCurrent = !!user && !user.expired;

      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }

      this._user = user;
     
      return userCurrent;
    });
  }

  completeLogin() {

    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });

  }

  logout() {
    this._userManager.signoutRedirect();
  }

  completeLogout() {
    this._user = null;
    this.appUser = null;

    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    this._loginChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }

  getAccessToken() {
    return this._userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
      else {
        return null;
      }
    });
  }

  // loadSecurityContext() {
  //   this._httpClient
  //     .get<AuthContext>(`${Constants.apiRoot}Projects/AuthContext`)
  //     .subscribe(
  //       context => {
  //         this.authContext = new AuthContext();
  //         this.authContext.claims = context.claims;
  //         this.authContext.userProfile = context.userProfile;
  //       },
  //       error => console.error(error)
  //     );
  // }

}
