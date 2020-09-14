import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import { RouterLinkWithHref } from "@angular/router";

describe('NavbarComponent', () => {
  let component: NavbarComponent
  let fixture: ComponentFixture<NavbarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should include routerLink /basket', () => {
    // получаем массив из роутерЛинков шаблона этого компонента
    const debug = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref))

    // смотрим есть ли элемент с урлом баскета
    const isIncludesBasket = debug.some(link => link.properties.href === '/basket')

    expect(isIncludesBasket).toBeTruthy()
  })
})
