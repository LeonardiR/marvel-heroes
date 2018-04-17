import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import {TopHeroesComponent} from './top-heroes/top-heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'hero-list/:offset', component: HeroesComponent },
  { path: 'top-heroes', component: TopHeroesComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/top-heroes', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}

