import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VeiculosPage } from './veiculos.page';

describe('VeiculosPage', () => {
  let component: VeiculosPage;
  let fixture: ComponentFixture<VeiculosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VeiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
