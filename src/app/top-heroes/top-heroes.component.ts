import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './top-heroes.component.html',
  styleUrls: [ './top-heroes.component.scss' ]
})
export class TopHeroesComponent implements OnInit {
  heroes: Hero;
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
    }

  getHeroes(): void {
    const offset = 0;
    const modifiedSince = 'modifiedSince=10%2F10%2F2016';
    this.heroService.getHeroes(offset, modifiedSince)
      .subscribe(heroes => this.heroes = heroes);
  }
}
