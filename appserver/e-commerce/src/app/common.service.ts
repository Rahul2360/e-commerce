import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  url = 'http://localhost:5001';
  constructor(
    private http: HttpClient
  ) { }

  private get_all_item_url = this.url + '/inventory/getAllItem'
  get_all_items() {
    return this.http.get<any>(this.get_all_item_url);
  }

  private add_item_url = this.url + '/inventory/addItem'
  add_items(payload) {
    return this.http.post<any>(this.add_item_url, payload);
  }

}
