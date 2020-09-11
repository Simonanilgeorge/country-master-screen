import { Injectable } from '@angular/core';
import {country} from './country';
import { Observable,of } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
 

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    private url:string="https://trn.api.alqasim.net/country";


    getcountry():Observable<country[]>{
    
      return this.http.get<country[]>(this.url);
    }


addcountry(newcountry:country): Observable<country> {
  return this.http.post<country>(this.url,newcountry, this.httpOptions)
  .pipe(
 catchError(this.handleError<country>('error'))
  );;


}



/** PUT: update the hero on the server */
updatecountry(country:country,code:number): Observable<country> {
  console.log(`the code is ${code}`);
 let url=`${this.url}/${code}`;
  return this.http.put(url,country, this.httpOptions).pipe(
  
    catchError(this.handleError<any>('updateHero'))
  );
}


deletecountry(code:number): Observable<country> {
  console.log(`the code to be deleted is ${code}`);
    let url = `${this.url}/${code}`;
    console.log(`the url is ${url}`);
  
    return this.http.delete<country>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError<country>('deleteHero'))
    );
  }
}
