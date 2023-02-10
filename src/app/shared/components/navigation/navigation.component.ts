import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent  implements OnInit, OnDestroy {

  alive: boolean;
  isBurgerMenuOpen = false;
 
  constructor(private _userService: UserService,
              private _router: Router) {
    this.alive = true;
  }

  ngOnInit(): void { }

  toggleNavigationMenu(open: boolean) {
    this.isBurgerMenuOpen = open;
  }

  isUserLoggedIn() {
    return this._userService.isLoggedIn();
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['/main']);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
