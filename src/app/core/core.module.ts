import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';


@NgModule({
  declarations: [
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
