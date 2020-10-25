import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { ICell } from 'src/app/common/interfaces/cell.interface';

describe('CellComponent', () => {
    let component: CellComponent;
    let fixture: ComponentFixture<CellComponent>;
    let cell: ICell;
    let contextmenuEv = new MouseEvent('contextmenu');

    beforeEach(async(() => {
      cell = {
        beaten: false,
        isMine: false,
        discovered: false,
        marked: false,
        probability: 4,
        isFlag: false
      };

      TestBed.configureTestingModule({
        declarations: [CellComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CellComponent);
      component = fixture.componentInstance;
      component.cell = cell;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be default value of "clickCell" new EventEmmiter', () => {
      expect(component.clickCell instanceof EventEmitter).toBeTruthy();
    });

    it('should "click" call output "clickCell"', () => {
      let called: boolean;

      component.clickCell.subscribe(() => called = true);

      component.click();

      expect(called).toBeTruthy();
    });

    it('should when cell.discovered the "click" function not call EventEmitter "clickCell"', () => {
      let called = false;

      component.clickCell.subscribe(() => called = true);

      component.cell.discovered = true;
      component.click();

      expect(called).toBeFalsy();
    });

    it('should "contextmenu" call output "markCell"', () => {
      let called: boolean;

      component.flagCell.subscribe(() => called = true);

      component.contextmenu(contextmenuEv);

      expect(called).toBeTruthy();
    });

    it('should when cell.discovered the "contextmenu" function not call EventEmitter "markCell"', () => {
      let called = false;

      component.markCell.subscribe(() => called = true);

      component.cell.discovered = true;
      component.contextmenu(contextmenuEv);

      expect(called).toBeFalsy();
    });

    it('should be render probability if cell is discovered, not is mine and probability is greater than 0', () => {
      component.cell.discovered = true;
      component.cell.probability = 1;
      fixture.detectChanges();

      const probability = fixture.debugElement.query(By.css('div>h3'));

      expect(probability).toBeTruthy();
      expect(probability.nativeElement.textContent).toBe(`${cell.probability}`);
    });

    it('should be not render probability if cell is discovered, not is mine and probability is 0', () => {
      component.cell.discovered = true;
      component.cell.probability = 0;
      fixture.detectChanges();

      const probability = fixture.debugElement.query(By.css('div>h3'));

      expect(probability).toBeFalsy();
    });

    it('should be not render probability if cell not discovered and not is mine', () => {
      component.cell.discovered = false;
      fixture.detectChanges();

      const probability = fixture.debugElement.query(By.css('div>h3'));

      expect(probability).toBeFalsy();
    });



    it('should add class "discovered" to div content when cell is discovered', () => {
      const content = fixture.debugElement.query(By.css('div'));

      component.cell.discovered = true;
      fixture.detectChanges();

      expect(content.nativeElement.classList).toContain('discovered');
    });

    it('should add class "mine" to div content when cell is discovered and is mine', () => {
      const content = fixture.debugElement.query(By.css('div'));

      component.cell.discovered = true;
      component.cell.isMine = true;
      fixture.detectChanges();

      expect(content.nativeElement.classList).toContain('mine');
    });

    it('should not add class "mine" to div content when cell is discovered but not is mine', () => {
      const content = fixture.debugElement.query(By.css('div'));

      component.cell.discovered = true;
      component.cell.isMine = false;
      fixture.detectChanges();

      expect(content.nativeElement.classList).not.toContain('mine');
    });

    it('should not add class "mine" to div content when cell is NOT discovered and is mine', () => {
      const content = fixture.debugElement.query(By.css('div'));

      component.cell.discovered = false;
      component.cell.isMine = true;
      fixture.detectChanges();

      expect(content.nativeElement.classList.length).toBe(1);
    });

    it('should add class "beaten" to div content when cell is beaten', () => {
      const content = fixture.debugElement.query(By.css('div'));

      component.cell.beaten = true;
      fixture.detectChanges();

      expect(content.nativeElement.classList).toContain('beaten');
    });

    it('should not add class "beaten" to div content when cell is not beaten', () => {
      const content = fixture.debugElement.query(By.css('div'));

      component.cell.beaten = false;
      fixture.detectChanges();

      expect(content.nativeElement.classList).not.toContain('beaten');
    });
});
