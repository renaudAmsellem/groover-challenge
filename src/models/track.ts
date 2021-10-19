class Track {
  id: number;
  name: string;
  artist: string;
  length: number;
  readings: number;
  releaseDate: Date;

  constructor(
    id: number,
    name: string,
    artist: string,
    length: number,
    releaseDate: Date
  ) {
    this.id = id;
    this.name = name;
    this.length = length;
    this.artist = artist;
    this.releaseDate = releaseDate;
  }

  hydrate() {
    var memento = JSON.stringify(this);
    return memento;
  }

  dehydrate(memento: string) {
    var m = JSON.parse(memento);
    this.id = m.id;
    this.name = m.name;
    this.artist = m.artist;
    this.length = m.length;
    this.releaseDate = m.releaseDate;
  }
}

export default Track;
