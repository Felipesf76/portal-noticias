import { Routes } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register.component';

export const routes: Routes = [
  // Public routes
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
  }

];
