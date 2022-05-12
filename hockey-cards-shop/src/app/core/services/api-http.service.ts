import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Class for API related methods
 */
export class ApiHttpService {

  url: string = "";

  constructor(private http: HttpClient) {

    this.url = "https://cors-anywhere.herokuapp.com/https://records.nhl.com/site/api/player/";
    this.url = "https://records.nhl.com/site/api/player/";
    this.url = "http://localhost:5000/";

  }

  /**
   * This function returns the response from API call
   * @returns Observable of type Object
   */
  public getAll(): Observable<Object> {
    return this.http.get(this.url);
  }
}
