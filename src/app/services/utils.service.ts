import { IBoardPosition } from '../common/interfaces/board-position.interface';
import { ICell } from '../common/interfaces/cell.interface';
import { IDimension } from '../common/interfaces/dimension.interface';
import { CellsMatrixType } from '../common/types/types';

const newCell: ICell = {
    isMine: false,
    beaten: false,
    discovered: false,
    marked: false,
    probability: 0,
    isFlag: false
};

export class Utils {
    static generateMatrixWithNewsCells(dimensions: IDimension): CellsMatrixType {
        const matrix: CellsMatrixType = [];
        this.iterateOfNumberToCallBack(dimensions.rows, (row: number) => {
            matrix[row] = [];
            this.iterateOfNumberToCallBack(dimensions.columns, (column: number) => {
                matrix[row][column] = { ...newCell };
            });
        });
        return matrix;
    }

    private static iterateOfNumberToCallBack(count: number, callback: any) {
        for (let index = 0; index < count; index++) {
            callback(index);
        }
    }

    static getRandomPosition(dimension: IDimension): IBoardPosition {
        return {
            row: this.getRandomNumber(dimension.rows),
            column: this.getRandomNumber(dimension.columns)
        };
    }

    static getRandomNumber(number: number): number {
        return Math.floor(Math.random() * number);
    }
}
