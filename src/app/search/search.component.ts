import { Component,OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from "angularfire2/storage";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private storage:AngularFireStorage,private route:ActivatedRoute,private spinner: NgxSpinnerService, private db: AngularFireDatabase,private router: Router, public service: DataService) { }
  data : Observable<any>;
  users: Observable<any>;
  showEditOption:boolean = false;
  tag: string = "Write something to edit...";
  updateKey: string = null;

  term = {fileName:""};
  isDataLoaded = true;
  found = false;

  ngOnInit() {

    this.route.params.subscribe(params=>{

      // show the spinner
      this.spinner.show();

      this.term.fileName = params['id'].trim();

      // load data for once only
      if(this.isDataLoaded){

        this.data = this.db.list('/post/').snapshotChanges().pipe(map(changes=>{
        
          if(changes.length != 0){
  
            return changes.map(c=>({
              key: c.payload.key,
              user: this.db.object("user/"+c.payload.val()['uid']).valueChanges(),
              ...c.payload.val()
            }));
  
          }
  
          else {
            this.spinner.hide();
            // this.router.navigate(['error']);
          }
  
        }));
      }
      

      // after loading all data, close spinner
      this.data.subscribe(e=>{

        if (e != undefined) {
          if(e.length > 0){
            this.spinner.hide();
          }
        }
      });

    });
      
  }

  // delete post
  delete(key:string,uid:string,semester:string,course: string,file:string){
   this.db.list("post/"+key).remove();
    this.storage.ref("uploads/"+semester+"/").child(course.substr(0,3).toUpperCase()+"-"+course.substr(3,course.length).toUpperCase()+"/"+file).delete();
  }
  // delete post ends here

  // edit post
  edit(key: string, tagLine: string){
    this.showEditOption = true;
    this.tag = tagLine;
    this.updateKey = key;
  }
  post(){
    var temp = this.updateKey;
    if(this.updateKey){
      this.db.list("post/").update(this.updateKey,{tag: this.tag});
      this.showEditOption = !this.showEditOption;
    }
  }
  // cancel edit option 
  cancel(){
    this.showEditOption = !this.showEditOption;
  }

}



