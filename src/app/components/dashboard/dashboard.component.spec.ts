import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { Dashboard } from 'src/app/models/dashboard.model';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be render a button with name "restart"', () => {
    const button = fixture.debugElement.query(By.css('button[name="restart"]'));

    expect(button).toBeTruthy();
  });

  it('should be "button" click call "restart"', () => {
    spyOn(component, 'restart');
    const button = fixture.debugElement.query(By.css('button[name="restart"]'));

    button.nativeElement.click();

    expect(component.restart).toHaveBeenCalled();
  });

  it('should be "restart" call Dashboard.newGame', () => {
    spyOn(Dashboard, 'newGame');

    component.restart();

    expect(Dashboard.newGame).toHaveBeenCalled();
  });
});
