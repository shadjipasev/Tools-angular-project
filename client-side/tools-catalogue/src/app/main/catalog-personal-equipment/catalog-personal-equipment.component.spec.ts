import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPersonalEquipmentComponent } from './catalog-personal-equipment.component';

describe('CatalogPersonalEquipmentComponent', () => {
  let component: CatalogPersonalEquipmentComponent;
  let fixture: ComponentFixture<CatalogPersonalEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogPersonalEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogPersonalEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
