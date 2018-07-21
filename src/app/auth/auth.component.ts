import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentification.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    
    messageIdentity : string;

    constructor(private fb: FormBuilder
        , private httpClient: HttpClient
        , private route: ActivatedRoute
        , private router: Router
        , private user: UserService
        , private authService: AuthenticationService
        // Session
        , @Inject(SESSION_STORAGE) private storage: WebStorageService
        , private translateService: TranslateService) {
    }

    ngOnInit() {
    }

    login() {
        this.loading = true;
        console.log('>> login');
        let resultPostApi = this.authService.login(this.model.username, this.model.password);


        //=====
        // Traitement API
        resultPostApi.subscribe((response) => {
            this.storage.set('token', response['token']);
            this.storage.set('identity', response['firstname'] + ' ' + response['lastname'].toUpperCase());
            
            // Passage de l'identifiant dans le header
            this.messageIdentity =  this.storage.get('identity');
            
            console.log('list resolve');
            console.log('session identity ' + this.storage.get('identity'));
            console.log('session token ' + response['token']);
            //this.router.navigate(['/user']);

        },
        (error) => {
            console.log('error');
            this.storage.set('token', '');
            console.log('session token' + this.storage.get('token'));
            // this.errorMessage = error.message;
            // this.loading = false; 
        },
        () => {
            console.log('default');
    //        this.storage.set('token', '');
            // default
            //this.loading = false;
        });
        // Traitement API
        //=====
        console.log('return login');

        console.log('session token' + this.storage.get('token'));
        this.loading = false;
    }


}




/*
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AlertService, AuthenticationService } from '../_services/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
*/