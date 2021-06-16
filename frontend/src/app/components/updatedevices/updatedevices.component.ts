import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../services/devices.service'
import { LocalStorageService } from 'angular-web-storage'
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-updatedevices',
  templateUrl: './updatedevices.component.html',
  styleUrls: ['./updatedevices.component.css']
})
export class UpdatedevicesComponent implements OnInit {
  deviceForm = new FormGroup({    
    name: new FormControl('',[Validators.required, Validators.pattern('^[ก-๙0-9a-zA-Z.\\s]+$')]),
    type: new FormControl('',[Validators.required]),    
    detail: new FormControl('',[Validators.required]),    
    price: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    id: new FormControl(''),
  });
  devices: any;
  token:any;
  constructor(public local: LocalStorageService,private ds : DevicesService) { 

    this.onLoading();
  }
  get name() {return this.deviceForm.get('name') as FormArray;}
  get detail() {return this.deviceForm.get('detail') as FormArray;}
  get quantity() {return this.deviceForm.get('quantity') as FormArray;}
  get price() {return this.deviceForm.get('price') as FormArray;}
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

  deldevice(id : any){
    try {
      this.token = this.local.get('user').token
      this.ds.delDevice(this.token,id).subscribe(
        data => {
          this.devices = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
    window.location.reload();
  }
  updatedevices(){
    this.deviceForm.get('id')?.setValue(this.devices[0].id)
    this.deviceForm.get('name')?.setValue(this.devices[0].name)
    this.deviceForm.get('type')?.setValue(this.devices[0].type)
    this.deviceForm.get('detail')?.setValue(this.devices[0].detail)
    this.deviceForm.get('price')?.setValue(this.devices[0].price)
    this.deviceForm.get('quantity')?.setValue(this.devices[0].quantity)
    
    console.log(this.deviceForm.value)
  }
  updatedevice(){
    console.log(this.deviceForm.value)
    try {
      this.token = this.local.get('user').token
      this.ds.updatedevice(this.token,this.deviceForm.value).subscribe(
        data => {
         
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
    window.location.reload();
  }


}
