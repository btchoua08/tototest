import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {

  @Input() color = 'yellow';
  @Input() detectText = '';

  private enabled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    if (this.el.nativeElement.innerText.includes(this.detectText)) {
      this.setBackgroundColor(this.color);
      this.enabled = true;
    }
  }

  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  @HostListener('mouseenter') mouseEnter() {
    if (this.enabled) {
      this.setBackgroundColor('lightgreen');
    }
  }

  @HostListener('mouseleave') mouseLeave() {
    if (this.enabled) {
      this.setBackgroundColor(this.color);
    }
  }
}
