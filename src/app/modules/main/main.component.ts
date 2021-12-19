import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import {PanoViewer} from "@egjs/view360"
import {Question, QuestionService} from "../../services/questions.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})



export class MainComponent implements OnInit, AfterViewInit {

  private panoViewer:any;
  public questions: Array<Question> | undefined;

  constructor(private questionService: QuestionService) {
    this.questions=this.questionService.getQuestions()
  }

  chosenTheAngle(){
    let fov = this.panoViewer.getFov();
    let pitch = this.panoViewer.getPitch();
    let yaw = this.panoViewer.getYaw();
    console.log("fov: ",fov);
    console.log("pitch: ",pitch);
    console.log("yaw: ",yaw);
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
