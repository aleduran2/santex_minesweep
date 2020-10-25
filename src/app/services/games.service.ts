import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDashboardDimension } from '../common/interfaces/dashboard-dimension.interface';
import { SetupDataType } from '../common/types/types';
import { GameSetup } from '../models/game-setup.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  obs$ = of('ok');

  constructor() { }

  postSetupGame(data: any): Observable<string> {
      this.saveLocalData(data);
      return this.obs$;
  }

  saveLocalData(data: any): void {
      localStorage.setItem('game-setup', JSON.stringify(data));
  }

  getLocalData(): SetupDataType {
      const data: SetupDataType = JSON.parse(localStorage.getItem('game-setup'));
      return data ? data : 	{ 'columns': 15, 'rows': 12, 'mines': 6, 'level': 'Easy' };
  }
}
