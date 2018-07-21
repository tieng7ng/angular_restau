import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule }      from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StorageServiceModule } from 'angular-webstorage-service';

import { ApiService }       from './services/api.service';
import { UserService }      from './services/user.service';
import { AuthenticationService }  from './services/authentification.service';
import { FileService }      from './services/file.service';
import { UserComponent }    from './user/user.component';
import { FormUserComponent } from './user/form-user.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FormUserComponent,
    AuthComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    StorageServiceModule
  ],
  providers: [ ApiService, FileService, UserService , AuthenticationService],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
