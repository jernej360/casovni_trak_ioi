import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PanoViewer} from "@egjs/view360"
import {Question, QuestionService} from "../../services/questions.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit, AfterViewInit {

  private panoViewer: any;
  public questions: Array<Question> = [];
  public currentQuestion=new Question();

  constructor(private questionService: QuestionService) {
    this.questionService.category.subscribe(
      {
        next: (cat: number) => {
          this.questions = this.questionService.getQuestions(cat)
          this.currentQuestion=this.questions[this.questions.length-1]
          console.log(this.currentQuestion)
        }
      }
    )
  }

  chosenTheAngle() {
    let fov = this.panoViewer.getFov();
    let pitch = this.panoViewer.getPitch();
    let yaw = this.panoViewer.getYaw();
    console.log("fov: ", fov);
    console.log("pitch: ", pitch);
    console.log("yaw: ", yaw);
  }

  public getQuestions(){
    this.questions = this.questionService.getQuestions(this.questionService.category.value)
    this.currentQuestion=this.questions[this.questions.length-1]
    console.log(this.currentQuestion)
  }

  public resetQuiz() {
    this.questionService.tryAgain();
    this.getQuestions()
  }

  ngAfterViewInit(): void {
    // this.container = document.querySelector('#container');
    let container = document.getElementById("container");
    if (container != null) {
      this.panoViewer = new PanoViewer(container);
      this.panoViewer.setImage("../../../assets/krneki.jpg")
      this.getQuestions()
    }else{
      console.log("something went wrong!")
    }
    this.getQuestions()

  }

  ngOnInit(): void {
  }

}
