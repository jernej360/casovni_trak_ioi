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
  public currentQuestion = new Question();
  public colorAnswers:string='';

  constructor(private questionService: QuestionService) {
    this.questionService.category.subscribe(
      {
        next: (cat: number) => {
          this.questions = this.questionService.getQuestions(cat)
          this.currentQuestion = this.questions[this.questions.length - 1]
          this.setPanorama()
        }
      }
    )
  }

  public answerQuestion(ans: number) {
    if (ans === this.currentQuestion.correct) {
      this.questionService.increaseScore(1)
      // @ts-ignore
      this.questionService.questions.find(elem => elem == this.currentQuestion).answered = true
      this.getQuestions()
      this.setPanorama()
      console.log("correct!")
    } else {
      console.log("wrong answer")
      this.colorAnswers='#eb4034';
      setTimeout(() => {
        this.colorAnswers = '';
      }, 500);

    }
  }

  public chosenTheAngle() {
    let fov = this.panoViewer.getFov();
    let pitch = this.panoViewer.getPitch();
    let yaw = this.panoViewer.getYaw();
    console.log("fov: ", fov);
    console.log("pitch: ", pitch);
    console.log("yaw: ", yaw);
  }

  public setPanorama() {
    let container = document.getElementById("container");
    if (container != null) {
      this.panoViewer = new PanoViewer(container);
      this.panoViewer.enableSensor()
      this.panoViewer.setGyroMode("yawPitch");
      if (this.currentQuestion) {
        this.panoViewer.setImage(this.currentQuestion.image)
        console.log("its started")
      } else if (this.currentQuestion === undefined && this.questionService.score.value == 0) {
        this.panoViewer.setImage("../../../assets/zacetek.png")
        console.log("its 0")
      } else
      {
        this.panoViewer.setImage("../../../assets/Untitled.png")
        this.currentQuestion=new Question()
        let left=this.questionService.getQuestions(-1).length
        if(left>0){
          this.currentQuestion.question="Your score in this category is: "+this.questionService.score.value+"\nYou still have "+left+" questions left to finish the quiz!"
        }else{
          this.currentQuestion.question="Congrats on finishing the quiz your score is: "+this.questionService.score.value
        }
        console.log("its undefined")
      }
    } else {
      console.log("something went wrong!")
    }
  }

  public getQuestions() {
    this.questions = this.questionService.getQuestions(this.questionService.category.value)
    this.currentQuestion = this.questions[this.questions.length - 1]
    console.log(this.currentQuestion)
  }

  public resetQuiz() {
    this.questionService.tryAgain();
    this.getQuestions()
  }


  ngAfterViewInit(): void {
    // this.container = document.querySelector('#container');
    this.setPanorama()
  }

  ngOnInit(): void {
  }

}
