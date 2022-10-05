import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FormElement from "../../UI/Form/FormElement/FormElement";
import FormSelect from "../../UI/Form/FormSelect/FormSelect";

const TrackForm = ({onSubmit, artistHandler, error, artists, albums}) => {
    const [trackData, setTrackData] = useState({
        title: "",
        artist: "",
        album: "",
        duration: "",
        number: "",
        youtube: "",
    });

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setTrackData(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const artistInputHandler = artistId => {
        artistHandler(artistId);
    };

    const submitFormHandler = e => {
        e.preventDefault();
        const {title, duration, number, youtube, artist, album} = trackData;

        const data = {
            title,
            duration,
            number,
            youtube,
            artist: artist || null,
            album: album || null,
        };

        onSubmit(data);
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <>
            {!!artists.length ? <form
                autoComplete="off"
                onSubmit={submitFormHandler}
            >
                <Grid
                    container
                    maxWidth="md"
                    textAlign="center"
                    marginX="auto"
                    direction="column"
                    rowSpacing={2}
                >

                    <FormElement
                        label="Title"
                        name='title'
                        onChange={inputChangeHandler}
                        value={trackData.title}
                        error={getFieldError('title')}
                        required={true}
                    />

                    <FormSelect
                        label='Artist'
                        name='artist'
                        onChange={inputChangeHandler}
                        onClick={artistInputHandler}
                        value={trackData.artist}
                        options={artists}
                        required={true}
                        error={getFieldError('artist')}
                    />

                    <FormSelect
                        label='Album'
                        name='album'
                        onChange={inputChangeHandler}
                        value={trackData.album}
                        options={albums}
                        required={true}
                        error={getFieldError('album')}
                    />

                    <FormElement
                        label="Duration"
                        name='duration'
                        type='number'
                        onChange={inputChangeHandler}
                        value={trackData.duration}
                        error={getFieldError('duration')}
                        inputProps={{
                            pattern: "^\\d+(?:\\.\\d{1,2})?$",
                            min: "0",
                            max: "10",
                            step: "0.01"
                        }}
                        required={true}
                    />

                    <FormElement
                        label="Number"
                        name='number'
                        type='number'
                        pattern='^\d+(?:\.\d{1,2})?$'
                        onChange={inputChangeHandler}
                        value={trackData.number}
                        error={getFieldError('number')}
                        required={true}
                    />

                    <FormElement
                        label="Youtube"
                        name='youtube'
                        onChange={inputChangeHandler}
                        value={trackData.youtube}
                        error={getFieldError('youtube')}
                    />

                    <Grid item>
                        <Button type="submit" color="primary" variant="contained">Create</Button>
                    </Grid>
                </Grid>
            </form> :
                <h2 style={{textAlign: 'center'}}>
                    No artists found, at least one artist is required to create an track.
                </h2>}
        </>
    );
};

export default TrackForm;