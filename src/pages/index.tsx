import * as React from "react";
import Track from '../models/track'
import TrackForm from "../components/TrackForm";
import Caretaker from "../models/caretaker";
import "./styles.scss";

// markup
const IndexPage = () => {
  const [updateTrack, setUpdateTrack] = React.useState({});
  const [tracks, setTracks] = React.useState({});

  const upsertTrack = (newTrack) => {
    setUpdateTrack({});
    if (!newTrack.id) {
      return setTracks(prevState => {
        const newState = { ...prevState };
        const trackModel = new Track(new Date().getTime(), newTrack.name, newTrack.artist, newTrack.length, newTrack.releaseDate);
        newState[trackModel.id] = { track: trackModel, versions: new Caretaker({}) };
        return newState;
      });
    }

    setTracks(prevState => {
      const newState = { ...prevState };
      const { track, versions } = prevState[newTrack.id];

      versions.add(new Date().getTime(), track.hydrate());

      track.name = newTrack.name;
      track.artist = newTrack.artist;
      track.length = newTrack.length;
      track.releaseDate = newTrack.releaseDate;

      newState[newTrack.id] = { track, versions };
      return newState;
    })
  };

  const onEdit = (track: Track) => {
    setUpdateTrack(track);
  }

  const onSelectMemento = (versions: Caretaker, key: number) => {
    if (!key) return;

    const memento = versions.get(key);
    const track = new Track();
    track.dehydrate(memento);
    setUpdateTrack(track);
  }

  return (
    <main>
      <title>Home Page</title>
      <section className="section">
        <TrackForm upsertTrack={upsertTrack} track={updateTrack} />
      </section>

      <hr />

      <section className="section">
        <div>
          <p>Created tracks:</p>
          {Object.values(tracks).map(({ track, versions }) => {
            return (
              <>
                <div className="is-clickable" onClick={(e) => { e.preventDefault; onEdit(track) }}>{track.name} | {track.artist} | {track.length} seconds | {track.releaseDate}</div>
                {Object.keys(versions.mementos).length > 0 && (
                  <select className="select" onChange={(e) => { e.preventDefault(); onSelectMemento(versions, e.target.value) }}>
                    <option>Choose a time to restore</option>
                    {Object.keys(versions.mementos).map(key => {
                      return <option value={key}>{key}</option>
                    })}
                  </select>
                )
                }
              </>
            )
          })}
        </div>
      </section>
    </main >
  );
};

export default IndexPage;
