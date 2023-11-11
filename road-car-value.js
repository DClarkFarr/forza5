var weights = {
    speed: 1.5,
    handling: 1,
    acceleration: 1.5,
    launch: 1,
    breaking: 0.5,
}

function roadCarValue(brand, car, rating, {
    speed,
    handling,
    acceleration,
    launch,
    breaking,
}) {
    const flatValue = rating / (speed + handling + acceleration + launch + breaking);
    const dynamicValue = rating / (speed * weights.speed + handling * weights.handling + acceleration * weights.acceleration + launch * weights.launch + breaking * weights.breaking);

    return `${brand} - ${car}'s rating is ${flatValue} flat and ${dynamicValue} dynamic`
}

/*
Example
roadCarValue('Lamborghini', 'Huracan Evo 2020', 851, {
    speed: 7.3,
    handling: 6.0,
    acceleration: 9.3,
    launch: 10,
    breaking: 7.4,
})
*/
