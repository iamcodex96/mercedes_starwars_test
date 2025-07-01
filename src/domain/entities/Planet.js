export class Planet {
    constructor({
                    name,
                    rotationPeriod,
                    orbitalPeriod,
                    diameter,
                    climate,
                    gravity,
                    terrain,
                    surfaceWater,
                    population,
                    created,
                    edited,
                    url
                }) {
        this.name = name || 'unknown';
        this.rotationPeriod = rotationPeriod || 'unknown';
        this.orbitalPeriod = orbitalPeriod || 'unknown';
        this.diameter = diameter || 'unknown';
        this.climate = climate || 'unknown';
        this.gravity = gravity || 'unknown';
        this.terrain = terrain || 'unknown';
        this.surfaceWater = surfaceWater || 'unknown';
        this.population = population || 'unknown';
        this.createdAt = created ? new Date(created) : null;
        this.editedAt = edited ? new Date(edited) : null;
        this.url = url;
    }
    static mapApiData(planetData) {
        return new Planet({
            name: planetData.name,
            rotationPeriod: planetData.rotation_period,
            orbitalPeriod: planetData.orbital_period,
            diameter: planetData.diameter,
            climate: planetData.climate,
            gravity: planetData.gravity,
            terrain: planetData.terrain,
            surfaceWater: planetData.surface_water,
            population: planetData.population,
            createdAt: planetData.created,
            editedAt: planetData.edited,
            url: planetData.url,
        })
    }
}