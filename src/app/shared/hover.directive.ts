import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {

  @Input('appHover') hoverClass = '';

  @Input() defClass = '';

  @HostBinding('class') bindingClass: string;

  private classToBind = '';
  @HostListener('mouseenter') mouseover() {
    this.bindingClass = this.classToBind;
  }

  @HostListener('mouseleave') mouseleave() {
    this.bindingClass = this.defClass;
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    let array  = '';
    for (const tmp of this.elementRef.nativeElement.classList){
      array = array + tmp + ' ';
    }
    this.defClass = array.substr(0, array.length - 1);
    this.bindingClass = this.defClass;
    this.classToBind = array + this.hoverClass;
  }

}
