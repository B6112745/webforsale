import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DevicesService } from '../../services/devices.service'

@Component({
  selector: 'app-adddevices',
  templateUrl: './adddevices.component.html',
  styleUrls: ['./adddevices.component.css']
})
export class AdddevicesComponent implements OnInit {

  deviceForm = new FormGroup({    
    name: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),    
    description: new FormControl('',[Validators.required]),    
    price: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    id: new FormControl('',[Validators.required])
  });

  deviceType: string[] = ['RAM','Hard disk','Monitor','CPU','Mouse','Keyboard','Printer'];

  previewLoaded: boolean = false;

  constructor(private ds : DevicesService) { }

  ngOnInit(): void {
  }

  addDevice(){
    this.ds.addDevice(this.deviceForm.value).subscribe(
      data => {
        console.log(data)
        alert('Device added successfully');
        this.deviceForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  resetFrom() {
    this.deviceForm.reset();
    this.previewLoaded = false;
    }

}
