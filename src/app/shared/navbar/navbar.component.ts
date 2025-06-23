import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
selector: 'app-navbar',
standalone: true,
imports: [CommonModule, FormsModule, RouterModule],
templateUrl: './navbar.component.html',
styleUrl: './navbar.component.css'
})
export class NavbarComponent {
query = '';

constructor(
public  router: Router,
private themeService: ThemeService
) {}

toggleTheme(): void {
this.themeService.toggle();
}

isDark(): boolean {
return document.body.classList.contains('dark-theme');
}
}