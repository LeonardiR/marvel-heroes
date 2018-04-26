import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {Hero} from '../hero';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() heroes: Hero;
  @Input() resultsPerPages: number;
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() currentOffset = new EventEmitter<number>();
  paginationLinks = [];
  numberOfLinks: number;
  currentLink: number;
  selectedItemId: number;

  constructor() {}

  ngOnInit() {
    this.generatePaginationLinks();
    }

  nextHeroes(): void {
    this.goNext.emit(true);
    }

  prevHeroes(): void {
    this.goPrev.emit(true);
  }

  goHeroes(currentOffset: number, currentLink: number): void {
    this.currentOffset.emit(currentOffset);
    this.currentLink = currentLink;
    this.paginationLinks = Array(this.numberOfLinks).fill(0).map((x, i) => i);

    if (this.currentLink <= this.paginationLinks.length - this.resultsPerPages / 2 && this.currentLink > this.resultsPerPages / 2) {
      this.paginationLinks = this.paginationLinks.slice
      (this.currentLink - this.resultsPerPages / 2, this.currentLink + this.resultsPerPages / 2);

    } else  if (this.currentLink > this.paginationLinks.length - this.resultsPerPages / 2 ) {
      this.paginationLinks = this.paginationLinks.slice(this.paginationLinks.length - this.resultsPerPages, this.paginationLinks.length);

    } else {
      this.paginationLinks = this.paginationLinks.slice(0, this.resultsPerPages);
    }
  }

  generatePaginationLinks(): void {
    this.numberOfLinks = this.heroes.data.total / this.resultsPerPages;
    this.numberOfLinks = Math.round(this.numberOfLinks);
    this.paginationLinks = Array(this.numberOfLinks).fill(0).map((x, i) => i);
    this.paginationLinks = this.paginationLinks.slice(0, this.resultsPerPages);
    }
}
