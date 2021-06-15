import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../services/devices.service'
import { LocalStorageService } from 'angular-web-storage'
@Component({
  selector: 'app-updatedevices',
  templateUrl: './updatedevices.component.html',
  styleUrls: ['./updatedevices.component.css']
})
export class UpdatedevicesComponent implements OnInit {

  devices: any;
  token:any;
  constructor(public local: LocalStorageService,private ds : DevicesService) { 

    this.onLoading();
  }

  ngOnInit(): void {
  }

  onLoading(){
    try {
      this.token = this.local.get('user').token
      this.ds.getDevice(this.token).subscribe(
        data => {
          this.devices = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
  }


}
