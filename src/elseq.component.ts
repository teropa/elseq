import { Component, trigger, state, transition, style, animate} from '@angular/core';
import { Subject } from 'rxjs';
import { ForAnyOrder } from './forAnyOrder.directive';

@Component({
  selector: 'draw-app',
  template: `
    <div class="area"
         (mousemove)="moves.next({x: $event.clientX, y: $event.clientY})"
         (touchmove)="moves.next({x: $event.targetTouches[0].clientX, y: $event.targetTouches[0].clientY})">
      <div *forAnyOrder="let itm of path | async"
           class="item"
           [style.left.px]="itm.x"
           [style.top.px]="itm.y"
           [style.width.px]="itm.size"
           [style.height.px]="itm.size"
           [style.marginLeft.px]="itm.size / -2"
           [style.marginTop.px]="itm.size / -2"
           [style.borderRadius.%]="itm.r"
           @moveInAndOut="'lol'">
      </div>
    </div>
  `,
  directives: [ ForAnyOrder ],
  styles: [`
    .area {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #f8f8f8;
      -webkit-user-select: none;
    }
    .item {
      position: absolute;
      background-color: #222;
      transform-origin: center;
      -webkit-backface-visibility: none;
    }
  `],
  animations: [
    trigger('moveInAndOut', [
      transition('void => lol', [
        style({
          offset: 0,
          transform: 'perspective(10px) translateZ(0)',
          opacity: 0.8}),
        animate('1s cubic-bezier(0.075, 0.82, 0.165, 1)', style({
          offset: .2,
          transform: 'perspective(10px) translateZ(-10px)',
          opacity: 1.0
        })),
        animate('1s 3s cubic-bezier(0.55, 0.055, 0.675, 0.19)')
      ]),
      state('lol', style({
        transform: 'perspective(10px) translateZ(10px)',
        opacity: 0
      }))
    ])
  ]
})
export class ElseqAppComponent {
  moves = new Subject<{x: number, y: number}>();
  path = this.moves
    .map(({x, y}) => ({
      x: this.snapToGrid(x),
      y: this.snapToGrid(y),
      size: 40 + Math.random() * 25,
      r: Math.random() < 0.5 ? 0 : 50
    }))
    .distinctUntilChanged((l, r) => l.x === r.x && l.y === r.y)
    .bufferTime(5000, 10);

  snapToGrid(n: number) {
    return n - n % 30;
  }
}
