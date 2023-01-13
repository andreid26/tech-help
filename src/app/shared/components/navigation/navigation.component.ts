import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent  implements OnInit, OnDestroy {

  alive: boolean;
  isBurgerMenuOpen = false;
 
  constructor() {
    this.alive = true;
  }

  ngOnInit(): void { }

  toggleNavigationMenu(open: boolean) {
    this.isBurgerMenuOpen = open;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
