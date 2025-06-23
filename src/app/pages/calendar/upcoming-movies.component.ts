import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { RouterModule } from '@angular/router';

@Component({
selector: 'app-upcoming-movies',
standalone: true,
imports: [CommonModule, RouterModule],
templateUrl: './upcoming-movies.component.html',
styleUrl: './upcoming-movies.component.css'
})
export class UpcomingMoviesComponent implements OnInit {
upcomingMovies: any[] = [];

constructor(private moviesService: MoviesService) {}

ngOnInit(): void {
const today = new Date();this.moviesService.getUpcomingMovies().subscribe(data => {
  this.upcomingMovies = data.results
    .filter((movie: any) => {
      const releaseDate = new Date(movie.release_date);
      return releaseDate >= today;
    })
    .sort((a: any, b: any) =>
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
});}
}