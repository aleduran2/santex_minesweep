import { GameType } from '../../common/types/types';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortableHeaderDirective } from 'src/app/directives/sortable-header.directive';
import { ISortEvent } from 'src/app/common/interfaces/sort-event.interface';

const compare = (v1: string | number | Date, v2: string | number | Date) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
    selector: 'st-finished-list',
    templateUrl: './finished.component.html',
    styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {

    @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

    upDirection: boolean = false;
    upTimeDirection: boolean = false;
    games: GameType[];

    constructor() { }

    ngOnInit(): void {
        this.games = JSON.parse(localStorage.getItem('games'));
    }

    onSort({column, direction}: ISortEvent, type: number) {
      if (type === 0) {
          this.upDirection = !this.upDirection;
      } else {
          this.upTimeDirection = !this.upDirection;
      }
      // resetting other headers
      this.headers.forEach(header => {
          if (header.sortable !== column) {
              header.direction = '';
          }
      });

      if (direction === '' || column === '') {
          this.games = this.games;
      } else {
          this.games = [...this.games].sort((a, b) => {
              const res = compare(a[column], b[column]);
              return direction === 'asc' ? res : -res;
          });
      }
    }

    getSortIcon() {
      return (this.upDirection) ? 'fa-angle-up' : 'fa-angle-down';
    }

    getSortDirection(type: number) {
      if (type === 0) {
          return (this.upDirection) ? 'asc' : 'desc';
      } else {
          return (this.upTimeDirection) ? 'asc' : 'desc';
      }
    }

}


