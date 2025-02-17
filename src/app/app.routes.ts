import { Routes } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { UserListComponent } from './pages/user/templates/user-list/user-list.component';
//import { NewsCardComponent } from './pages/news/components/news-card/news-card.component';

export const routes: Routes = [
  // Public routes
  //{path: 'news', component: NewsCardComponent},
  {
    path: 'news',
    loadChildren: () => import('@news/news.routes').then(m => m.NewsModule)
  },
  {
    path: 'user',
    component: UserListComponent
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
