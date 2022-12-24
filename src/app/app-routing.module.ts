import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BtpListComponent } from './components/btp-list/btp-list.component';
import { FoiExTabacchiComponent } from './components/foi-ex-tabacchi/foi-ex-tabacchi.component';
import { ListCiComponent } from './components/list-ci/list-ci.component';
import { HomeComponent } from './components/home/home.component';

/* eslint-disable max-len, @typescript-eslint/explicit-function-return-type, @typescript-eslint/promise-function-async, @typescript-eslint/no-unsafe-assignment */
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'foi/list', component: FoiExTabacchiComponent },
  { path: 'ci/list', component: ListCiComponent },
  { path: 'btp/list', component: BtpListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
