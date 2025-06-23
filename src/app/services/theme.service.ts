import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'theme';

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.storageKey);

    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
      document.body.classList.remove('dark-theme');
    } else {
      // Якщо тема не збережена, перевіряємо системну
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('dark-theme');
        localStorage.setItem(this.storageKey, 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem(this.storageKey, 'light');
      }
    }
  }

  toggle(): void {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
  }
}
