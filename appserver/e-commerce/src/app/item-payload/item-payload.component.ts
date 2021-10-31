import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { ToastrUtilityService } from '../../../dce-service/toastr-utility.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-item-payload',
  templateUrl: './item-payload.component.html',
  styleUrls: ['./item-payload.component.scss']
})
export class ItemPayloadComponent implements OnInit {

  item_payload: FormGroup;
  submitted_payload = false;
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initialize_payload();
  }

  initialize_payload () {
    this.item_payload = this._fb.group({
      'name': this._fb.control('', Validators.required),
      'description': this._fb.control(''),
      'price': this._fb.control('', Validators.required),
      'imageUrl': this._fb.control(''),
    })
   
  }
  validate_payload() {
    this.submitted_payload = true;
    if (this.item_payload.status == 'VALID' || this.item_payload.status == 'DISABLED') {
      return true;
    } else {
      // this._toastr.error('','Please fill all mandatory fields', this._toastrUtility.basic_configuration);
    }
    return false;
  }

  clear_meeting_details(){
    this.item_payload.patchValue({
      'name': '',
      'description': '',
      'price': '',
      'imageUrl': '',
    })
  }

  toggle_meeting_details(bool) {
    if (bool){
      this.item_payload.enable();
    } else {
      this.item_payload.disable();
    }
  }

  fill_meeting_details(data) {
    this.item_payload.patchValue({
      'name': data.name,
      'description': data.description,
      'price': data.description,
      'imageUrl': data.imageUrl,
    })
  }

  get_payload() {
    return this.item_payload.getRawValue();
  }

}