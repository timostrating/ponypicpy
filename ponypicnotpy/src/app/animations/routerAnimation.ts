import {
    trigger,
    animate,
    transition,
    style,
    query
} from '@angular/animations';

export const routerAnimation = trigger('routerAnimation', [
    transition('index => *', [
        query(
            ':enter',
            [
                style({
                    opacity: 0,
                    // boxShadow: "0px 0px 60px 0px #cccccc7d"
                })
            ]
        ),
        query(
            ':leave',
            [
                style({ opacity: 1 }),
                animate('0.75s', style({ opacity: 1 }))
            ],
            { optional: true }
        ),
        query(
            ':enter',
            [
                style({ transform: "translateX(100%)", opacity: 0.2 }),
                animate('0.75s ease-out', style({ transform: "translateX(0%)", opacity: 1 }))
            ],
            { optional: true }
        )
    ]),
    transition('* => index', [
        query(
            ':leave',
            [
                style({ 
                    transform: "translateX(0%)",
                    // boxShadow: "0px 0px 60px 0px #cccccc7d"
                }),
                animate('0.75s ease-in', style({ transform: "translateX(100%)" }))
            ],
            { optional: true }
        ),
        query(
            ':enter',
            [
                style({ opacity: 1 })
            ],
            { optional: true }
        )
    ])
]);