import { Component, OnInit } from '@angular/core';

interface student {
  position: number;
  name: string;
  height: number;
  weight: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  student: student[] = [];
  ngOnInit(): void {
    this.student = [
      { position: 1, name: 'Rose', height: 178, weight: 43 },
      { position: 2, name: 'Benny', height: 156, weight: 90 },
      { position: 3, name: 'Sam', height: 167, weight: 55 },
      { position: 4, name: 'Peggy', height: 183, weight: 54 },
      { position: 5, name: 'Claire', height: 163, weight: 73 },
      { position: 6, name: 'Jason', height: 180, weight: 67 },
      { position: 7, name: 'Alex', height: 195, weight: 70 },
      { position: 8, name: 'Kimberly', height: 159, weight: 53 },
      { position: 9, name: 'Millie', height: 165, weight: 63 },
      { position: 10, name: 'Poll', height: 182, weight: 67 },
      { position: 11, name: 'Grace', height: 173, weight: 61 },
      { position: 12, name: 'Veronica', height: 169, weight: 56 },
      { position: 13, name: 'Wendy', height: 150, weight: 45 },
      { position: 14, name: 'Rita', height: 158, weight: 50 },
    ];
  }

  constructor() {}

}
