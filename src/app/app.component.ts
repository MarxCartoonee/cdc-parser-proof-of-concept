import { Component, OnInit } from '@angular/core';
import { UtilizationService } from './services/utilization.service';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public dataSource = new MatTableDataSource([]);
  public header;
  public data;

  constructor(private utilS: UtilizationService) {}

  ngOnInit(): void {
    this.utilS
      .getTeamUtilization()
      .pipe(
        tap((re) => {
          console.log(re.header);
          console.log(re.data);
          this.header = re.header;
          this.data = re.data;
        })
      )
      .subscribe();
  }
}
