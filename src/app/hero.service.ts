import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

import { Hero } from './hero';


const md5 = new Md5();

@Injectable()

export class HeroService {
  private heroesUrl = 'http://gateway.marvel.com/v1/public';  // URL to web api
  private apiKey = '1b744448cc7315546da32d2e0fdfc8a4'; // Public API Key
  private privateApiKey = 'e8ff8a660ccb714209a5b8133d931c62b5210083'; // Private API Key
  private ts = new Date().getTime();
  private hash = md5.appendStr(this.ts + this.privateApiKey + this.apiKey).end();

  getHeroes (offset: number, modifiedSince: string): Observable<Hero> {
    return this.http.get<Hero>
    (`${this.heroesUrl}/characters?${modifiedSince}&offset=${offset}&ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}`);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/characters/${id}?ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}`;
    return this.http.get<Hero>(url).pipe(
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}
}
