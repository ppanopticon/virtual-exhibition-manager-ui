import {CHOType} from './cho-type.interface';

export interface ICHO {
    id: string;
    name: string;
    type: CHOType;
    path: string;
    description: string;
}
