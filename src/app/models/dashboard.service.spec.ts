import { Dashboard } from 'src/app/models/dashboard.model';
import { Utils } from '../services/utils.service';
import { ICell } from '../common/interfaces/cell.interface';
import { IBoardPosition } from '../common/interfaces/board-position.interface';
import { CellsMatrixType } from '../common/types/types';
import { IDashboardDimension } from '../common/interfaces/dashboard-dimension.interface';

describe('Dashboard', () => {

    let setupData: IDashboardDimension = {
        rows: 2,
        columns: 2,
        mines: 4
    };

    it('should create by correct dimensions', () => {
        const dashboard = new Dashboard({ rows: 8, columns: 8, mines: 10 });
        expect(dashboard).toBeTruthy();
    });

    it('should create call "Utils.generateMatrixWithNewsCells" and "createMines"', () => {
        spyOn(Utils, 'generateMatrixWithNewsCells');
        spyOn(Dashboard.prototype, 'generateMines');

        const expected: IDashboardDimension = {
            rows: 2,
            columns: 2,
            mines: 4
        };
        const gameFake = new Dashboard(expected);

        expect(Utils.generateMatrixWithNewsCells).toHaveBeenCalledWith(expected);
        expect(Dashboard.prototype.generateMines).toHaveBeenCalledWith(expected.mines);
    });

    it('should "getMatrix" return correct value', () => {
        const cellFill: ICell = {
            beaten: false,
            isMine: false,
            discovered: false,
            marked: false,
            probability: 0,
            isFlag: false
        };

        const gameFake = new Dashboard({ rows: 2, columns: 2, mines: 0 });
        const expected: CellsMatrixType = new Array(2).fill(new Array(2).fill(cellFill));
        const actual = gameFake.getMatrix();

        expect(actual).toEqual(expected);
    });

    it('should "constructor" call "generateMines" with the parameters correct', () => {
        spyOn(Dashboard.prototype, 'generateMines');
        const game = new Dashboard({ rows: 8, columns: 8, mines: 12 });

        expect(Dashboard.prototype.generateMines).toHaveBeenCalledWith(12);
    });

    it('should createMines call 8 times "generateNewMine"', () => {
        spyOn(Dashboard.prototype, 'generateNewMine');

        Dashboard.prototype.generateMines.call(Dashboard.prototype, 8);

        expect(Dashboard.prototype.generateNewMine).toHaveBeenCalledTimes(8);
    });

    // tslint:disable-next-line:max-line-length
    it('should "generateNewMine" call "getFirstPositionWithoutMine", set "isMine" to true in position returned, delete probability to cell and call "increasePerimeterProbability"', () => {
        const gameFake = new Dashboard({ rows: 9, columns: 9, mines: 3 });
        const positionFake: IBoardPosition = { row: 1, column: 2 };
        spyOn(gameFake, 'getFirstPositionWithoutMine').and.returnValue(positionFake);
        spyOn(gameFake, 'increasePerimeterProbability');

        gameFake.generateNewMine();

        expect(gameFake.getFirstPositionWithoutMine).toHaveBeenCalled();
        expect(gameFake.getMatrix()[1][2].isMine).toBeTruthy();
        expect(gameFake.getMatrix()[1][2].probability).toBeUndefined();
        expect(gameFake.increasePerimeterProbability).toHaveBeenCalledWith(positionFake);
    });

    it('should "getFirstPositionWithoutMine" return { row: 0, column: 1 }', () => {
        const gameFake = new Dashboard({ rows: 2, columns: 2, mines: 0 });
        gameFake.getMatrix()[0][0].isMine = true;
        gameFake.getMatrix()[1][0].isMine = true;
        gameFake.getMatrix()[1][1].isMine = true;
        gameFake.getMatrix()[0][1].isMine = false;

        const expected: IBoardPosition = { row: 0, column: 1 };
        const actual = gameFake.getFirstPositionWithoutMine();

        expect(actual).toEqual(expected);
    });

    // tslint:disable-next-line:max-line-length
    it('should "increasePerimeterProbability" increase around of position in: [up, left],[up],[up, right],[left],[right],[down, left],[down],[down, right]', () => {
        const game = new Dashboard({ rows: 3, columns: 3, mines: 0 });

        game.increasePerimeterProbability({ row: 1, column: 1 });

        expect(game.getMatrix()[2][0].probability).toBe(1);
        expect(game.getMatrix()[2][1].probability).toBe(1);
        expect(game.getMatrix()[2][2].probability).toBe(1);
        expect(game.getMatrix()[1][0].probability).toBe(1);
        expect(game.getMatrix()[1][2].probability).toBe(1);
        expect(game.getMatrix()[0][0].probability).toBe(1);
        expect(game.getMatrix()[0][1].probability).toBe(1);
        expect(game.getMatrix()[0][2].probability).toBe(1);
    });

    // tslint:disable-next-line:max-line-length
    it('should "increasePerimeterProbability" increase around of position in: [up, left],[up],[up, right],[left],[right],[down, left],[down],[down, right] only if in this position not have a mine', () => {
        const game = new Dashboard({ rows: 3, columns: 3, mines: 0 });
        game.getMatrix()[2][1].isMine = true;

        game.increasePerimeterProbability({ row: 1, column: 1 });

        expect(game.getMatrix()[2][1].probability).toBe(0);

        expect(game.getMatrix()[2][0].probability).toBe(1);
        expect(game.getMatrix()[2][2].probability).toBe(1);
        expect(game.getMatrix()[1][0].probability).toBe(1);
        expect(game.getMatrix()[1][2].probability).toBe(1);
        expect(game.getMatrix()[0][0].probability).toBe(1);
        expect(game.getMatrix()[0][1].probability).toBe(1);
        expect(game.getMatrix()[0][2].probability).toBe(1);
    });

    // tslint:disable-next-line:max-line-length
    it('should "increasePerimeterProbability" increase around of position in: [up, left],[up],[up, right],[left],[right],[down, left],[down],[down, right] only if the position not out of range to matrix', () => {
        const game = new Dashboard({ rows: 3, columns: 3, mines: 0 });

        game.increasePerimeterProbability({ row: 0, column: 0 });

        expect(game.getMatrix()[1][0].probability).toBe(1);
        expect(game.getMatrix()[1][1].probability).toBe(1);
        expect(game.getMatrix()[0][1].probability).toBe(1);
    });

    it('should "processBeaten" change "beaten" and "discovered" to true in correct position', () => {
        const game = new Dashboard({ rows: 7, columns: 7, mines: 0 });
        game.processBeaten({ row: 2, column: 5 });

        expect(game.getMatrix()[2][5].beaten).toBeTruthy();
        expect(game.getMatrix()[2][5].discovered).toBeTruthy();
    });

    it('should "processBeaten" if cell in position is mine discover all others mines', () => {
        const game = new Dashboard({ columns: 3, rows: 3, mines: 0 });
        game.getMatrix()[0][1].isMine = true;
        game.getMatrix()[1][0].isMine = true;
        game.getMatrix()[2][1].isMine = true;

        game.processBeaten({ row: 0, column: 1 });

        expect(game.getMatrix()[0][1].discovered).toBeTruthy();
        expect(game.getMatrix()[1][0].discovered).toBeTruthy();
        expect(game.getMatrix()[2][1].discovered).toBeTruthy();
    });

    it('should "processBeaten" if cell in the position NOT is mine NOT discover all others mines', () => {
        const game = new Dashboard({ columns: 3, rows: 3, mines: 0 });
        game.getMatrix()[0][1].isMine = true;
        game.getMatrix()[1][0].isMine = true;
        game.getMatrix()[2][1].isMine = true;

        game.processBeaten({ row: 0, column: 0 });

        expect(game.getMatrix()[0][1].discovered).toBeFalsy();
        expect(game.getMatrix()[1][0].discovered).toBeFalsy();
        expect(game.getMatrix()[2][1].discovered).toBeFalsy();
    });

    it('should "processBeaten" call "discoverAround" if cell in the position NOT is a mine and probability is 0', () => {
        const game = new Dashboard({ columns: 3, rows: 3, mines: 0 });
        const position: IBoardPosition = { row: 0, column: 0 };
        spyOn(game, 'discoverAround');

        game.processBeaten(position);

        expect(game.discoverAround).toHaveBeenCalledWith(position);
    });

    it('should "processBeaten" NOT call "discoverAround" if cell in the position NOT is a mine and probability is defferent to 0', () => {
        const game = new Dashboard({ columns: 3, rows: 3, mines: 0 });
        const position: IBoardPosition = { row: 0, column: 0 };
        game.getMatrix()[0][0].probability = 2;
        spyOn(game, 'discoverAround');

        game.processBeaten(position);

        expect(game.discoverAround).not.toHaveBeenCalled();
    });

    it('should "processBeaten" NOT call "discoverAround" if cell in the position is a mine', () => {
        const game = new Dashboard({ columns: 3, rows: 3, mines: 0 });
        game.getMatrix()[0][0].isMine = true;
        const position: IBoardPosition = { row: 0, column: 0 };
        spyOn(game, 'discoverAround');

        game.processBeaten(position);

        expect(game.discoverAround).not.toHaveBeenCalled();
    });

    // tslint:disable-next-line:max-line-length
    it('should "discoverAround" discover the cells around of position until find probability different to 0 or mine', () => {
        const game = new Dashboard({ columns: 3, rows: 3, mines: 0 });
        const matrix = game.getMatrix();
        matrix[0][0].probability = 1;
        matrix[0][1].probability = 1;
        matrix[1][1].probability = 1;
        matrix[1][0].probability = 1;
        matrix[0][2].isMine = true;

        game.discoverAround({ row: 2, column: 2 });

        expect(matrix[0][0].discovered).toBeFalsy();
        expect(matrix[0][1].discovered).toBeTruthy();
        expect(matrix[1][1].discovered).toBeTruthy();
        expect(matrix[1][0].discovered).toBeTruthy();
        expect(matrix[2][0].discovered).toBeTruthy();
        expect(matrix[2][1].discovered).toBeTruthy();
        expect(matrix[1][2].discovered).toBeTruthy();
    });
});
