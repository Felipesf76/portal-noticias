import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

export const newsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./templates/news-list/news-list.component').then(c => c.NewsListComponent),
  },
  {
    path: 'created',
    loadComponent: () => import('./templates/news-created/news-created.component').then(c => c.NewsCreatedComponent),
  },
  {
    path: ':title',
    loadComponent: () => import('./templates/news-detail/news-detail.component').then(c => c.NewsDetailComponent),
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(newsRoutes), // Configurar las rutas hijas
  ],
})
export class NewsModule {}
