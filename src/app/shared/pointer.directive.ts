import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[appCursorPointer]'
})
export class PointerDirective {

  @HostBinding('style.cursor') _cursor = 'pointer';

  constructor() { }

}
