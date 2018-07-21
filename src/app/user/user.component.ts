import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';
import { last } from 'rxjs/operator/last';

import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  private displayValue:string = '';

  loading = false;
  errorMessage = '';

  userDisplay = 0;


  listUser  = [];
  id        = '';
  login     = '';
  firstname = '';
  lastname  = '';

  
  //*****
  // constructor
  constructor(title: Title
    , meta: Meta
    , private httpClient: HttpClient
    , private route: ActivatedRoute
    , private user: UserService
  ) {
    // Titre de la fenetre
    title.setTitle('USER titleX');
    
    meta.addTag({
      author: 'Tieng Dung NGUYEN'
    });
  }
  // constructor
  //*****


  ngOnInit() {
    console.log('> user component init');
    this.route.paramMap.subscribe((params: ParamMap) => {
      const action = params.get('action');
      console.log('>>> '+action);
      switch(action) {
        case 'add' :
          this.userDisplay = 1;
          break;
        default :
          this.userDisplay = 0;
      }
    });
  }


  asyncGreeting = new Promise(resolve => { // after 1 second, the promise will resolve 
    console.log('>> user component asyncGreeting');
    //*****
    // window.setTimeout
    window.setTimeout(() => { 
      resolve('hello');
      // cacher message d'attente
      this.displayValue='none';
      }
    , 7000);
    // window.setTimeout
    //*****

  });
  
  asyncUser = new Promise(resolve => {
    window.setTimeout(() => resolve({name: 'cedric'}), 3000);
  })

  /**
   * 
   */
  public list = new Promise(resolve => {
    this.loading = true;

    console.log('>> user component list');
    let listTmp = this.user.getAll(this.login, this.firstname, this.lastname);
    //let listTmp = this.user.getAll();
    listTmp.subscribe((response) => {
      console.log('list resolve', response['result']['users']);
      this.listUser = response['result']['users'];
      resolve (response);
    },
    (error) => {
      this.errorMessage = error.message; this.loading = false; 
    },
    () => {this.loading = false;})
  });


  public search() {
    this.loading = true;

    console.log('>> user component search '+this.lastname);
    let listTmp = this.user.getAll(this.login, this.firstname, this.lastname);
    //let listTmp = this.user.getAll();
    listTmp.subscribe((response) => {
      console.log('list resolve', response);
      this.listUser = response['result']['users'];
      return response;
    },
    (error) => {
      this.errorMessage = error.message; 
      this.loading = false; 
    },
    () => {this.loading = false;})
  }

  public delete(login: string) {
    console.log('user component delete ' + login);

    this.loading = true;
    console.log('>> user component add'+this.lastname);
    let listTmp = this.user.delete(login);
    //let listTmp = this.user.getAll();
    listTmp.subscribe((response) => {
      console.log('list resolve');
      console.log(response);

      //******
      // Verification via recherche
      this.userDisplay = 0;
      this.login = this.login;
      this.search();
      // Verification via recherche
      //*****

      return response;
    },
    (error) => {
      this.errorMessage = error.message; this.loading = false; 
    },
    () => {
      this.loading = false;
    })
  }

  public displayForm(user) {
    console.log('>>user component update : ');
    console.log('>>user component update : ');
    
    console.log(user.get('id').value);
    this.id           = user.id;
    this.login        = user.login;
    this.firstname    = user.firstname;
    this.lastname     = user.lastname;
    this.userDisplay  = 2;
  }

  private reset() {
    this.listUser  = [];
    this.login     = '';
    this.firstname = '';
    this.lastname  = '';  
  }

}
