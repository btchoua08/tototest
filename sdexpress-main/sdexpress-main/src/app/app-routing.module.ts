import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'reports', loadChildren: () => import('./social-media/social-media.module').then(m => m.SocialMediaModule) },
  { path: 'register', loadChildren: () => import('./complex-form/complex-form.module').then(m => m.ComplexFormModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'publish', loadChildren: () => import('./publish/publish.module').then(m => m.PublishModule) },
  { path: 'travelers', loadChildren: () => import('./reactive-state/reactive-state.module').then(m => m.ReactiveStateModule)},
  { path: '', pathMatch: 'full', redirectTo: 'travelers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
