import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICell } from 'src/app/common/interfaces/cell.interface';

@Component({
    selector: 'st-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss']
})
export class CellComponent {

    @Input() cell: ICell;
    @Output() clickCell: EventEmitter<void> = new EventEmitter();
    @Output() markCell: EventEmitter<void> = new EventEmitter();
    @Output() flagCell: EventEmitter<void> = new EventEmitter();

    constructor() { }

    click() {
       this.callEmitterIfNotDiscovered(this.clickCell);
    }

    contextmenu(event: MouseEvent) {
        event.preventDefault();
        this.callEmitterIfNotDiscovered(this.flagCell);
    }

    private callEmitterIfNotDiscovered(event: EventEmitter<void>) {
        if (this.cell.discovered) {
          return;
        }

        event.emit();
    }
}
