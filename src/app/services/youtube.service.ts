import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyBv8Qwui4pGb5lJ0OzZXOHl8YWpbJMnOAM';
  private playlistId = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = 'EAAaBlBUOkNBVQ';

  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playlistId)
      .set('key', this.apiKey);

    return this.http.get<YoutubeResponse>(url, { params }).pipe(
      map((resp) => {
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }),

      map((items) => items.map((video) => video.snippet))
    );
  }
}
