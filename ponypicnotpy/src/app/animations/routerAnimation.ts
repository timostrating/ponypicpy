import {
    trigger,
    animate,
    transition,
    style,
    query
  } from '@angular/animations';
  
  export const routerAnimation = trigger('routerAnimation', [
    transition('* => *', [
      query(
        ':enter',
        [style({ opacity: 0 })],
        { optional: true }
      ),
      query(
        ':leave',
        [
            style({ opacity: 1 }), 
            animate('0.18s ease-in', style({ opacity: 0, transform: "scale(.9)" }))
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
            style({ opacity: 0, transform: "scale(1.1)" }), 
            animate('0.18s ease-out', style({ opacity: 1, transform: "scale(1)" }))
        ],
        { optional: true }
      )
    ])
  ]);