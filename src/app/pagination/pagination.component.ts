import {Component, DoCheck, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Hero} from '../hero';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, DoCheck {
  @Input() heroes: Hero;
  @Input() resultsPerPages: number;
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goResult = new EventEmitter<boolean>();
  @Output() currentOffset = new EventEmitter<number>();
  paginationLinks = [];
  numberOfLinks: number;
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.generatePaginationLinks();
    }

  nextHeroes(): void {
    this.goNext.emit(true);
  }

  prevHeroes(): void {
    this.goPrev.emit(true);
  }
  goHeroes(currentOffset): void {
    this.currentOffset.emit(currentOffset);
    this.goResult.emit(true);
  }
  generatePaginationLinks(): void {
    this.numberOfLinks = this.heroes.data.total / this.resultsPerPages;
    this.numberOfLinks = Math.round(this.numberOfLinks);
    this.paginationLinks = Array(this.numberOfLinks).fill(0).map((x, i) => i);
  }

}
