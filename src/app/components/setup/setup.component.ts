import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GameSetup } from 'src/app/models/game-setup.model';
import { GamesService } from 'src/app/services/games.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/constants/global.constants';

@Component({
    selector: 'st-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

    setupForm: FormGroup;
    saving: boolean = false;
    levels: string[];

    constructor(private _router: Router, private _gamesService: GamesService) {
      this.levels = GlobalConstants.LEVEL_TYPES;
      this.setupForm = GameSetup.getForm();
      this.setupForm.controls['level'].setValue('Easy', {onlySelf: true});
    }

    ngOnInit(): void {
    }

    onSubmit(form: FormGroup) {
        this.saving = true;
        const gameToSubmit = new GameSetup(form);
        this.saveSetupGame(gameToSubmit);
    }

    saveSetupGame(game: GameSetup) {
        this._gamesService.postSetupGame(game).subscribe(
            response => this.successResult(),
            error => this.errorResult(error)
        );
    }

    successResult() {
        console.log('Game saved correctly');
        this.saving = false;
        this._router.navigate(['/dashboard']);
    }

    errorResult(error) {
        console.log('Error on saving game')
        this.saving = false;
    }

}
