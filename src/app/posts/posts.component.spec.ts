import {PostsComponent} from "./posts.component";
import {PostsService} from "./posts.service";
import {ComponentFixture, TestBed, async, fakeAsync, tick} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";

describe('PostsComponent', () => {
  let component: PostsComponent
  let fixture: ComponentFixture<PostsComponent>
  let service: PostsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      providers: [ PostsService ],
      imports: [ HttpClientModule ]
    })

    fixture = TestBed.createComponent(PostsComponent) // создание компонента для тестирования
    component = fixture.componentInstance // вырываем инстанс

    //service = fixture.debugElement.injector.get(PostsService)
    service = TestBed.inject(PostsService) // два способа получить сервис
  })

  xit('should fetch posts while ngOnInit', () => {
    const testPosts = ['test', 'e2e', 'why?!']

    spyOn(service, 'fetch').and.returnValue(of(testPosts)) // шпионим за сервисом
    fixture.detectChanges() // детектим изменения после выполнения fetch()

    expect(component.posts).toEqual(testPosts) // смотрим, присвоились ли новые данные в компонент
  })

    /* ПЕРВЫЙ ВАРИАНТ тестировать асинхронные моменты -- оборачивать в fakeAsync() всю функцию и внутри создавать
    * искусственную задержу с помощью метода tick() */
  xit('should fetchPromise posts while ngOnInit', fakeAsync(() => {
    const testPosts = ['test', 'e2e', 'why?!']

    spyOn(service, 'fetchPromise').and.returnValue(Promise.resolve(testPosts)) // шпионим за сервисом
    fixture.detectChanges() // детектим изменения после выполнения fetchPromise()

    tick()

    expect(component.posts).toEqual(testPosts) // смотрим, присвоились ли новые данные в компонент
  }))

  /* ВТОРОЙ ВАРИАНТ тестировать асинхронные моменты -- оборачивать в async() всю функцию
  * и после резолва fixture.whetStable() в then вызывать "expect" */
  it('should fetchPromise posts while ngOnInit', async(() => {
    const testPosts = ['test', 'e2e', 'why?!']

    spyOn(service, 'fetchPromise').and.returnValue(Promise.resolve(testPosts)) // шпионим за сервисом
    fixture.detectChanges() // детектим изменения после выполнения fetchPromise()

    fixture.whenStable().then(() => {
      expect(component.posts).toEqual(testPosts) // смотрим, присвоились ли новые данные в компонент
    })
  }))
})
