import { Routes } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register.component';
import { CategoriesListComponent } from './pages/categories/templates/categories-list/categories-list.component';
import { PublicityListComponent } from './pages/publicity/templates/publicity-list/publicity-list.component';
import { PruebaComponent } from './shared/components/prueba/prueba.component';
//import { NewsCardComponent } from './pages/news/components/news-card/news-card.component';
import { UserListComponent } from './pages/user/templates/user-list/user-list.component';
import { MyProfileComponent } from './pages/user/templates/user-myprofile/user-myprofile.component';
import { NewsListComponent } from './pages/news/templates/news-list/news-list.component';
import { NewsCreatedComponent } from './pages/news/templates/news-created/news-created.component';
import { NewsDetailComponent } from './pages/news/templates/news-detail/news-detail.component';
import { AuthGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
  // Public routes
  //{path: 'news', component: NewsCardComponent},
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'prueba',
    component: PruebaComponent
  },
  {
    path: 'news',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: NewsListComponent,
      },
      {
        path: 'created',
        component: NewsCreatedComponent,
      },
      {
        path: ':id',
        component: NewsDetailComponent,
      }
    ]
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    component: CategoriesListComponent
  },
  {
    path: 'publicity',
    canActivate: [AuthGuard],
    component: PublicityListComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UserListComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: MyProfileComponent
  }

];
