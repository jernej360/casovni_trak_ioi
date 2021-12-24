import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {QuestionService} from "../../../services/questions.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public ans:number|undefined=this.questionService.questions.filter(ques => !ques.answered).length;

  constructor(public questionService:QuestionService) { }

  ngOnInit(): void {
  }



}
