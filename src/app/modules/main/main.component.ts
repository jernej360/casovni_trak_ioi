import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import {PanoViewer} from "@egjs/view360"


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})



export class MainComponent implements OnInit, AfterViewInit {

  private panoViewer:any;

  constructor() {
  }

  chosenTheAngle(){
    var dir = this.panoViewer.getFov();
    console.log(dir)
  }

  ngAfterViewInit():void{
    // this.container = document.querySelector('#container');
    var container = document.getElementById("container");
    console.log(container)

    if (container !=null){
      this.panoViewer = new PanoViewer(container);
      this.panoViewer.setImage("../../../assets/krneki.svg")
      console.log(this.panoViewer)
    }else{
      console.log("something went wrong!")
    }

  }

  ngOnInit(): void {
  }

}
