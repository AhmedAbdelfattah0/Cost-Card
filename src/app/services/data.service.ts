import { Injectable } from '@angular/core';

import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { from } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  constructor(private http: Http) { }

  getModels(): Observable<any> {
    return this.http.get('assets/data/Model.json').pipe(map((res: Response) => {
      return res.json();
    })).catch(this.handleError);
  }



  getCPACategories(): Observable<any> {
    return this.http.get('assets/data/Categuries/CPACateguries.json').pipe(map((res: Response) => {
      return res.json();
    })).catch(this.handleError);
  }

  getCPCCategories(): Observable<any> {
    return this.http.get('assets/data/Categuries/CPCCateguries.json').pipe(map((res: Response) => {
      return res.json();
    })).catch(this.handleError);
  }



  getCPICategories(): Observable<any> {
    return this.http.get('assets/data/Categuries/CPICateguries.json').pipe(map((res: Response) => {
      return res.json();
    })).catch(this.handleError);
  }

  getCPLCategories(): Observable<any> {
    return this.http.get('assets/data/Categuries/CPLCategories.json').pipe(map((res: Response) => {
      return res.json();
    })).catch(this.handleError);
  }

  getCPVLCategories(): Observable<any> {
    return this.http.get('assets/data/Categuries/CPVLCateguries.json').pipe(map((res: Response) => {
      return res.json();
    })).catch(this.handleError);
  }

  getRegions(): Observable<any> {
    return this.http.get('assets/data/Region/Region.json').pipe(map((res: Response) => {
      return res.json();
    })).catch(this.handleError);
  }
}
