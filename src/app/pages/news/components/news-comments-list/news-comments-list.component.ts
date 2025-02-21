import { Component, Input } from '@angular/core';
import { Comments } from '@app/models/Comments';

@Component({
  selector: 'app-news-comments-list',
  imports: [],
  templateUrl: './news-comments-list.component.html',
  styleUrl: './news-comments-list.component.css'
})
export class NewsCommentsListComponent {
  @Input() comment:Comments = new Comments('', new Date(), '', '', '')
}
