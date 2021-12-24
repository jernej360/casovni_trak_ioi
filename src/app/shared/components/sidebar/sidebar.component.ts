import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../services/questions.service";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {

  //public now: number = 0;
  public cas: number = 60 * 45;
  public showTimer: boolean = false;

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
  }

  ngOnInit(): void {
  }

  constructor(private questionService: QuestionService, private snackBar: MatSnackBar) {
  }

  public setCategory(cat: number) {
    if(this.showTimer){
      this.questionService.category.next(cat);
    }else{
      this.snackBar.open('You need to start the Quiz first!', 'Start').onAction().subscribe(()=>this.startQuiz())
    }
  }
}
