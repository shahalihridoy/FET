import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Ng2Webstorage } from "ngx-webstorage";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftAsideComponent } from './left-aside/left-aside.component';
import { RightAsideComponent } from './right-aside/right-aside.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthService } from "./auth.service";
import { DataService } from "./data.service";
import { ReversePipe } from './reverse.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContainerComponent } from './container/container.component';
import { SearchComponent } from './search/search.component';
import { StatusComponent } from './status/status.component';
import { SearchPipe } from './search.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { UpdateSemesterComponent } from './admin/update-semester/update-semester.component';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpModule } from '@angular/http';
import { CommentDirective } from './comment.directive';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'signup', component: SignupComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'search/:id', component: SearchComponent, pathMatch: 'full'},
  { path: 'upload', component: StatusComponent, pathMatch: 'full'},
  { path: 'edit-profile', component: ProfileComponent, pathMatch: 'full'},
  { path: 'admin', component: AdminLoginComponent, pathMatch: 'full'},
  { path: 'update-semester', component: UpdateSemesterComponent, pathMatch: 'full'},
  // { path: 'upload', canActivate: [AuthGuard], component: StatusComponent, pathMatch: 'full'},
  // { path: 'error', component: ErrorComponent, pathMatch: 'full'},
  { path: 'user/:id', component: UserProfileComponent, pathMatch: 'full'},
  { path: 'course/:id', component: ContainerComponent, pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftAsideComponent,
    RightAsideComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ReversePipe,
    SidebarComponent,
    ContainerComponent,
    SearchComponent,
    StatusComponent,
    SearchPipe,
    UserProfileComponent,
    ProfileComponent,
    AdminLoginComponent,
    UpdateSemesterComponent,
    CommentDirective
  ],

  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    PdfViewerModule,
    ModalModule.forRoot(),
    FormsModule,
    FilterPipeModule,
    Ng2Webstorage,

    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [AuthService,DataService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
