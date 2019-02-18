import {Room} from './room.model';

export interface Exhibition {
    id: string;
    name: string;
    description: string;
    rooms: Room[];
}
