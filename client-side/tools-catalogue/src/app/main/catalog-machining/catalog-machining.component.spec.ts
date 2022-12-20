import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogMachiningComponent } from './catalog-machining.component';

describe('CatalogMachiningComponent', () => {
  let component: CatalogMachiningComponent;
  let fixture: ComponentFixture<CatalogMachiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogMachiningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogMachiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
