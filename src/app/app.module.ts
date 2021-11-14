import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { Assignment1Component } from './assignment1/assignment1.component';
import { WarningComponent } from './warning/warning.component';
import { SuccessComponent } from './assignment1/success/success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggingService } from './logging.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    Assignment1Component,
    WarningComponent,
    SuccessComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
