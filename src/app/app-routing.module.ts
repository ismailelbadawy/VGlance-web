import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewLandingComponent } from './new-landing/new-landing.component';
import { VideoPageComponent } from './video-page/video-page.component';

const routes: Routes = [
  {
    path : '',
    component : NewLandingComponent
  },
  {
    path : 'video',
    component : VideoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
