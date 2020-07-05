import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Segment } from '../models/segment.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VideosService {

    async segmentVideo(youtubeId: string, segmenter: string, titler: string): Promise<Segment[]> {
        // return [
        //     {
        //         text: '',
        //         title: 'Trouble',
        //         start_time : 0,
        //         tags: ['coldplay', 'trouble', 'songs', 'pop'],
        //     },
        //     {
        //         start_time : 37,
        //         title: 'Fix You',
        //         tags : ['coldplay', 'fix you', 'song', 'music'],
        //         text : null
        //     },{
        //         start_time : 70,
        //         title: 'Viva La Vida',
        //         tags : ['coldplay', 'viva la vida', 'pop', 'music'],
        //         text : null
        //     }
        // ];
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