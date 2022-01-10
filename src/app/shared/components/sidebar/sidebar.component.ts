import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuestionService} from "../../../services/questions.service";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<boolean>();

  //public now: number = 0;
  public cas: number = 60 * 45;
  public showTimer: boolean = false;

  csvInputChange(fileInputEvent: any) {
    let file=fileInputEvent.target.files[0];

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let n=fileReader.result
      try{
        if (typeof n === "string") {
          var json = JSON.parse(n);
        }
        this.questionService.questions=json
        this.questionService.category.next(0)
      }catch{
        console.log("NEKI JE NAROBE Z JSON FILOM")
      }


    }
    fileReader.readAsText(file);
  }

  public startQuiz() {
    this.questionService.category.next(1);
    this.showTimer = true;
    this.cas = 60 * 45;
    setInterval(() => {
      this.cas = --this.cas;
    }, 1000);
  }

  resetQuiz() {
    this.showTimer = false;
    this.questionService.tryAgain()
    this.questionService.category.next(0);
    this.questionService.score.next(0)
  }

  ngOnInit(): void {
  }

  constructor(private questionService: QuestionService, private snackBar: MatSnackBar) {
  }

  public setCategory(cat: number) {
    this.toggleSidebar.emit(true)
    if(this.showTimer){
      setTimeout(() => {
        this.questionService.category.next(cat);
      }, 500);
    }else{
      this.snackBar.open('You need to start the Quiz first!', 'Start',{duration: 2000}).onAction().subscribe(()=>this.startQuiz())
    }
  }
}
