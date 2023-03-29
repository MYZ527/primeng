import { Component, OnInit } from '@angular/core';

interface city {
  name: string;
}
interface career {
  name: string;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent {
  ingredient!: string;

  city: city[] = [];
  career: career[] = [];
  ngOnInit(): void {
    this.city = [
      {name:'台灣'},
      {name:'中國'},
      {name:'美國'},
      {name:'日本'},
      {name:'韓國'},
    ];
    this.career = [
      {name:'學生'},
      {name:'軍/公/教'},
      {name:'農/林/漁/牧'},
      {name:'服務業'},
      {name:'工/商'},
    ];
  }

  constructor() {}
}
