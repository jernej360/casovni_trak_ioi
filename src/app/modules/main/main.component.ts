import { AfterViewInit, Component, OnInit } from '@angular/core';
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
    this.questionService.category.subscribe(
      {next:(cat:number)=>{
          this.questions=this.questionService.getQuestions(cat)
          console.log(this.questions)
      }}
    )
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
    let container = document.getElementById("container");
    if (container !=null){
      this.panoViewer = new PanoViewer(container);
      this.panoViewer.setImage("../../../assets/krneki.svg")
    }else{
      console.log("something went wrong!")
    }

  }

  ngOnInit(): void {
  }

}
