import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dashboard } from 'src/app/models/dashboard.model';
import { IDashboardDimension } from 'src/app/common/interfaces/dashboard-dimension.interface';

describe('BoardComponent', () => {
    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;
    const setupData: IDashboardDimension = {
        rows: 2,
        columns: 2,
        mines: 4
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [BoardComponent],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
       expect(component).toBeTruthy();
    });

    it('should render a "table"', () => {
        const table = fixture.debugElement.query(By.css('table'));

        expect(table).toBeTruthy();
    });

    it('should "clickCell" call "processBeaten" with correct parameters', () => {
        component.game = Dashboard.newGame(setupData);
        spyOn(component.game, 'processBeaten');
        component.clickCell(1, 4);

        expect(component.game.processBeaten).toHaveBeenCalledWith({ row: 1, column: 4 });
    });

    it('should "markCell" call "processMark" with correct parameters', () => {
        component.game = Dashboard.newGame(setupData);
        spyOn(component.game, 'processMark');
        component.markCell(1, 3);

        expect(component.game.processMark).toHaveBeenCalledWith({ row: 1, column: 3 });
    });
});
