export interface ICell {
    isMine: boolean;
    beaten: boolean;
    discovered: boolean;
    marked: boolean;
    probability: number;
    isFlag: boolean;
}
