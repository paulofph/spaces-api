import { Location } from "./location.model";

export class SpaceModel {
    id: number;
    title: string;
    description: string;
    availablePlaces: number;
    commodities: Array<SpaceCommodityModel>;
    type: SpaceTypeModel;
    location: SpaceLocationModel = new SpaceLocationModel();

    constructor(space?) {
        this.location = new SpaceLocationModel();
        for (let key in space) {
            if(key === 'location') {
                this.location.longitude = space.location.coordinates.coordinates[0];
                this.location.latitude = space.location.coordinates.coordinates[1];
            }
            else {
                this[key] = space[key];
            }
        }
    }
}

export class SpaceCommodityModel {
    id: number;
    label: string;
    icon: string;
}

export class SpaceTypeModel {
    id: number;
    label: string;
}

export class SpaceLocationModel {
    latitude: string;
    longitude: string;
}