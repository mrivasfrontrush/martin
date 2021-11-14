import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LoggingService } from '../logging.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  @Input('MyName') name: string;
  @Output() ServerNameCreated = new EventEmitter<{ serverName: string }>();

  allowNewServer = false;
  serverCreateStatus = 'No server has been created yet';
  serverName = 'Default server';
  log = [];

  constructor(
    private LoggingService: LoggingService,
    private UserService: UserService
  ) {
    this.LoggingService.logStatus('Allow new server ' + this.allowNewServer);
    setTimeout(() => {
      this.allowNewServer = true;
      this.LoggingService.logStatus('Allow new server ' + this.allowNewServer);
    }, 2000);
  }

  ngOnInit(): void {
    this.serverName = this.name;
    this.LoggingService.logStatus('Input parameter name is: ' + this.name);
    //throw new Error('Method not implemented.');
  }

  onCreateServer() {
    this.UserService.activatedEmitter.next(this.serverName);

    this.serverCreateStatus =
      'Server was created!  Server name is ' + this.serverName;
    this.log.push(new Date());
    this.ServerNameCreated.emit({ serverName: this.serverName });
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
    this.LoggingService.logStatus(this.serverName);
  }

  getColor() {
    return this.allowNewServer == true ? 'green' : 'red';
  }

  onResetServer() {
    this.serverName = '';
    this.LoggingService.logStatus('Reset server name');
  }
}
