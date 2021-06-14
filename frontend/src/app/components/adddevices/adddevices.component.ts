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
    detail: new FormControl('',[Validators.required]),    
    price: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required])
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
