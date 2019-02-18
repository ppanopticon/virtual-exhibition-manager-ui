import {IRoom} from '../room/room.interface';

export interface IExhibition {
    id: string;
    name: string;
    description: string;
    rooms: IRoom[];
}
