import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function takeUntilFunction<T>(
  component: any
): MonoTypeOperatorFunction<T> {
  const mysubject = new Subject<void>();

  const og = component.ngOnDestroy;

  console.log('takeuntil mine');
  component.ngOnDestroy = function() {
    console.log('my on destroy');
    mysubject.next();
    mysubject.complete();
    if (og) {
      return og();
    }
  }.bind(component);

  return takeUntil(mysubject);
}
