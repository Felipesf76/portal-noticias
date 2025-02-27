import { Component, OnInit } from '@angular/core';
import { PageModel } from './pages.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  providers: [UserService]
})
export class NavBarComponent implements OnInit {
  public userLogged: boolean = false;
  public  authSubscription: Subscription = new Subscription();
  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {

    this.authSubscription = this.userService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.userLogged = isAuthenticated;
      }
    );

    this.userLogged = this.userService.isLoggedIn();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
