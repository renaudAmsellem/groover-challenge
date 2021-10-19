import * as React from "react";
import Track from '../models/track'
import TrackForm from "../components/TrackForm";
import "./styles.scss";

// markup
const IndexPage = () => {
  const [updateTrack, setUpdateTrack] = React.useState({});
  const [tracks, setTracks] = React.useState([]);

  const upsertTrack = (track) => {
    if (!track.id) {
      return setTracks(prevState => {
        const newState = [...prevState];
        const trackModel = new Track(new Date().getTime(), track.name, track.artist, track.length, track.releaseDate);
        newState.push(trackModel);
        return newState;
      });
    }

    setTracks(prevState => {
      const newState = [...prevState];
      const index = prevState.findIndex((t) => t.id === track.id);
      const trackModel = prevState[index];
      trackModel.name = track.name;
      trackModel.artist = track.artist;
      trackModel.length = track.length;
      trackModel.releaseDate = track.releaseDate;

      newState[index] = trackModel;
      return newState;
    })
  };

  const onEdit = (track: Track) => {
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
          {tracks.map((track) => {
            return (
              <div className="is-clickable" onClick={(e) => { e.preventDefault; onEdit(track) }}>{track.name} | {track.artist} | {track.length} seconds | {track.releaseDate}</div>
            )
          })}
        </div>
      </section>
    </main>
  );
};

export default IndexPage;
