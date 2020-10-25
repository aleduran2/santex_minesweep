import { IBoardPosition } from '../common/interfaces/board-position.interface';
import { ICell } from '../common/interfaces/cell.interface';
import { Utils } from './utils.service';

describe('Utils', () => {
    it('should "generateMatrixWithNewsCells" return a new matrix expected', () => {
        const cell: ICell = {
            isMine: false,
            beaten: false,
            discovered: false,
            marked: false,
            probability: 0,
            isFlag: false
        };
        const expected = new Array(10).fill(new Array(9).fill(cell));
        const actual = Utils.generateMatrixWithNewsCells({ rows: 10, columns: 9 });

        expect(actual).toEqual(expected);
    });

});
