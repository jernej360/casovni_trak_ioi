import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  public questions: Array<Question> = [];
  public category: BehaviorSubject<number> = new BehaviorSubject<number>(1)
  public score: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor(private http: HttpClient) {
    this.readQuestions()
  }

  public increaseScore(sco:number){
    console.log("correct")

    this.score.next(this.score.value+sco)
  }

  private getJSON(): Observable<any> {
    return this.http.get("./assets/data.json");
  }

  public getQuestions(category: number) {
    if(category==-1){
      return this.questions.filter(ques => !ques.answered)
    }else{
      return this.questions.filter(ques => ques.category == category && !ques.answered)
    }

  }

  public tryAgain(){
    this.questions.forEach(ques=>{
      ques.answered=false;
    })
  }

  public printAll(){
    console.log(this.questions)
  }

  public readQuestions() {
    this.getJSON().subscribe((data) => {
      data.forEach((element: Question) => {
        this.questions.push(element);
      })
      this.tryAgain()
      this.printAll()
    })
  }
}

export class Question {
  answered: boolean = false;
  category: number = 0
  question: string = ""
  answer1: string = ""
  answer2: string = ""
  answer3: string = ""
  correct: number = 0
  image:string="";

  constructor() {
    this.answered=false;
  }
}
