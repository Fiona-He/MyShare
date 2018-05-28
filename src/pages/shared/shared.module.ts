import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FromNowPipe } from "./from-now.pipe";
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";

// import { MaterialModule } from "./material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ElasticHeaderModule,
    ReactiveFormsModule,
    // MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FromNowPipe,
    ReactiveFormsModule,
    // MaterialModule
  ],
  declarations: [FromNowPipe],
  providers: []
})
export class SharedModule {}
