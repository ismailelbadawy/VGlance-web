import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Segment } from '../models/segment.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VideosService {

    async segmentVideo(youtubeId: string, segmenter: string, titler: string): Promise<Segment[]> {
        let response = await this._client.get<string>(`${environment.backend_url}/get-segments?segmenter=${segmenter}&title_generator=${titler}&video_id=${youtubeId}`, {
            headers : {
                'Access-Control-Allow-Origin' : 'http://127.0.0.1:8000'
            }
        }).toPromise();
        let segments : Segment[] = JSON.parse(response)
        console.log(segments);
        return segments
    }

    constructor(
        private _client: HttpClient
    ) {

    }
}