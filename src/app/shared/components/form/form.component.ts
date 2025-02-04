import { Component, Input, Output, OnInit, inject, EventEmitter } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormField } from './model/form.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  @Input() fields: FormField[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  fb = inject(NonNullableFormBuilder);
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({});
  }
  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    const group = this.fb.group({});
    this.fields.forEach((field) => {
      const control = this.fb.control('', field.validators || []);
      group.addControl(field.name, control);
    });
    return group;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      this.formSubmit.emit(formValues);
    } else {
      console.log('Form is invalid');
    }
  }
}
