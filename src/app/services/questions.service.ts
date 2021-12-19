import { Injectable } from '@angular/core';

import * as fileQuestion from "../../assets/data.json";

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  public questions:Array<Question>=[];
  public category:number=0;

  constructor() {
    this.questions=fileQuestion //schrodingerjev array - je array in ni array
  }


  //tale metoda mi je u sramoto ker sem zelo hitel in mi je tale array nagajal
  public returnQuestions(_date:string):Question[]|Array<any>{
    if (this.questions == undefined) {
      return [];
    }else{
      return [];
    }
  }

}
export class Question{
  category:number=0
  question:string=""
  answer1:string=""
  answer2:string=""
  answer3:string=""
  correct:number=0
}
