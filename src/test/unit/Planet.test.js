import { describe, it, expect } from 'vitest'
import { Planet } from '@/domain/entities/Planet.js'
import { mockPlanetsApiResponse } from '@/test/mocks/planetsData.mock.js'

describe('Planet Entity', () => {
    describe('constructor', () => {
        it('should create a Planet instance with all properties', () => {
            const planetData = {
                name: 'Tatooine',
                rotationPeriod: '23',
                orbitalPeriod: '304',
                diameter: '10465',
                climate: 'arid',
                gravity: '1 standard',
                terrain: 'desert',
                surfaceWater: '1',
                population: '200000',
                created: '2014-12-09T13:50:49.641000Z',
                edited: '2014-12-20T20:58:18.411000Z',
                url: 'https://swapi.info/api/planets/1/'
            };

            const planet = new Planet(planetData);

            expect(planet.name).toBe('Tatooine');
            expect(planet.rotationPeriod).toBe('23');
            expect(planet.orbitalPeriod).toBe('304');
            expect(planet.diameter).toBe('10465');
            expect(planet.climate).toBe('arid');
            expect(planet.gravity).toBe('1 standard');
            expect(planet.terrain).toBe('desert');
            expect(planet.surfaceWater).toBe('1');
            expect(planet.population).toBe('200000');
            expect(planet.createdAt).toBeInstanceOf(Date);
            expect(planet.editedAt).toBeInstanceOf(Date);
            expect(planet.url).toBe('https://swapi.info/api/planets/1/');
        })

        it('should use default values when properties are not provided', () => {
            const planet = new Planet({});

            expect(planet.name).toBe('unknown');
            expect(planet.rotationPeriod).toBe('unknown');
            expect(planet.orbitalPeriod).toBe('unknown');
            expect(planet.diameter).toBe('unknown');
            expect(planet.climate).toBe('unknown');
            expect(planet.gravity).toBe('unknown');
            expect(planet.terrain).toBe('unknown');
            expect(planet.surfaceWater).toBe('unknown');
            expect(planet.population).toBe('unknown');
            expect(planet.createdAt).toBeNull();
            expect(planet.editedAt).toBeNull();
        });
    });

    describe('mapApiData', () => {
        it('should correctly map API data to Planet instance', () => {
            const apiData = mockPlanetsApiResponse[0];
            const planet = Planet.mapApiData(apiData);

            expect(planet).toBeInstanceOf(Planet);
            expect(planet.name).toBe(apiData.name);
            expect(planet.rotationPeriod).toBe(apiData.rotation_period);
            expect(planet.orbitalPeriod).toBe(apiData.orbital_period);
            expect(planet.diameter).toBe(apiData.diameter);
            expect(planet.climate).toBe(apiData.climate);
            expect(planet.gravity).toBe(apiData.gravity);
            expect(planet.terrain).toBe(apiData.terrain);
            expect(planet.surfaceWater).toBe(apiData.surface_water);
            expect(planet.population).toBe(apiData.population);
            expect(planet.url).toBe(apiData.url);
        });
    });
});
