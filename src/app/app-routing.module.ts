import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);
const loggedIn = () => redirectLoggedInTo(['/auth/login']);

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').
      then(m => m.HomeModule), canActivate: [AuthGuard]
  },
  {
    path: 'minha-carteira',
    loadChildren: () => import('./pages/minha-carteira/minha-carteira.module').
      then(m => m.MinhaCarteiraModule),  canActivate: [AuthGuard]
  },
  {
    path: 'ativos',
    loadChildren: () => import('./pages/ativos/ativos.module').
      then(m => m.AtivosModule), canActivate: [AuthGuard]
  },
  {
    path: 'auth', loadChildren: () => import('./pages/auth/auth.module').
      then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
