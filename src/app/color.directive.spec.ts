import { ColorDirective } from './color.directive';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'app-directive-testing',
  template: `
    <div>
      <p appColor="red">lorem</p>
      <p appColor>pidorem</p>
    </div>
  `
})
class DirectiveTesting {}

describe('ColorDirective', () => {
  let fixture: ComponentFixture<DirectiveTesting>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorDirective, DirectiveTesting]
    })

    fixture = TestBed.createComponent(DirectiveTesting)
    fixture.detectChanges()
  })

  it('should create an instance', () => {
    const directive = new ColorDirective(null)
    expect(directive).toBeTruthy()
  })

  it('should apply directive', () => {
    const debug = fixture.debugElement.queryAll(By.css('p'))

    debug.forEach((p, index) => {
      if (index === 0) expect(p.nativeElement.style.backgroundColor).toBe('red')
      if (index === 1) {
        // получим значение default сразу из директивы, чтобы ниже не хардкодить 'aqua'
        const _default = p.injector.get(ColorDirective).default
        expect(p.nativeElement.style.backgroundColor).toBe(_default)
      }
    })
  })
})
