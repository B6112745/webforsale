import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../services/devices.service'

@Component({
  selector: 'app-updatedevices',
  templateUrl: './updatedevices.component.html',
  styleUrls: ['./updatedevices.component.css']
})
export class UpdatedevicesComponent implements OnInit {

  devices: any;

  constructor(private ds : DevicesService) { 

    this.onLoading();
  }

  ngOnInit(): void {
  }

  onLoading(){
    try {
      this.ds.getDevice().subscribe(
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
