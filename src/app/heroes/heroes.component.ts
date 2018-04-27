import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Hero} from '../hero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {
  p = 1;
  heroes: Hero;
  modifiedSince = '';
  resultsPerPages = 20;
  offset: number;
  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private router: Router
              ) {}

  ngOnInit() {
    this.getHeroes();
    }

  getHeroes(): void {
    this.offset = +this.route.snapshot.paramMap.get('offset');
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

}
