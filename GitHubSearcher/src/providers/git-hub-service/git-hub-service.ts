import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Repository } from '../../models/repositories.interface'
import { User } from '../../models/user.interface';
import { USER_LIST } from '../../mocks/user.mocks';
import { REPOSITORY_LIST } from '../../mocks/repository.mocks'
import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/map';
import 'rxjs/add/operator/do';
// import 'rxjs/add/observable/catch';
// import 'rxjs/add/observable/throw';


@Injectable()
export class GitHubServiceProvider {

  baseUrl: string = 'https://api.github.com/users';
  reposUrl: string = "repos";

  constructor(private http: HttpClient) {
    console.log('Hello GitHubServiceProvider Provider');
  }

  getUserInfo(username: string): Observable<User> {
    var gitres = this.http.get(`${this.baseUrl}/${username}`)
    .do((res : Response ) => console.log(res))
    return gitres; 
    // return this.http.get(`${this.baseUrl}/${username}`).map((data: Response) => data.json());
  }

  getRepoInfo(username: string): Observable<Repository> {
    //`${this.baseUrl}/${username}/${this.reposUrl}`
    let repourl = this.baseUrl+"/"+username+"/"+this.reposUrl;
    return this.http.get(repourl)
    .do((res : Response ) => console.log(res))
  }

  mockGetUserInfo(username: string): Observable<User> {
    return Observable.of(USER_LIST.filter(user => user.name === username)[0])
  }

  mockGetRepoInfo(username: string): Observable<Repository[]> {
    return Observable.of(REPOSITORY_LIST.filter(repository => repository.owner.name === username));
  }

}
