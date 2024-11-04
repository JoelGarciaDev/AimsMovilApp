import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiJardinPage } from './mi-jardin.page';

describe('MiJardinPage', () => {
  let component: MiJardinPage;
  let fixture: ComponentFixture<MiJardinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiJardinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
