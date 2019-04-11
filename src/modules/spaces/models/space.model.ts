import { Location } from "./location.model";

export class SpaceModel {
    id: number;
    title: string;
    description: string;
    location: Location = new Location();
    availablePlaces: number;
    commodities: Array<SpaceCommodityModel>;
    type: SpaceTypeModel;

    constructor(space?) {
        this.location = new Location();
        for (let key in space) {
            if(key === 'location') {
                this.location.longitude = space.location.coordinates[0];
                this.location.latitude = space.location.coordinates[1];
            }
            else
                this[key] = space[key];
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