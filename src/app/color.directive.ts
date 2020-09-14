import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnChanges {
  public default: string = 'aqua'

  @Input('appColor') color: string

  constructor(private ref: ElementRef) {}

  ngOnChanges(): void {
    this.ref.nativeElement.style.backgroundColor = this.color || this.default
  }
}
