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

  private update_item_url = this.url + '/inventory/updateItem'
  update_item(payload) {
    return this.http.post<any>(this.update_item_url, payload);
  }

  private delete_item_url = this.url + '/inventory/deleteItem'
  delete_item(payload) {
    return this.http.post<any>(this.delete_item_url, payload);
  }

}
