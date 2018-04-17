import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  heroes: Hero;
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    const offset = 0;
    const modifiedSince = '';
    this.heroService.getHeroes(offset, modifiedSince)
      .subscribe(heroes => this.heroes = heroes);
  }
}
