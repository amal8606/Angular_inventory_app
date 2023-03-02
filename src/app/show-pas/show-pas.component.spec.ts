import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPasComponent } from './show-pas.component';

describe('ShowPasComponent', () => {
  let component: ShowPasComponent;
  let fixture: ComponentFixture<ShowPasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
