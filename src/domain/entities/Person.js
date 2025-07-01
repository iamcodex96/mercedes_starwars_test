export class Person {
    constructor({
                    name,
                    height,
                    mass,
                    hairColor,
                    skinColor,
                    eyeColor,
                    birthYear,
                    gender,
                    homeworld,
                    created,
                    edited,
                    url
                }) {
        this.name = name || 'unknown';
        this.height = height || 'unknown';
        this.mass = mass || 'unknown';
        this.hairColor = hairColor || 'unknown';
        this.skinColor = skinColor || 'unknown';
        this.eyeColor = eyeColor || 'unknown';
        this.birthYear = birthYear || 'unknown';
        this.gender = gender || 'unknown';
        this.homeworld = homeworld;
        this.createdAt = created ? new Date(created) : null;
        this.updatedAt = edited ? new Date(edited) : null;
        this.url = url;
    }

    static mapApiData(data) {
        return new Person({
            name: data.name,
            height: data.height,
            mass: data.mass,
            hairColor: data.hair_color,
            skinColor: data.skin_color,
            eyeColor: data.eye_color,
            birthYear: data.birth_year,
            gender: data.gender,
            homeworld: data.homeworld,
            created: data.created,
            edited: data.edited,
            url: data.url
        });
    }
}