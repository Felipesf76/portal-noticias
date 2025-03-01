import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, Signal, ViewChild } from '@angular/core';
import { PageModel } from './pages.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '@services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{
  public  authSubscription: Subscription = new Subscription();
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  public userLogged: Signal<boolean>;
  public isDropdownOpen = false;

  constructor(
    private userService: UserService,
    private renderer: Renderer2
  ) {
    this.userLogged = this.userService.isAuthenticatedSignal;
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
