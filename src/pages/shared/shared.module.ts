import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FromNowPipe } from "./from-now.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FromNowPipe,
    ReactiveFormsModule
  ],
  declarations: [FromNowPipe],
  providers: []
})
export class SharedModule {}
