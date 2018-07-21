
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable()
export class AuthenticationService {
    constructor(private apiService: ApiService
        , @Inject(SESSION_STORAGE) private storage: WebStorageService
        , private router: Router
    ) { }

    /**
     * Appel à l'API user pour générer TOKEN (email + password)
     * @param email 
     * @param password 
     */
    login(email: string, password: string) {
        //        return this.http.post<any[]>('/user/signin', { email: email, password: password });
        console.log('login ' + environment.USER_API_ROOT + '/user/signin');
        console.log(password, email);

        return this.apiService.postApi(environment.USER_API_ROOT + '/signin'
            , { email: email, password: password });
    } // login(email: string, password: string)

    logout() {
        // remove user from local storage to log user out
        this.storage.set('identity', '');
        this.storage.set('token', '');
        this.router.navigate(['/']);
        
    }

}