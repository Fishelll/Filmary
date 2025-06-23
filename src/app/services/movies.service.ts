import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = '9289dcf31cb5b7130a0fc2b19b039358';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(public http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=uk-UA`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=uk-UA`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=uk-UA`);
  }

  getMovieVideos(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}&language=uk-UA`);
  }

  getMovieCredits(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=uk-UA`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=uk-UA`);
  }

  discoverMovies(query: string, genre: string, year: string, page: number): Observable<any> {
    const base = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=uk-UA&page=${page}`;
    const genreParam = genre ? `&with_genres=${genre}` : '';
    const yearParam = year ? `&primary_release_year=${year}` : '';
    const queryParam = query ? `&query=${query}` : '';

    if (query) {
      return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=uk-UA&page=${page}${queryParam}`);
    }

    return this.http.get(base + genreParam + yearParam);
  }
  getRecommendedMovies(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}&language=uk-UA`);
}
getMovieReviews(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/${id}/reviews?api_key=${this.apiKey}&language=en-US`);
}
getUpcomingMovies(): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&language=uk-UA`);
}
}
