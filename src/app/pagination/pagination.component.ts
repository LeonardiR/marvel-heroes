import {Component, DoCheck, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

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
  paginationLinks = [];
  numberOfLinks: number;
  offset = +this.route.snapshot.paramMap.get('offset');
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
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
  generatePaginationLinks(): void {
    this.numberOfLinks = this.heroes.data.total / this.resultsPerPages;
    this.numberOfLinks = Math.round(this.numberOfLinks);
    this.paginationLinks = Array(this.numberOfLinks).fill(0).map((x, i) => i);
  }

}
