import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { ModalFormComponent } from './pages/news/components/modal-form/modal-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class AppModule {}
