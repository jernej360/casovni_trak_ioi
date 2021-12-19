import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../../services/questions.service";

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

  constructor(private questionService:QuestionService) {
      setInterval(() => {
          this.cas = --this.cas;
      },1000);
  }

  public setCategory(cat:number){
    this.questionService.category;
  }
}
