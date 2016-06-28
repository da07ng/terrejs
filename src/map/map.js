class Map {
  constructor(id, options) {
    const DEFAULTS = {
      center: [0, 0],
      zoom: 0,

      minZoom: 0,
      maxZoom: 20,

      draggable: true,
      scrollwheel: true,
    };

    this.id = id;
    this.options = Object.assign({}, DEFAULTS, options);
  }
}

export default Map;
