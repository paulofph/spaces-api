import { Location } from "./location.model";

export class SpaceModel {
    id: number;
    title: string;
    description: string;
    location: Location = new Location();
    availablePlaces: number;
    commodities: Array<SpaceCommodityModel>;
    type: SpaceTypeModel;
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