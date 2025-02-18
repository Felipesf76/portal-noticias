import { Routes } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { CategoriesListComponent } from './pages/categories/templates/categories-list/categories-list.component';
import { PublicityListComponent } from './pages/publicity/templates/publicity-list/publicity-list.component';
//import { NewsCardComponent } from './pages/news/components/news-card/news-card.component';

export const routes: Routes = [
  // Public routes
  //{path: 'news', component: NewsCardComponent},
  {
    path: 'news',
    loadChildren: () => import('@news/news.routes').then(m => m.NewsModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'categories',
    component: CategoriesListComponent
  },
  {
    path: 'publicity',
    component: PublicityListComponent
  }

];
