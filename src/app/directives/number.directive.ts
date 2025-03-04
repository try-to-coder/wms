import { Directive, ElementRef, HostListener } from '@angular/core';
import { ignoreElements } from 'rxjs';

@Directive({
  selector: '[appNumber]'
})
export class NumberDirective {
  private regex: RegExp = new RegExp('^[0-9]+$');
  private specialkey: Array<string> = ['Backspace','ArrowLeft','ArrowRight','ctrl+v'];

  constructor(private elementref: ElementRef) { }

  @HostListener('keydown', ['$event']) onselect(event: KeyboardEvent) {

    if (this.specialkey.indexOf(event.key) !== -1) {
      return;
    }
    const inputvalue: string = this.elementref.nativeElement.value.concat(event.key);
    console.log('inputvalue : ', inputvalue, inputvalue?.length);
    if (inputvalue?.length > 30) {
      event.preventDefault();
    }

    if (inputvalue && !String(inputvalue).match(this.regex)) {
      event.preventDefault()

    }
    return;

  }


  @HostListener('Paste',['$event'])  onpaste(event:any){
    const clipevent=(event.originalEvent || event).clipevent.getData('text/plain');
    if(clipevent){
      const reex=new RegExp('^[0-9]+$');
      if(!reex.test(clipevent)){
        clipevent.preventDefault()
      }
    }
    return;

  }
}
