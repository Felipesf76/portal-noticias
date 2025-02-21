import { Routes } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { CategoriesListComponent } from './pages/categories/templates/categories-list/categories-list.component';
import { PublicityListComponent } from './pages/publicity/templates/publicity-list/publicity-list.component';
import { UserListComponent } from './pages/user/templates/user-list/user-list.component';
import { MyProfileComponent } from './pages/user/templates/user-myprofile/user-myprofile.component';

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
  },
  {
    path: 'user',
    component: UserListComponent
  },
  {
    path: 'myprofile',
    component: MyProfileComponent
  }

];
