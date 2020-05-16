import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicosPage } from './servicos.page';

describe('ServicosPage', () => {
  let component: ServicosPage;
  let fixture: ComponentFixture<ServicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
