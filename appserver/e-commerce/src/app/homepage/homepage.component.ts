import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  items_data = [
    11,2,3,4,5,6,7,8,9,0
  ];
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
}
