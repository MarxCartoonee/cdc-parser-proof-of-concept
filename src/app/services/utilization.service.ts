import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataWrapper } from '../models/data-wrapper.model';
import { UtilizationClusterfuck as IUtilizationClusterfuck } from '../models/utilization-clusterfuck.model';
import { pluck, map } from 'rxjs/operators';
import { UtilizationClusterfuck } from '../classes/utilization-clusterfuck.class';

@Injectable({
  providedIn: 'root',
})
export class UtilizationService {
  private readonly url = 'http://192.168.88.90:8080/api/v1/teams';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private readonly httpOptions = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {}

  public getTeamUtilization(): Observable<UtilizationClusterfuck> {
    return this.http
      .get<DataWrapper<IUtilizationClusterfuck>>(
        `${this.url}/utilization/last-two-weeks/`
      )
      .pipe(
        pluck('data'),
        map((re) => new UtilizationClusterfuck(re))
      );
  }
}
