import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TranslateResponse {
  data: {
    translations: { translatedText: string }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private apiKey = 'AIzaSyA45A_qgj8ZJ4foMAES2fuMV4xVIYxDubQ';
  private url = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) {}

  translateText(text: string, target: string = 'uk'): Observable<string> {
    return new Observable(observer => {
      this.http.post<TranslateResponse>(`${this.url}?key=${this.apiKey}`, {
        q: text,
        target
      }).subscribe(res => {
        const translated = res.data.translations[0].translatedText;
        observer.next(translated);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }
}
