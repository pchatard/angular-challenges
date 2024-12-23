import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [listItemTemplate]="teacherListItemTemplate"
      (addClicked)="add()">
      <img
        alt="Teacher image"
        ngProjectAs="card-image"
        src="assets/img/teacher.png"
        width="200px" />
    </app-card>
    <ng-template #teacherListItemTemplate let-teacher>
      <app-list-item
        [id]="teacher.id"
        [name]="teacher.firstName"
        (deleteClicked)="delete($event)"></app-list-item>
    </ng-template>
  `,
  styles: [
    `
      :host {
        --card-background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers = toSignal(this.store.teachers$, { initialValue: [] });

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  add() {
    this.store.addOne(randTeacher());
  }
}
