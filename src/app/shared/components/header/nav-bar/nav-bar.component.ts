import { Component } from '@angular/core';
import { PageModel } from './pages.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  list: PageModel[] = [];
  constructor() {
    this.list = [{
      title: 'Inicio',
      link: '/news'
    },
    {
      title: 'Iniciar Sesión',
      link: '/login'
    },
    {
      title: 'Registrarse',
      link: '/register'
    },
    {
      title: 'Publicidad',
      link: '/publicity'
    },
    {
      title: 'Categorías',
      link: '/categories'
    }
    ];
  }
}
