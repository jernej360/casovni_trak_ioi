import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  public questions: Array<Question> = [];
  public category: Observable<number> = new Observable((observer) => {
    let setCategoryObv = function (cat: number) {
      observer.next(cat)
    }
  })

  constructor(private http: HttpClient) {
    this.readQuestions()
  }

  private getJSON(): Observable<any> {
    return this.http.get("./assets/data.json");
  }

  public getQuestions(category:number){
    return this.questions.filter(ques => ques.category==category)
  }



  public readQuestions(){
    this.getJSON().subscribe((data) => {
      data.forEach((element:Question) => {
        this.questions.push(element);
      })
      console.log(this.questions)
    })
  }
}

export interface Question {
    category: number
    question: string
    answer1: string
    answer2: string
    answer3: string
    correct: number
}
