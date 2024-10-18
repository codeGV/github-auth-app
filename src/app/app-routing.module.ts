import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/integration',pathMatch:'full' },
  { path: 'integration', loadChildren: () => import('./pages/integration/integration.module').then(m => m.IntegrationModule) },
  { path: '**', redirectTo: 'integration' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
