import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crew } from './crew';

describe('Crew', () => {
  let component: Crew;
  let fixture: ComponentFixture<Crew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
