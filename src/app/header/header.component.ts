import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Inject, Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { FileService } from '../services/file.service';

import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AuthenticationService } from '../services/authentification.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() messageHeadIdentity : string;

  private COUNTRY_DE = "/assets/images/de.png";
  private COUNTRY_UK = "/assets/images/bg.png";
  private COUNTRY_FR = "/assets/images/fr.png";
  




  // defining translate as a private property
  translate: TranslateService;

  fileSrv: FileService;

  // Tableau des labels
  tabLang: any;

  identity : string;

  /**
   * change lang
   */
  switchLanguage = (lang: string) => {
console.log('<<<<');
    // invoking `use()`
    this.translate.use(lang);
console.log('<<<<');
    //=====
    // Utilisation d'une table de label
    this.fileSrv = new FileService();
    this.tabLang = this.fileSrv.loadJSON('/assets/i18n/' + lang + '.json');
    // Utilisation d'une table de label
    //=====

    this.storage.set('lang', lang);
    if (this.storage.get('identity') == '') {
      this.identity = this.tabLang['anonymous'];
    }
    
  }

  constructor(translate: TranslateService
    , @Inject(SESSION_STORAGE) private storage: WebStorageService
    , private authService : AuthenticationService
  ) {
    console.log('appComponent constructor ');
    // binding the injected `TranslatedService` to the local `translate` property
    this.translate = translate;
    translate.setDefaultLang('en');

    //=====
    // Utilisation d'une table de label
    this.fileSrv = new FileService();
    this.tabLang = this.fileSrv.loadJSON('/assets/i18n/en.json');
    // Utilisation d'une table de label
    //=====

    if (this.storage.get('identity') == '') {
      this.identity = this.tabLang['anonymous'];
    }
    console.log('lang : '+this.storage.get('lang'));

    if (this.storage.get('lang') == '') {
      //=====
      // init session
      this.storage.set('lang', 'en');
      this.storage.set('identity', '');
      this.storage.set('token','');
      // init session
      //=====

    }
  }

  ngOnInit() {
    console.log('appComponent ngOnInit ');
    console.log(this.storage.get('identity'));
    
    if (this.storage.get('identity') == '') {
      this.identity = this.tabLang['anonymous'];
    } else {
      this.identity = this.storage.get('identity');
    }
    this.messageHeadIdentity = this.storage.get('identity');

  }









  logout() {
    this.authService.logout();
  }
}
