import { ICell } from '../interfaces/cell.interface';

export type LinkType = {
    title: string,
    url: string
};

export type GameType = {
    id: number,
    startTime: Date,
    endTime: Date,
    difficulty: string;
    spendTime: string;
    status: string
};

export type SetupDataType = {
    columns: number,
    rows: number,
    mines: number,
    level: string
};

export type SortColumnType = keyof GameType | '';

export type SortDirectionType = 'asc' | 'desc' | '';

export type CellsMatrixType = ICell[][];
