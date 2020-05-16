import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PecasPage } from './pecas.page';

describe('PecasPage', () => {
  let component: PecasPage;
  let fixture: ComponentFixture<PecasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PecasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PecasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
