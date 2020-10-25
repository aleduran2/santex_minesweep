import { Component, Input } from '@angular/core';
import { Dashboard } from 'src/app/models/dashboard.model';

@Component({
    selector: 'st-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})

export class BoardComponent {

    @Input() game: Dashboard;

    constructor() { }

    clickCell(row: number, column: number) {
        this.game.processBeaten({ row, column });
    }

    markCell(row: number, column: number) {
        this.game.processMark({ row, column });
    }

    flagCell(row: number, column: number) {
        this.game.processFlag({ row, column });
    }
}
