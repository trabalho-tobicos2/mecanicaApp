import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdensPage } from './ordens.page';

describe('OrdensPage', () => {
  let component: OrdensPage;
  let fixture: ComponentFixture<OrdensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
