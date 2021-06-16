import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  product : HistoryService|any = [];
  userid : any;
  token : any
  constructor(public local: LocalStorageService,private hs:HistoryService) { 
    this.userid = this.local.get('user').result.id
    this.token = this.local.get('user').token
   this.hs.getHistory(this.userid,this.token).subscribe(
     data => {
      this.product = data
      console.log(data)
     },err => {
      console.log(err)
     }
   )
  }

  ngOnInit(): void {
  }


}
