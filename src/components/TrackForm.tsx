import * as React from "react";
import Track from "../models/track";

const TrackForm = (props: { upsertTrack: Function, track: Track }) => {
    const initState = {
        id: null,
        name: "",
        artist: "",
        length: null,
        releaseDate: null,
    };
    const [state, setState] = React.useState(initState);
    const [error, setError] = React.useState<string>("");

    React.useEffect(() => {
        if (props.track && props.track.id) {
            setState(props.track);
        }
    }, [props.track])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        if (!state.name || !state.artist || !state.length || !state.releaseDate) {
            return setError("Please enter all fields");
        } else {
            setError("");
        }
        props.upsertTrack({
            id: state.id,
            name: state.name,
            artist: state.artist,
            length: state.length,
            releaseDate: state.releaseDate
        });
        resetForm();
    };

    const resetForm = () => {
        setState(initState);
    };

    return (

        <form className="container" onSubmit={handleSubmit}>
            <div className="columns">
                <div className="field column">
                    <label className="label">Name of the track</label>
                    <div className="control">
                        <input
                            className="input"
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                    </div>
                </div>
                <div className="field column">
                    <label className="label">Artist of the track</label>
                    <div className="control">
                        <input
                            className="input"
                            name="artist"
                            value={state.artist}
                            onChange={handleChange}
                            placeholder="Artist"
                        />
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="field column">
                    <label className="label">Length</label>
                    <div className="control">
                        <input
                            className="input"
                            name="length"
                            type="number"
                            value={state.length}
                            onChange={handleChange}
                            placeholder="Seconds"
                        />
                    </div>
                </div>
                <div className="field column">
                    <label className="label">Release Date</label>
                    <div className="control">
                        <input
                            className="input"
                            type="date"
                            name="releaseDate"
                            value={state.releaseDate}
                            onChange={handleChange}
                            placeholder="Artist"
                        />
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-link">{state.id ? "Update" : "Submit"}</button>
                </div>
            </div>
            {error && (
                <div className="message is-danger">
                    <div className="message-body">{error}</div>
                </div>
            )}
        </form>
    )
}

export default TrackForm;
