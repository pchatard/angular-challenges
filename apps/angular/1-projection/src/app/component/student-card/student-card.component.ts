import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      [listItemTemplate]="studentListItemTemplate"
      (addClicked)="add()">
      <img
        alt="Student image"
        ngProjectAs="card-image"
        src="assets/img/student.webp"
        width="200px" />
    </app-card>

    <ng-template #studentListItemTemplate let-student>
      <app-list-item
        [id]="student.id"
        [name]="student.firstName"
        (deleteClicked)="delete($event)"></app-list-item>
    </ng-template>
  `,
  styles: [
    `
      :host {
        --card-background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  add() {
    this.store.addOne(randStudent());
  }
}
