import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibosListadoComponent } from './recibos-listado.component';

describe('RecibosListadoComponent', () => {
  let component: RecibosListadoComponent;
  let fixture: ComponentFixture<RecibosListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecibosListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecibosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
