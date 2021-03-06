import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TwitchService } from './twitch.service';
import { HomeComponent } from './pages/Home/home.component';
import { DetailsComponent } from './pages/Details/details.component';
import { SearchComponent } from './molecules/Search/search.component';
import { FilterComponent } from './molecules/Filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    SearchComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [TwitchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
