import Map from './map';

class Terre {
  options: any;

  constructor(options: any) {
    this.options = options;

    const map = new Map({ id: 'map' });

    console.log(map);
  }
}

export default Terre;
