import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPayloadComponent } from './item-payload.component';

describe('ItemPayloadComponent', () => {
  let component: ItemPayloadComponent;
  let fixture: ComponentFixture<ItemPayloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPayloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPayloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
