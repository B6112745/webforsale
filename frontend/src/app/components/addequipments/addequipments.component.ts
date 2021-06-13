import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EquipmentsService } from '../../services/equipments.service'

@Component({
  selector: 'app-addequipments',
  templateUrl: './addequipments.component.html',
  styleUrls: ['./addequipments.component.css']
})
export class AddequipmentsComponent implements OnInit {

  equipmentForm = new FormGroup({    
    name: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),    
    description: new FormControl('',[Validators.required]),    
    price: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    id: new FormControl('',[Validators.required])
  });

  equipmentType: string[] = ['RAM','Hard disk','Monitor','CPU','Mouse','Keyboard','Printer'];

  previewLoaded: boolean = false;

  constructor(private es : EquipmentsService) { }

  ngOnInit(): void {
  }

  addEquipment(){
    this.es.addEquipment(this.equipmentForm.value).subscribe(
      data => {
        console.log(data)
        alert('Equipment added successfully');
        this.equipmentForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  resetFrom() {
    this.equipmentForm.reset();
    this.previewLoaded = false;
    }

}
