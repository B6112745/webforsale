import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdategamesComponent } from './updategames.component';

describe('UpdategamesComponent', () => {
  let component: UpdategamesComponent;
  let fixture: ComponentFixture<UpdategamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdategamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdategamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
