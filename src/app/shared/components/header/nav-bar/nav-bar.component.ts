import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, Renderer2, Signal, ViewChild } from '@angular/core';
import { PageModel } from './pages.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '@services/user.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '@app/models/User';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  public  authSubscription: Subscription = new Subscription();
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  public userLogged: Signal<boolean>;
  userService = inject(UserService);
  public isAdmin: Signal<boolean>;
  public isDropdownOpen = false;
  public userInfo: User = {} as User;
  public userPhoto = '';

  constructor(
  ) {
    this.userLogged = this.userService.isAuthenticatedSignal;
    this.isAdmin = this.userService.isAdminSignal

  }

  ngOnInit() {
    const id = sessionStorage.getItem('user_id')

    if (id) {
      this.userService.getById(id).subscribe(
        (response) => {
          if (response.multimedia) {
            this.userPhoto = response.multimedia;
          }else {
            this.userPhoto = ''
          }
        }
      )
    }
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation()
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.isDropdownOpen = false;
  }
}
