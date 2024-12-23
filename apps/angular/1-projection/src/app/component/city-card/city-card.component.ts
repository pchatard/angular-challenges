import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [listItemTemplate]="cityListItemTemplate"
      (addClicked)="add()">
      <img
        ngProjectAs="card-image"
        alt="City Image"
        src="assets/img/city.png"
        width="200px" />
    </app-card>
    <ng-template #cityListItemTemplate let-city>
      <app-list-item
        [id]="city.id"
        [name]="city.name"
        (deleteClicked)="delete($event)"></app-list-item>
    </ng-template>
  `,
  imports: [CardComponent, ListItemComponent],
  styles: [
    `
      :host {
        --card-background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  add() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
