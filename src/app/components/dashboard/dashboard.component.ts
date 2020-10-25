import { Component, OnInit } from '@angular/core';
import { IDashboardDimension } from 'src/app/common/interfaces/dashboard-dimension.interface';
import { SetupDataType } from 'src/app/common/types/types';
import { Dashboard } from 'src/app/models/dashboard.model';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'st-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    game: Dashboard;

    constructor(private _gamesService: GamesService) { }

    ngOnInit() {
        this.startGame();
    }

    restart() {
        this.startGame();
    }

    startGame() {
        const setupData: SetupDataType = this._gamesService.getLocalData();
        this.game = Dashboard.newGame(setupData);
    }
}
