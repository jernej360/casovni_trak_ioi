import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import {PanoViewer} from "@egjs/view360"


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})



export class MainComponent implements OnInit, AfterViewInit {
 
  public container: HTMLElement|null = null;
  
  constructor() {
  }

  ngAfterViewInit():void{
    this.container = document.querySelector('#container');
    console.log(this.container)

    if (this.container !=null){
      const panoViewer = new PanoViewer(this.container);
      panoViewer.setImage("https://naver.github.io/egjs-view360/examples/img/equi.jpg")
      console.log(panoViewer)
    }else{
      console.log("something went wrong!")
    }

  }

  ngOnInit(): void {
  }

}
