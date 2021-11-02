import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelListService {

  constructor( private http: HttpClient) { }

  getHotelList(destination, checkin, checkout, size, offset) {
    return this.http.get(`${environment.url}/hotels${destination ? '?country[eq]='+destination : ''}${checkin ? '&start='+checkin : ''}${checkout ? '&end='+checkout : ''}&size=${size}&offset=${offset}`);
  }
}
