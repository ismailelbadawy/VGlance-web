import { Segment } from './segment.model';

export interface Video {
    id : string;
    title : string;
    link : string;
    segments : Segment[];
}