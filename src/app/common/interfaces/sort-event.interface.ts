import { SortColumnType, SortDirectionType } from '../types/types';

export interface ISortEvent {
    column: SortColumnType;
    direction: SortDirectionType;
}
