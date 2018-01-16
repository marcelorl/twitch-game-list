import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TwitchService } from './twitch.service';
import { HomeComponent } from './Home/home.component';
import { SearchComponent } from './Search/search.component';
import { FilterComponent } from './Filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TwitchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
