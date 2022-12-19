import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FoiExTabacchiComponent } from './components/foi-ex-tabacchi/foi-ex-tabacchi.component';
import { CalcoloCIComponent } from './components/calcolo-ci/calcolo-ci.component';

/* eslint-disable max-len, @typescript-eslint/explicit-function-return-type, @typescript-eslint/promise-function-async */
const routes: Routes = [
  { path: '', redirectTo: '/foi/list', pathMatch: 'full' },
  { path: 'foi/list', component: FoiExTabacchiComponent },
  { path: 'ci/calcolo', component: CalcoloCIComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
