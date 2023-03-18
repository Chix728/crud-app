import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplAddEditComponent } from './empl-add-edit.component';

describe('EmplAddEditComponent', () => {
  let component: EmplAddEditComponent;
  let fixture: ComponentFixture<EmplAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
