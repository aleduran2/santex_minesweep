import { IBoardPosition } from '../common/interfaces/board-position.interface';
import { ICell } from '../common/interfaces/cell.interface';
import { IDashboardDimension } from '../common/interfaces/dashboard-dimension.interface';
import { CellsMatrixType, GameType } from '../common/types/types';
import { Utils } from '../services/utils.service';

export class Dashboard {
    private matrix: CellsMatrixType;

    constructor(private dimension: IDashboardDimension) {
        this.matrix = Utils.generateMatrixWithNewsCells(dimension);
        this.generateMines(dimension.mines);
        this.setupNewGame();
    }

    static newGame(setupData: IDashboardDimension) {
        return new Dashboard(setupData);
    }

    private setupNewGame() {
        let games = JSON.parse(localStorage.getItem('games'));
        const gameSetup = JSON.parse(localStorage.getItem('game-setup'));
        const newGame: GameType =  {
            'id': (games) ?  games.length++ : 0,
            'startTime': new Date(),
            'endTime': null,
            'difficulty': (gameSetup) ? gameSetup['level'] : 'Easy',
            'spendTime': null,
            'status': null
        }
        if (games) {
            games.pop();
            games.push(newGame);
        } else {
            games = [newGame];
        }
        localStorage.setItem('games', JSON.stringify(games));
        return;
    }

    private getMine(position: IBoardPosition): ICell {
        return this.matrix[position.row][position.column];
    }

    private verifyPositionAndCallBack(position: IBoardPosition, callback: any) {
        if (this.isOutOfRange(position)) {
            return;
        }
        callback(position);
    }

    private incrementProbabilityIfNotIsMine(position: IBoardPosition) {
        const cell: ICell = this.getMine(position);
        if (!cell.isMine) {
            cell.probability++;
        }
    }

    private isOutOfRange(position: IBoardPosition) {
        if ((position.column < 0 || position.column >= this.dimension.columns) ||
           (position.row < 0 || position.row >= this.dimension.rows)) {
            return true;
        }
        return false;
    }

    private discoverAllMines() {
        this.matrix.forEach((row: ICell[]) => {
            row.forEach((cell: ICell) => {
                if (cell.isMine) {
                    cell.discovered = true;
                }
            });
        });
    }

    private processDiscovered(position: IBoardPosition) {
        const cell = this.getMine(position);
        if (cell.isMine || cell.discovered) {
            return;
        }
        cell.discovered = true;
        if (cell.probability === 0) {
            this.discoverAround(position);
        }
    }

    private travelOfPerimeterWithCallBack(position: IBoardPosition, callback: any) {
        this.verifyPositionAndCallBack({ row: position.row + 1, column: position.column - 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row + 1, column: position.column }, callback);
        this.verifyPositionAndCallBack({ row: position.row + 1, column: position.column + 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row, column: position.column - 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row, column: position.column + 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row - 1, column: position.column - 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row - 1, column: position.column }, callback);
        this.verifyPositionAndCallBack({ row: position.row - 1, column: position.column + 1 }, callback);
      }

    generateMines(mines: number) {
        for (let index = 0; index < mines; index++) {
            this.generateNewMine();
        }
    }

    getMatrix(): CellsMatrixType {
        return this.matrix;
    }

    generateNewMine() {
        const position = this.getFirstPositionWithoutMine();
        const cell = this.getMine(position);
        cell.isMine = true;
        delete cell.probability;
        this.increasePerimeterProbability(position);
    }

    getFirstPositionWithoutMine(): IBoardPosition {
        let position: IBoardPosition;
        do {
            position = Utils.getRandomPosition(this.dimension);
        } while (this.getMine(position).isMine);
        return position;
    }

    increasePerimeterProbability(position: IBoardPosition) {
        const callback = (positionInternal: IBoardPosition) => this.incrementProbabilityIfNotIsMine(positionInternal);
        this.travelOfPerimeterWithCallBack(position, callback);
    }

    processBeaten(position: IBoardPosition) {
        const cellBeaten: ICell = this.matrix[position.row][position.column];
        cellBeaten.discovered = cellBeaten.beaten = true;
        if (cellBeaten.isMine) {
            this.discoverAllMines();
            // Lost
            this.setFinishedGame();
            window.alert('Sorry, you lose');
        } else if (cellBeaten.probability === 0) {
            this.discoverAround(position);
        }
    }

    discoverAround(position: IBoardPosition) {
        const callback = (positionInternal: IBoardPosition) => {
            this.processDiscovered(positionInternal);
        };
        this.travelOfPerimeterWithCallBack(position, callback);
    }

    processMark(position: IBoardPosition) {

    }

    processFlag(position: IBoardPosition) {
      this.matrix[position.row][position.column].isFlag = true;
    }

    setFinishedGame() {
      let games = JSON.parse(localStorage.getItem('games'));
      let currentGame: GameType = games.pop();
      currentGame.status = 'Lost';
      currentGame.endTime = new Date();
      currentGame.spendTime = this.timeDiffCalc(currentGame.endTime, currentGame.startTime);
      games.push(currentGame);
      localStorage.setItem('games', JSON.stringify(games));
    }

    timeDiffCalc(dateI: Date, dateF: Date) {
        // TODO: add moment and change dates handler to use this library and get the difference easily
        return Math.random().toFixed(2).toString();
    }
}
