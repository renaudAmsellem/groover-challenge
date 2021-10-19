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
}

export default Track;
