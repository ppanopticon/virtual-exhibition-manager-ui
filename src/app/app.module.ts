import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ServicesModule} from './services/services.module';
import {MaterialModule} from './material.module';
import {ExhibitionsModule} from './components/exhibitions/exhibitions.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      ServicesModule,
      MaterialModule,
      ExhibitionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
