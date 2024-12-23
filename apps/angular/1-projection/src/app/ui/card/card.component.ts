import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="card-image"></ng-content>

      <section>
        <ng-container
          *ngFor="let item of list"
          [ngTemplateOutlet]="listItemTemplate || defaultTemplate"
          [ngTemplateOutletContext]="{
            $implicit: item
          }"></ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addClicked.emit()">
        Add
      </button>
    </div>

    <ng-template #defaultTemplate let-item>
      <app-list-item [id]="item.id" [name]="item.id"></app-list-item>
    </ng-template>
  `,
  styles: [
    `
      :host > div {
        background-color: var(--card-background-color, white);
      }
    `,
  ],
  imports: [NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  @Input() list: T[] | null = null;
  @Input() listItemTemplate?: TemplateRef<T>;
  @Input() customClass = '';
  @Output() addClicked = new EventEmitter();
}
