import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({
  selector: 'ng-template [card-list-item]',
  standalone: true,
})
export class CardListItemDirective {}

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black bg-inherit p-4">
      <ng-content select="card-image"></ng-content>

      <section>
        @for (item of list; track item.id) {
          <ng-container
            [ngTemplateOutlet]="listItemTemplate ?? empty"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addClicked.emit()">
        Add
      </button>
    </div>

    <ng-template #empty let-item>
      <app-list-item>{{ item.id }}</app-list-item>
    </ng-template>
  `,
  imports: [ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | null = null;

  @Output() addClicked = new EventEmitter<void>();

  @ContentChild(CardListItemDirective, { read: TemplateRef })
  listItemTemplate?: TemplateRef<T>;
}
