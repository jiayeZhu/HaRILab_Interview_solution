import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TabsPageModule} from "./tabs/tabs.module";
import {RegisterPage} from "./register/register.page";

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    // component: TabsPageModule
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
