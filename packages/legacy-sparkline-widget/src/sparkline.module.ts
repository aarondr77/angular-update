import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegacySparklineComponent } from './sparkline.component';

@NgModule({
  declarations: [LegacySparklineComponent],
  imports: [CommonModule],
  exports: [LegacySparklineComponent],
})
export class LegacySparklineModule {}
