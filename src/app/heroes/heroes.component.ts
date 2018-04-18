import {Component, OnInit, DoCheck} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import {Hero} from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, DoCheck {
  heroes: Hero;
  paginationLinks = [];
  numberOfLinks: number;
  modifiedSince = '';
  resultsPerPages = 20;
  offset = +this.route.snapshot.paramMap.get('offset');
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private router: Router,
              private location: Location) {}

  ngOnInit() {
    this.getHeroes();
    }
  ngDoCheck() {
      this.generatePaginationLinks();
  }
    getHeroes(): void {
    this.heroService.getHeroes(this.offset, this.modifiedSince)
      .subscribe(heroes => this.heroes = heroes);
    }
    getHeroesOffset(offset: number): void {
    this.heroService.getHeroes(offset, this.modifiedSince)
      .subscribe(heroes => this.heroes = heroes);
    }

  nextHeroes(offset: number): void {
    this.heroes.data.offset = offset + this.resultsPerPages;
    this.getHeroesOffset(this.heroes.data.offset);
    this.router.navigate([`/hero-list/${this.heroes.data.offset}`]);
  }

  prevHeroes(offset: number): void {
    this.heroes.data.offset = offset - this.resultsPerPages;
    this.getHeroesOffset(this.heroes.data.offset);
    this.router.navigate([`/hero-list/${this.heroes.data.offset}`]);
    }
    generatePaginationLinks(): void {
      this.numberOfLinks = this.heroes.data.total / this.resultsPerPages;
      this.numberOfLinks = Math.round(this.numberOfLinks);
      this.paginationLinks = Array(this.numberOfLinks).fill(0).map((x, i) => i);
    }
}
