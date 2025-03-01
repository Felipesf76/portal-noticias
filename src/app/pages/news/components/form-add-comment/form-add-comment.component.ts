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
  }

  onSubmit(): void {
    this.textComment.emit(this.text)
    const commentElement = document.getElementById('comment') as HTMLTextAreaElement;

    if (commentElement) {
      commentElement.value = '';
    }
    this.text = ''
  }
}
