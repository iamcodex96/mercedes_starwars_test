import { describe, it, expect } from 'vitest'
import { Person } from '@/domain/entities/Person.js'
import { mockPeopleApiResponse, mockPersonMapped } from '@/test/mocks/peopleData.mock.js'

describe('Person Entity', () => {
    describe('constructor', () => {
        it('should create a Person instance with all properties', () => {
            const personData = {
                name: 'Luke Skywalker',
                height: '172',
                mass: '77',
                hairColor: 'blond',
                skinColor: 'fair',
                eyeColor: 'blue',
                birthYear: '19BBY',
                gender: 'male',
                homeworld: 'https://swapi.info/api/planets/1/',
                created: '2014-12-09T13:50:51.644000Z',
                edited: '2014-12-20T21:17:56.891000Z',
                url: 'https://swapi.info/api/people/1/'
            };

            const person = new Person(personData);

            expect(person.name).toBe('Luke Skywalker');
            expect(person.height).toBe('172');
            expect(person.mass).toBe('77');
            expect(person.hairColor).toBe('blond');
            expect(person.skinColor).toBe('fair');
            expect(person.eyeColor).toBe('blue');
            expect(person.birthYear).toBe('19BBY');
            expect(person.gender).toBe('male');
            expect(person.homeworld).toBe('https://swapi.info/api/planets/1/');
            expect(person.createdAt).toBeInstanceOf(Date);
            expect(person.updatedAt).toBeInstanceOf(Date);
            expect(person.url).toBe('https://swapi.info/api/people/1/');
        });

        it('should use default values when properties are not provided', () => {
            const person = new Person({})

            expect(person.name).toBe('unknown')
            expect(person.height).toBe('unknown')
            expect(person.mass).toBe('unknown')
            expect(person.hairColor).toBe('unknown')
            expect(person.skinColor).toBe('unknown')
            expect(person.eyeColor).toBe('unknown')
            expect(person.birthYear).toBe('unknown')
            expect(person.gender).toBe('unknown')
            expect(person.createdAt).toBeNull()
            expect(person.updatedAt).toBeNull()
        });
    });

    describe('mapApiData', () => {
        it('should correctly map API data to Person instance', () => {
            const apiData = mockPeopleApiResponse[0]
            const person = Person.mapApiData(apiData)

            expect(person).toBeInstanceOf(Person)
            expect(person.name).toBe(apiData.name)
            expect(person.height).toBe(apiData.height)
            expect(person.mass).toBe(apiData.mass)
            expect(person.hairColor).toBe(apiData.hair_color)
            expect(person.skinColor).toBe(apiData.skin_color)
            expect(person.eyeColor).toBe(apiData.eye_color)
            expect(person.birthYear).toBe(apiData.birth_year)
            expect(person.gender).toBe(apiData.gender)
            expect(person.homeworld).toBe(apiData.homeworld)
            expect(person.url).toBe(apiData.url)
        })

        it('should handle invalid date strings', () => {
            const apiData = {
                ...mockPeopleApiResponse[0],
                created: 'invalid-date',
                edited: null
            }
            const person = Person.mapApiData(apiData)
            expect(person.createdAt).toBeInstanceOf(Date)
            expect(person.updatedAt).toBeNull()
        });
    });
});
