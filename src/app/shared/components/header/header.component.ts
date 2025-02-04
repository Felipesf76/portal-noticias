import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NavBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = '';
  constructor() {
    this.title = 'Informa 360';
  }
}
