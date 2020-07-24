import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from "@angular/material/icon";

import { SafePipe } from './pipes/safe.pipe';
import { SegmentsComponent } from './segments/segments.component';
import { FooterComponent } from './footer/footer.component';
import { NewLandingComponent } from './new-landing/new-landing.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { HeaderComponent } from './header/header.component';
import { StartButtonComponent } from './start-button/start-button.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { VideoPageComponent } from './video-page/video-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SafePipe,
    SegmentsComponent,
    FooterComponent,
    NewLandingComponent,
    GetStartedComponent,
    HeaderComponent,
    StartButtonComponent,
    AboutUsComponent,
    MemberCardComponent,
    VideoPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
