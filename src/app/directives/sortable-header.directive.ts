import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ISortEvent } from '../common/interfaces/sort-event.interface';
import { SortColumnType, SortDirectionType } from '../common/types/types';

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class SortableHeaderDirective {

  @Input() sortable: SortColumnType = '';
  @Input() direction: SortDirectionType = '';
  @Output() sort = new EventEmitter<ISortEvent>();

  constructor() { }

  rotate() {
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

}
