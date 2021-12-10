import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public now: number = 0;

  ngOnInit(): void {
  }

  constructor() {
      setInterval(() => {
        this.now = Date.now();
      }, 1);
  }
}
