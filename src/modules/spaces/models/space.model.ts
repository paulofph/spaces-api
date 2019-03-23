import { Location } from "./location.model";

export class SpaceModel {
    id: Number;
    title: String;
    location: Location = new Location();
    availablePlaces: Number;
}