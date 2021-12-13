import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {

  //public now: number = 0;
  public cas: number = 60*45;


  ngOnInit(): void {
  }

  constructor() {
      // setInterval(() => {
      //   this.now = Date.now();
      // }, 1);
      setInterval(() => {
          this.cas = --this.cas;
      },1000);
  }
}
