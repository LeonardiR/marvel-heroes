import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero;
  offset = 0;
  modifiedSince = '';
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes(this.offset, this.modifiedSince)
      .subscribe(heroes => this.heroes = heroes);
    }

  nextHeroes(): void {
    this.offset = this.offset + 20;
    this.getHeroes();
  }

  prevHeroes(): void {
    this.offset = this.offset - 20;
    this.getHeroes();
  }
}
