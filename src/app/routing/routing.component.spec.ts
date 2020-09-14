import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutingComponent } from './routing.component';
import { Subject } from "rxjs";
import { ActivatedRoute, Params, Router, RouterOutlet } from "@angular/router";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

class RouterStub {
  public navigate(path: string[]): void {}
}

class ActivatedRouteStub {
  private subject: Subject<Params> = new Subject<Params>()

  public push(params: Params): void {
    this.subject.next(params)
  }

  public get params() {
    return this.subject.asObservable()
  }
}

describe('RoutingComponent', () => {
  let component: RoutingComponent
  let fixture: ComponentFixture<RoutingComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingComponent ],
      imports: [ RouterTestingModule ], // это нужно для того, чтобы тестовая среда знала об <router-outlet>
      providers: [
        /* чтобы получить внутри компонента апиху Ангулярских роутов,
        * нужно указать их фейки в провайдерах модуля: */
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })

    fixture = TestBed.createComponent(RoutingComponent)
    component = fixture.componentInstance
    fixture.detectChanges();
  })

  it('should created', () => {
    expect(component).toBeDefined()
  })

  it('should navigate to /posts if goBack()', () => {
    let router = TestBed.inject(Router) // получаем апиху
    let spy = spyOn(router, 'navigate') // шпионим

    component.goBack()

    expect(spy).toHaveBeenCalledWith(['/posts'])
  })

  it('should navigate to 404 if id === 0', () => {
    const router = TestBed.inject(Router)
    const activatedRoute: ActivatedRouteStub = TestBed.get(ActivatedRoute) // получаем апиху чтобы своими руками запушить 0 в URL
    /* const activatedRoute: ActivatedRouteStub = TestBed.inject(ActivatedRoute)
      не работает с какого-то хуя! Ругается на ТС */
    const spy = spyOn(router, 'navigate')

    activatedRoute.push({ id: '0' })

    expect(spy).toHaveBeenCalledWith(['/404'])
  })

  it('should have router-outlet', () => {
    const debug = fixture.debugElement.query(By.directive(RouterOutlet))

    expect(debug).not.toBeNull()
  })
})
