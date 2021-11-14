export class LoggingService {
  constructor() {
    this.logStatus('Logging service started.');
  }
  logStatus(status: string) {
    console.log('Server status changed,  new status: ' + status);
  }
}
