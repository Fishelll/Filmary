import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../services/movies.service';
import { TranslateService } from '../../../services/translate.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafePipe } from '../../../pipes/safe.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

@Component({
selector: 'app-movie-details',
standalone: true,
imports: [CommonModule, RouterModule, SafePipe, SafeHtmlPipe],
templateUrl: './movie-details.component.html',
styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
movie: any;
trailerUrl: string | null = null;
cast: any[] = [];
recommendedMovies: any[] = [];
reviews: any[] = [];
translated = false;

constructor(
private route: ActivatedRoute,
private moviesService: MoviesService,
private translateService: TranslateService
) {}

ngOnInit(): void {
this.route.paramMap.subscribe(params => {
const movieId = params.get('id');
if (movieId) {
const id = +movieId;
this.loadMovie(id);
}
});
}

loadMovie(id: number): void {
// Очищаємо попередній стан
this.movie = null;
this.trailerUrl = null;
this.cast = [];
this.recommendedMovies = [];
this.reviews = [];
this.translated = false;this.moviesService.getMovieDetails(id).subscribe((data: any) => {
  this.movie = data;

  this.moviesService.getMovieVideos(id).subscribe((videos: any) => {
    const trailer = videos.results.find(
      (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
    );
    if (trailer) {
      this.trailerUrl = 'https://www.youtube.com/embed/' + trailer.key;
    }
  });

  this.moviesService.getMovieCredits(id).subscribe((credits: any) => {
    this.cast = credits.cast.slice(0, 6);
  });

  this.moviesService.getMovieReviews(id).subscribe((data: any) => {
    this.reviews = data.results;
  });

  this.moviesService.getRecommendedMovies(id).subscribe((data: any) => {
    this.recommendedMovies = data.results.slice(0, 8);
  });
});}

translateReviews(): void {
this.translated = true;
this.reviews.forEach((review, index) => {
this.translateService.translateText(review.content, 'uk').subscribe(
translatedText => {
this.reviews[index].content = translatedText;
},
error => {
console.error('Помилка перекладу:', error);
}
);
});
}
}