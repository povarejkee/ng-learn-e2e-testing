import {ComponentFixture, TestBed} from '@angular/core/testing'
import {CounterComponent} from "./counter.component"
import {By} from "@angular/platform-browser"

describe('CounterComponent', () => {
  let component: CounterComponent
  let fixture: ComponentFixture<CounterComponent>

  beforeEach(() => { // настройка модуля для е2е
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })

    fixture = TestBed.createComponent(CounterComponent) // создание компонента для тестирования
    component = fixture.componentInstance // вырываем инстанс
    // fixture.debugElement
    // fixture.nativeElement
  })

  it('should be created', () => {
    expect(component).toBeDefined() // был ли создан?
  })

  it('should render counter changes', () => {
    const testValue = 10

    component.counter = testValue

    /* даем понять, что св-во "counter" изменилось
 (без этого действия присвоение ВЫШЕ не засчитается): */
    fixture.detectChanges()

    // теперь нужно получить необходимую ноду в шаблоне:
    const node: HTMLElement = fixture.debugElement.query(By.css('.counter')).nativeElement

    // проверяем, равно ли значение из ноды новому присвоенному значению из шаблона:
    expect(node.textContent).toContain(String(testValue))
  })

  it('should add .green to h1 if counter has even value', () => {
    component.counter = 2
    fixture.detectChanges()

    const node: HTMLElement = fixture.debugElement.query(By.css('.counter')).nativeElement

    expect(node.classList.contains('green')).toBeTruthy() // добавился ли класс .green?
  })

  it('should increment counter value if inc-button was clicked', () => {
    const btn = fixture.debugElement.query(By.css('#increment'))
    btn.triggerEventHandler('click', null) // имитируем клик

    expect(component.counter).toBe(1) // после клика сработает функция inc() и счетчик должен увеличиться
  })
})
