import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { ItemPayloadComponent } from '../item-payload/item-payload.component';
declare var $:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @ViewChild('itemPayload',{static: false}) itemPayload: ItemPayloadComponent;
  items_data = [];
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

  save_item() {
    const payload = this.itemPayload.get_payload();
    console.log(payload);
    this._commonService.add_items(payload).subscribe(res => {
      if(res.errCode ==0) {
        this.items_data.push(res.data);
        this.close_modal();
      }
    })

  }
}
