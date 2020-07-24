import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Segment } from '../models/segment.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VideosService {

    async segmentVideo(youtubeId: string, segmenter: string, titler: string): Promise<Segment[]> {
        let items = [
            {
                text: '',
                title: 'Introduction to Deep Learning',
                start_time: 0,
                tags: ['deep learning', 'introduction', 'welcome'],
            },
            {
                start_time: 1061,
                title: 'What is Deep Learning',
                tags: ['deep learning', 'stanford', 'course'],
                text: null
            }, {
                start_time: 1224,
                title: 'Machine Learning Application',
                tags: ['search', 'ai', 'shopping'],
                text: null
            }, {
                start_time: 2403,
                title: 'Machine Learning Demand',
                tags: ['machine learning', 'demand', 'applications'],
                text: null
            },{
                start_time: 2898,
                title: 'Course Logistics',
                tags: ['course', 'online', 'teaching'],
                text: null
            }
        ];
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(items)
            }, 1000);
        });

        // let response = await this._client.get<string>(`${environment.backend_url}/get-segments?segmenter=${segmenter}&title_generator=${titler}&video_id=${youtubeId}`, {
        //     headers : {
        //         'Access-Control-Allow-Origin' : 'http://127.0.0.1:8000'
        //     }
        // }).toPromise();
        // let segments : Segment[] = JSON.parse(response)
        // return segments
    }

    constructor(
        private _client: HttpClient
    ) {

    }
}