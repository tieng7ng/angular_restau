import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Response }     from '@angular/http';
import { environment }  from '../../environments/environment';
import { Observable }   from 'rxjs/Observable';
import { User }         from '../models/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  list = new Promise(resolve => {
  });


  /**
   * GET API
   * @param string path : url
   */
  getApi(path): Observable<any[]> {
    console.log('get  '+path);
    return this.http.get<any[]>(path);
  }

  /**
   * POST API
   * @param string path : url
   */
  postApi(path: string, params: any): Observable<any[]> {
    console.log('post  '+path);
    console.log(params);
    return this.http.post<any[]>(path, params);
  }

  /**
   * DELETE API
   * @param string path : url
   */
  deleteApi(path: string): Observable<any[]> {
    console.log('delete  '+path);
    return this.http.delete<any[]>(path);
  }

}
