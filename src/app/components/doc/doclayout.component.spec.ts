import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLayoutComponent } from './doclayout.component';

describe('BasicComponent', () => {
  let component: DocLayoutComponent;
  let fixture: ComponentFixture<DocLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
