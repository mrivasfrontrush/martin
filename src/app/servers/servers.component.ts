import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { HttpClient } from '@angular/common/http';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  // template: `<h3>Inside inline template</h3>
  //   <app-server></app-server>,
  //styleUrls: ['./servers.component.css'],
  styles: [
    `
      h3 {
        color: dodgerBlue;
      }
    `,
  ],
})
export class ServersComponent implements OnInit {
  private _makeFilter = new FormControl('');
  public get makeFilter() {
    return this._makeFilter;
  }
  public set makeFilter(value) {
    this._makeFilter = value;
  }
  resultingMakes: Observable<string[]>;

  public serverName = 'Default from ServersComponent';

  constructor(
    private httpClient: HttpClient,
    private loggingService: LoggingService
  ) {
    this.resultingMakes = this.makeFilter.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      switchMap((f) =>
        this.httpClient.get<string[]>(
          `https://vehicle-data.azurewebsites.net/api/makes?make=${f}`
        )
      )
    );
  }

  ngOnInit(): void {}

  onServerCreated(sentData: { serverName: string }) {
    this.serverName = sentData.serverName;
    this.loggingService.logStatus(sentData.serverName);
  }
}
