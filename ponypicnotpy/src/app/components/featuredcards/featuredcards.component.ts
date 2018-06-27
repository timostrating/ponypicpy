import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featuredcards',
  templateUrl: './featuredcards.component.html',
  styleUrls: ['./featuredcards.component.scss']
})
export class FeaturedcardsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      var cards = document.getElementById("cards");
      cards.scrollTo(cards.scrollWidth / 2 - cards.offsetWidth / 2 - 10, 0);
  }

}
