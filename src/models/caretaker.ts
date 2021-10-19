import Track from "./track";

class Caretaker {
  mementos: Object;

  constructor(mementos: Object) {
    this.mementos = mementos;
  }

  add(key: number, memento: Track) {
    this.mementos[key] = memento;
    if (Object.keys(this.mementos).length > 5) {
      const key = Object.keys(this.mementos).reduce((key, v) =>
        this.mementos[v] < this.mementos[key] ? v : key
      );
      delete this.mementos[key];
    }
  }

  get(key: number) {
    return this.mementos[key];
  }
}

export default Caretaker;
