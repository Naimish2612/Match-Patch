import { Photo } from './photo';

export interface User {
    id:number;
    user_name:string;
    known_as:string;
    age:number;
    gender:string;
    create_at:Date;
    last_active:Date;
    photo_url:string;
    city:string;
    country:string;
    interests?:string;
    introduction?:string;
    looking_for?:string;
    photos?:Photo[];

}
