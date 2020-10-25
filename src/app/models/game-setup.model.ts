import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

export class GameSetup {

    columns: number = 8;
    rows: number = 8;
    level: string;
    mines: number = 5;

    constructor(data) {
        Object.assign(this, data);
    }

    static getForm(): FormGroup {
        let game = new GameSetup({});
        return new FormBuilder().group({
            columns: new FormControl(game.columns, [Validators.required, Validators.maxLength(50)]),
            rows: new FormControl(game.rows, [Validators.required, Validators.maxLength(50)]),
            level: new FormControl(game.level, [Validators.required]),
            mines: new FormControl(game.mines, [Validators.required, Validators.maxLength(10)])
        });
    }

}
