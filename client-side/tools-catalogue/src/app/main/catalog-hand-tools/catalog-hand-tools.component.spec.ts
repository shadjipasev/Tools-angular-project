import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogHandToolsComponent } from './catalog-hand-tools.component';

describe('CatalogHandToolsComponent', () => {
  let component: CatalogHandToolsComponent;
  let fixture: ComponentFixture<CatalogHandToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogHandToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogHandToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
