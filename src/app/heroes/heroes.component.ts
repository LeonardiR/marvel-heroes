import {Component, OnInit, OnChanges, DoCheck} from '@angular/core';
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
  numbers = [];
  modifiedSince = '';
  offset = +this.route.snapshot.paramMap.get('offset');
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private router: Router,
              private location: Location) {}

  ngOnInit() {
    this.getHeroes();
    }
  ngDoCheck() {
      this.generatePagerLinks();
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
    this.heroes.data.offset = offset + 20;
    this.getHeroesOffset(this.heroes.data.offset);
    this.router.navigate([`/hero-list/${this.heroes.data.offset}`]);
  }

  prevHeroes(offset: number): void {
    this.heroes.data.offset = offset - 20;
    this.getHeroesOffset(this.heroes.data.offset);
    this.router.navigate([`/hero-list/${this.heroes.data.offset}`]);
    }
    generatePagerLinks(): void {
      this.heroes.data.total = this.heroes.data.total / 20;
      this.heroes.data.total = Math.round(this.heroes.data.total);
      this.numbers = Array(this.heroes.data.total).fill(0).map((x, i) => i);
    }
}
