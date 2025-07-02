export const formatHeight = (height) => {
    if (!height || height === 'unknown') {
        return 'Unknown';
    }
    return `${height} cm`;
}

export const formatMass = (mass) => {
    if (!mass || mass === 'unknown') {
        return 'Unknown';
    }
    return `${mass} kg`;
}

export const formatGender = (gender) => {
    const genders = {
        'male': 'Male',
        'female': 'Female',
        'hermaphrodite': 'Hermaphrodite',
        'n/a': 'N/A'
    };
    return genders[gender] || 'Unknown';
}

export const formatBirthYear = (birthYear) => {
    if (!birthYear || birthYear === 'unknown') {
        return 'Unknown';
    }
    return birthYear;
}

export const formatDiameter = (diameter) => {
    if (!diameter || diameter === 'unknown') {
        return 'Unknown';
    }
    return `${Number(diameter).toLocaleString()} km`;
}

export const formatGravity = (gravity) => {
    if (!gravity || gravity === 'unknown') {
        return 'Unknown';
    }
    return gravity.includes('gravity') ? gravity : `${gravity} (standard gravity)`;
}

export const formatWater = (water) => {
    if (!water || water === 'unknown') {
        return 'Unknown';
    }

    return `${water}%`;
}

export const formatOrbitalPeriod = (period) => {
    if (!period || period === 'unknown') {
        return 'Unknown';
    }
    return `${period} days`
}

export const formatPopulation = (population) => {
    if (!population || population === 'unknown') {
        return 'Unknown';
    }
    const num = Number(population);
    if (isNaN(num)) {
        return population;
    }
    return num.toLocaleString()
}

export const formatText = (text) => {
    if (!text || text === 'unknown') {
        return 'Unknown';
    }
    return text.charAt(0).toUpperCase() + text.slice(1)
}