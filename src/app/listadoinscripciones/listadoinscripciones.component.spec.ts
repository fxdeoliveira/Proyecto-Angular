import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoinscripcionesComponent } from './listadoinscripciones.component';

describe('ListadoinscripcionesComponent', () => {
  let component: ListadoinscripcionesComponent;
  let fixture: ComponentFixture<ListadoinscripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoinscripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoinscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
