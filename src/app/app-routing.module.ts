import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'wip',
    loadChildren: () =>
      import('./work-in-progress/work-in-progress.module').then(
        (m) => m.WorkInProgressModule
      )
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
