import { Segment } from './segment.model';

export interface Video {
    id : string;
    link : string;
    segments : Segment[];
}