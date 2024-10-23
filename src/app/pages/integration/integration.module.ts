import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationComponent } from './component/integration.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GithubIntegrationService } from 'src/app/services/github-integration.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AgGridModule } from 'ag-grid-angular';
import { CheckboxRendererComponent } from 'src/app/pages/integration/component/checkbox-renderer/checkbox-renderer.component';
const routes: Routes = [
  { path: '', component: IntegrationComponent }
];

@NgModule({
  declarations: [
    IntegrationComponent,
    CheckboxRendererComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    AgGridModule,
    RouterModule.forChild(routes)
  ],
  providers: [GithubIntegrationService]
})
export class IntegrationModule { }
