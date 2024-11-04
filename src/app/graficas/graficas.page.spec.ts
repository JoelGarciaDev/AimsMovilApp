import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficasPage } from './graficas.page';

describe('GraficasPage', () => {
  let component: GraficasPage;
  let fixture: ComponentFixture<GraficasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
