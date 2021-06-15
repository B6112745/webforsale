import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { DevicesService } from '../../services/devices.service'
import { LocalStorageService } from 'angular-web-storage'
@Component({
  selector: 'app-adddevices',
  templateUrl: './adddevices.component.html',
  styleUrls: ['./adddevices.component.css']
})
export class AdddevicesComponent implements OnInit {

  deviceForm = new FormGroup({    
    name: new FormControl('',[Validators.required, Validators.pattern('^[ก-๙0-9a-zA-Z.\\s]+$')]),
    type: new FormControl('',[Validators.required]),    
    detail: new FormControl('',[Validators.required]),    
    price: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required])
  });

  deviceType: string[] = ['RAM','Hard disk','Monitor','CPU','Mouse','Keyboard','Printer'];

  previewLoaded: boolean = false;

  get name() {return this.deviceForm.get('name') as FormArray;}
  get detail() {return this.deviceForm.get('detail') as FormArray;}
  get quantity() {return this.deviceForm.get('quantity') as FormArray;}
  get price() {return this.deviceForm.get('price') as FormArray;}

  constructor(private ds : DevicesService,public local: LocalStorageService) { }
  token: any
  ngOnInit(): void {
  }

  addDevice(){
    this.token = this.local.get('user').token
    this.ds.addDevice(this.deviceForm.value,this.token).subscribe(
      data => {
        console.log(data)
        alert('Device added successfully');
        this.deviceForm.reset();
      },
      err => {
        console.log(err);
      }
    );
    window.location.reload();
  }

  onChangeImg(e : any){
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.deviceForm.patchValue({
            img: reader.result
          })
      }
    }
  }
  

  resetFrom() {
    this.deviceForm.reset();
    this.previewLoaded = false;
    }

}
