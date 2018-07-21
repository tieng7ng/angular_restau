import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})

export class FormUserComponent implements OnInit {

  listUser  = [];
  langCurrent: string;

  //=====
  // Initialisation du formulaire
  // Formulaire à afficher
  userDisplay = 0;
  favoriteColor: string[];

  formUser: FormGroup;
  validationMessages = [];
  formErrors = {
    'firstName':      '',
    'favoriteColor':  ''
  };

  loading = false;
  errorMessage = '';
  // Initialisation du formulaire
  //=====


  constructor(private fb: FormBuilder
    , private httpClient: HttpClient
    , private route: ActivatedRoute
    , private user: UserService
    // Session
    , @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private translateService: TranslateService
  ) {
    console.log('>>>>>>>>>>>>>>>>>>>>>> foruser session', this.storage.get('lang'));
    this.langCurrent = this.storage.get('lang');
  }

  ngOnInit() {
    console.log('>>> this.ngOnInit 00');

    this.langCurrent = '';
    //=====
    // Analyse de la route
    this.route.paramMap.subscribe((params: ParamMap) => {

      const action = params.get('action');
      console.log(action);

      switch(action) {
        case 'add' :
          //=====
          // Ajouter
          this.formUser = this.fb.group({
            gender:         ['', Validators.required],
            login:          ['', [Validators.required, Validators.minLength(3)]],
            lastname:       ['', [Validators.required, Validators.minLength(3)]],
            firstname:      ['', [Validators.required, Validators.minLength(3)]],
            favoriteColor:  [''],
            birthday:       ['']
          })
          this.userDisplay = 1;
          break;
          // Ajouter
          //=====
        default :
          this.formUser = this.fb.group({
            id:             [''],
            gender:         [''],
            login:          [''],
            lastname:       [''],
            firstname:      [''],
            favoriteColor:  [''],
            birthday:       ['']
          })

          this.userDisplay = 0;
      }
    });
    // Analyse de la route
    //=====

    this.initValidationMessages();
  
    this.favoriteColor = ['', 'red', 'blue', 'green', 'yellow'];
  
    console.log('>>> this.ngOnInit 01');
    this.onChanges();


  }
  
  onChanges(): void {
    console.log('>> onChange');
    console.log(this.formUser);
    this.formUser.valueChanges
      .subscribe(data => {
        console.log('>> langCurrent ' + this.langCurrent);
        //=====
        // Changement de langue ?
        if (this.langCurrent != this.storage.get('lang')) {
          // initialisation des messages d'erreurs
          this.initValidationMessages();
          this.langCurrent = this.storage.get('lang');
        }
        // Changement de langue ?
        //=====

        this.onValueChanged(data)
      });

  }

  onValueChanged(data?: any) {
    console.log('>>>> onValueChanged');

    for (const field in this.formUser.controls) {
      this.formErrors[field] = '';

      const control = this.formUser.controls[field];
      console.log('>> field : '+field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field+'-minlength'];
        console.log('>> message ' + field + ' : '+ messages);
        console.log(this.validationMessages);
        for (const key in control.errors) {
          this.formErrors[field] = messages;
        } // for (const key in control.errors)
      } // if (control && control.dirty && !control.valid)
    } // for (const field in this.formUser.controls)
  } // onValueChanged(data?: any)


  public add() {
    console.log('>>> add');
    console.log(this.formUser.value.login);

    this.loading = true;

    const userData = this.formUser.value;
    console.log('>> user component add'+userData.lastname);

    let listTmp = this.user.add(userData);
    //let listTmp = this.user.getAll();
    listTmp.subscribe((response) => {
      console.log('list resolve');
      console.log(response);

      //******
      // Verification via recherche
      this.userDisplay = 0;
      //this.login = this.login;
      //this.search();
      // Verification via recherche
      //*****

      return response;
    },
    (error) => {
      this.errorMessage = error.message;
      this.loading = false; 
    },
    () => {
      this.loading = false;
    })

  }

  public search() {
    this.loading = true;
    const userData = this.formUser.value;

    console.log('>> user component search'+userData.lastname);
    let listTmp = this.user.getAll(userData.login, userData.firstname, userData.lastname);
    //let listTmp = this.user.getAll();
    listTmp.subscribe((response) => {
      console.log('list resolve', response['result']);
      this.listUser = response['result']['users'];
      return response;
    },
    (error) => {
      this.errorMessage = error.message; 
      this.loading = false; 
    },
    () => {this.loading = false;})
  }

  public displayForm(user) {
    console.log('user component update :' + user.login);
    this.formUser.controls['login'].setValue(user.login);
    this.formUser.controls['firstname'].setValue(user.firstname);
    this.formUser.controls['lastname'].setValue(user.lastname);
    this.userDisplay  = 1;
  }

  /**
   * Fonction qui initialise "validationMessages" avec la langue en paramètre
   */
  initValidationMessages() {
//    this.translateService.use(lang);
    console.log(">>> initValidationMessages");

      this.getTranslate('login','required','login require');
      this.getTranslate('login','minlength', 'login min 3 chars');
      this.getTranslate('firstname','required','firstname require');
      this.getTranslate('firstname','minlength', 'firstname min 3 chars');
      this.getTranslate('lastname','required','lastname require');
      this.getTranslate('lastname','minlength', 'lastname min 3 chars');
      this.getTranslate('favoriteColor','required','favoriteColor require');
  }
  // Fonction qui initialise "validationMessages" avec la bonne langue en paramètre
  //=====

  /**
   * 
   * @param key1 
   * @param key2 
   * @param translate 
   */
  getTranslate(key1, key2, translate) {
    this.translateService.get(translate).subscribe(
      translation => {
        console.log('>>> getTranslate = '+ key1 + ' ' + key2 + " - " +translate+' : ' + translation );
        this.validationMessages[key1+'-'+key2] = translation;
      }
    );
  }

}
