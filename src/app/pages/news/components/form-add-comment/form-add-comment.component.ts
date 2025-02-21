import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-add-comment',
  imports: [],
  templateUrl: './form-add-comment.component.html',
  styleUrl: './form-add-comment.component.css'
})
export class FormAddCommentComponent {
  @Output() textComment = new EventEmitter<string>();
  public text = ''

  onChange(event: any): void {
    this.text = event.target.value
    console.log(this.text)
  }

  onSubmit(): void {
    this.textComment.emit(this.text)
  }
}
