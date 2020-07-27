import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Segment } from '../models/segment.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VideosService {

    async segmentVideo(youtubeId: string, segmenter: string, titler: string): Promise<Segment[]> {
        // let items = [
        //     {
        //         text: '',
        //         title: 'List of the Go Go Gormoney',
        //         start_time: 0,
        //         tags: ['music playing', 'code today', 'many people'],
        //     },
        //     {
        //         start_time: 597.83,
        //         title: 'Optimizer Function',
        //         tags: ['512 neurons', 'three chance', 'loss function'],
        //         text: null
        //     }, {
        //         start_time: 1204.78,
        //         title: 'Pycharm',
        //         tags: ['use pycharm', 'pycharm fans', 'neural network code'],
        //         text: null
        //     }, {
        //         start_time: 1730.24,
        //         title: 'Keras Model',
        //         tags: ['easily parallelizable', 'distribution strategies', 'different devices'],
        //         text: null
        //     }
        // ];
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve(items)
        //     }, 1000);
        // });
        let response = await this._client.get<string>(`${environment.backend_url}/get-segments?segmenter=${segmenter}&title_generator=${titler}&video_id=${youtubeId}`, {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'timeout': `${180000}`
            })
        }).toPromise();
        let segments: Segment[] = JSON.parse(response)
        return segments
    }

    constructor(
        private _client: HttpClient
    ) {

    }
}