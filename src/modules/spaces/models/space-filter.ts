import { Location } from "./location.model";

export class SpaceFilter {
    location: Location = new Location();
    radius: number;
    guest: number;

    constructor (filter?) {
        this.location = new Location();
        this.location.longitude = filter.lon || null;
        this.location.latitude = filter.lat || null;
        this.radius = filter.radius || null;
        this.guest = filter.guest || null;
    }
}
