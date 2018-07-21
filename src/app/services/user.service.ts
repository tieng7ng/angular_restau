import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { last } from 'rxjs/operators';
import { query } from '@angular/core/src/animation/dsl';

@Injectable()
export class UserService {

  constructor(private apiService : ApiService) { }

  /**
   * Liste des utilisateurs
   */
  public getAll(login: string, firstname: string, lastname: string) {
    //*****
    // Initialisation des champs
    var tabField = new Array();
    tabField["login"]     = login;
    tabField["firstname"] = firstname;
    tabField["lastname"]  = lastname;
    // Initialisation des champs
    //*****
    
    console.log('>> user service getAll');
    console.log(tabField);

    let bQuery = false;
    let sQuery = '';

    //*****
    // Construction url query
    for(var index in tabField)
    {      
      if (tabField[index].length > 0) {
        console.log(bQuery);
        if (bQuery) {
          sQuery = sQuery + '&' + index + '=' + tabField[index];
        } else {
          sQuery = '?' + index + '=' + tabField[index];
        }
        bQuery = true;
      }
    // Construction url query
    //*****
    }

    console.log(sQuery);

    let resultGetApi = this.apiService.getApi(environment.USER_API_ROOT+sQuery);
    return resultGetApi;
  }

  public add(user) {
    console.log('user service add');
    let resultPostApi = this.apiService.postApi(environment.USER_API_ROOT
      , {login: user.login, firstname: user.firstname, lastname: user.lastname});
    return resultPostApi;
  }

  public delete(login: string) {
    console.log('user service delete');
    let resultPostApi = this.apiService.deleteApi(environment.USER_API_ROOT + '/' + login);
    return resultPostApi;
  }

  public authent(user) {
    console.log('user service add');
    let resultPostApi = this.apiService.postApi(environment.USER_API_ROOT + '/'
      , {login: user.login, firstname: user.firstname, lastname: user.lastname});
    return resultPostApi;
  }
}
