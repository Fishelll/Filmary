import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  genres: any[] = [];

  searchQuery = '';
  selectedGenre = '';
  selectedYear = '';
  page = 1;
  isLoading = false;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.moviesService.getGenres().subscribe(data => {
      this.genres = data.genres;
    });

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.selectedGenre = params['genre'] || '';
      this.selectedYear = params['year'] || '';
      this.page = +params['page'] || 1;

      this.loadMovies();
    });
  }

  loadMovies(): void {
    this.isLoading = true;

    this.moviesService.discoverMovies(
      this.searchQuery,
      this.selectedGenre,
      this.selectedYear,
      this.page
    ).subscribe(data => {
      this.movies = data.results;
      this.isLoading = false;
    });
  }

  onFilterChange(): void {
    this.router.navigate([], {
      queryParams: {
        q: this.searchQuery || null,
        genre: this.selectedGenre || null,
        year: this.selectedYear || null,
        page: 1 // при зміні фільтра — завжди на першу сторінку
      }
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedGenre = '';
    this.selectedYear = '';

    this.router.navigate([], {
      queryParams: {
        q: null,
        genre: null,
        year: null,
        page: 1
      }
    });
  }

  changePage(newPage: number): void {
    if (newPage < 1) return;

    this.router.navigate([], {
      queryParams: {
        page: newPage,
        q: this.searchQuery || null,
        genre: this.selectedGenre || null,
        year: this.selectedYear || null
      },
      queryParamsHandling: 'merge'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}