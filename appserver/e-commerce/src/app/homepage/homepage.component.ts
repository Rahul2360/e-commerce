import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { ItemPayloadComponent } from '../item-payload/item-payload.component';
declare var $:any;
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @ViewChild('itemPayload',{static: false}) itemPayload: ItemPayloadComponent;
  items_data = [];

  faPen =faPen;
  faTrash = faTrash;
  is_new = false;
  selected_item:any = {}

  constructor(
    private _commonService: CommonService
  ) { }

  ngOnInit() {
    this.get_all_items()
  }

  get_all_items() {
    this._commonService.get_all_items().subscribe(res => {
      if(res.errCode == 0) {
        this.items_data = res.data;
      }
    })
  }

  open_modal() {
    $('#add-item-modal').modal({backdrop: 'static', keyoard: false})
  }

  close_modal() {
    $('#add-item-modal').modal('hide');
  }

  new_item() {
    this.is_new = true;
    this.open_modal();
    this.itemPayload.clear_payload()
  }

  save_item() {
    const payload = this.itemPayload.get_payload();
    if(this.itemPayload.validate_payload()) {
      this._commonService.add_items(payload).subscribe(res => {
        if(res.errCode ==0) {
          this.items_data.push(res.data);
          this.close_modal();
        }
      })
    }
  }

  update_item() {
    const payload = this.itemPayload.get_payload();
    payload['id'] = this.selected_item._id; 
    if(this.itemPayload.validate_payload()) {
      this._commonService.update_item(payload).subscribe(res => {
        if(res.errCode ==0) {
          for(let  i=0;i< this.items_data.length; i++) {
            if(this.items_data[i]._id == this.selected_item._id) {
              this.items_data[i]['name'] = res.data['name'];
              this.items_data[i]['description'] = res.data['description'];
              this.items_data[i]['imageUrl'] = res.data['imageUrl'];
              this.items_data[i]['price'] = res.data['price'];
            }
          }
          this.close_modal();
        }
      })
    }
  }

  delete_item(item) {
    console.log(item);
    const payload = {
      id: item._id
    }
    this._commonService.delete_item(payload).subscribe(res => {
      if(res.errCode ==0) {
        for(let  i=0;i< this.items_data.length; i++) {
          if(this.items_data[i]._id == item._id) {
            this.items_data.splice(i,1);
          }
        }
      }
    })
  }
  edit_item(item) {
    this.is_new = false;
    this.open_modal();
    this.selected_item = item;
    this.itemPayload.fill_payload(item);
  }

}
