import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GitHubServiceProvider } from '../../providers/git-hub-service/git-hub-service';
import { User } from '../../models/user.interface';
import { Repository } from '../../models/repositories.interface'

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  userName : string;
  user : User;
  repositories : Repository[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private GitHub : GitHubServiceProvider) {
  }

  getUserInfo(){
    // this.userName = this.navParams.get("userText");
    this.GitHub.getUserInfo(this.userName).subscribe(data => 
      {
        this.user = data
      }
    );

    this.GitHub.getRepoInfo(this.userName).subscribe(repo =>{
      {
        this.repositories = repo;
      }
    })
  }

  ionViewWillEnter(){
    this.userName = this.navParams.get('userText');
    this.getUserInfo();
  }

}
