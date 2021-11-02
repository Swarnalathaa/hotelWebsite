import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HotelListService } from '../shared/services/hotel-list.service';
interface HotelResponse {
  data: [],
  pagination: {
    count: number,
    next: string,
    prev: string,
    total: number
  }
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  hideMenu: boolean = true;
  hotels: [] = [];
  destination: string = 'FRA';
  checkIn: string = '';
  checkOut: string = '';
  size: number = 10;
  offset: number = 0; 

  constructor( private hotelService: HotelListService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // this.getHotelList();
  }
  toggleMenu() : void {
    this.hideMenu = !this.hideMenu;
  }
  getHotelList(): void {
    this.spinner.show();
    this.hotelService.getHotelList(this.destination, this.checkIn, this.checkOut, this.size, this.offset).subscribe((res: HotelResponse) => {
      this.hotels = [...this.hotels, ...res.data];
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastr.error(error.error.message ? error.error.message : 'CORS Error. Please enable CORS in your browser');
    })
  }
  scrolledDown(): void {
    this.getHotelList(); 
    this.offset = this.offset + 10;
  }
  searchHotel(): void {
    this.offset = 0;
    this.hotels = [];
    this.getHotelList();
  }
  clearSearch(): void {
    this.checkIn = '';
    this.checkOut = '';
    this.destination = 'FRA';
    this.offset = 0;
    this.getHotelList();
  }
  scrollToElement($element): void {
    var topOfElement = $element.offsetTop - 300;
    window.scroll({ top: topOfElement, behavior: "smooth" });
  }
}
