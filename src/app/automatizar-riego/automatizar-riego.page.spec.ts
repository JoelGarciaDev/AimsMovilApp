import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutomatizarRiegoPage } from './automatizar-riego.page';

describe('AutomatizarRiegoPage', () => {
  let component: AutomatizarRiegoPage;
  let fixture: ComponentFixture<AutomatizarRiegoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatizarRiegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
