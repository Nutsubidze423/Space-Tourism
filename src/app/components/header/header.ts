import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  mobileOpen = false;

  toggleMenu() {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMenu() {
    this.mobileOpen = false;
  }
}
