import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDecimal]'
})
export class DecimalDirective {

  private regex: RegExp = new RegExp('^[0-^(\d*\.)?\d+$]+$');
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
      const reex=new RegExp('^[0-^(\d*\.)?\d+$]+$');
      if(!reex.test(clipevent)){
        clipevent.preventDefault()
      }
    }
    return;

  }

}
