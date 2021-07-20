import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs//operators';
import { takeUntilFunction } from '../take';

@Component({
  selector: 'hello',
  template: `
    <h1>Hello {{ name }}!</h1>
  `,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ]
})
export class HelloComponent implements OnInit {
  @Input() name: string;

  ngOnInit(): void {
    fromEvent(document, 'click')
      .pipe(takeUntil(this.ngOnDestroy))
      .subscribe(() => console.log('clicked'));
  }

  ngOnDestroy(): Subject<void> {
    const s = new Subject<void>();

    s.next();
    s.complete();
    return s;
  }
}
