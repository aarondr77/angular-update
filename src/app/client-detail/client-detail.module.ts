import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegacySparklineModule } from '@bofa/legacy-sparkline-widget';
import { SharedModule } from '../shared/shared.module';
import { ClientDetailComponent } from './client-detail.component';

const routes: Routes = [{ path: '', component: ClientDetailComponent }];

@NgModule({
  declarations: [ClientDetailComponent],
  imports: [SharedModule, LegacySparklineModule, RouterModule.forChild(routes)],
})
export class ClientDetailModule {}
