let shipName

ship = selection => {
    if (selection === 'Apollo'){
      shipName = 'tiny'
    } else if (selection === 'Falcon'){
      shipName = 'falcon'
    }
}

export default Images = {
  background: require('./Space_1.png'),
  floor: require('./floor.png'),
  hazardTop: require('./hazardTop.png'),
  hazardBody: require('./astroids.png'),
  plane1: require('./falcon_ship1.png'),
  plane2: require('./falcon_ship2.png'),
  plane3: require('./falcon_ship3.png'),
};
