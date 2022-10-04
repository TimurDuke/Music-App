import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FileInput from "../../UI/Form/FileInput/FileInput";
import FormElement from "../../UI/Form/FormElement/FormElement";
import FormSelect from "../../UI/Form/FormSelect/FormSelect";

const AlbumForm = ({onSubmit, error, artists}) => {
    const [albumData, setAlbumData] = useState({
        title: "",
        artist: "",
        image: "",
    });

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(albumData).forEach(key => {
            formData.append(key, albumData[key]);
        });
        onSubmit(formData);
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setAlbumData(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setAlbumData(prevState => ({...prevState, [name]: file}));
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
                        value={albumData.title}
                        error={getFieldError('title')}
                        required={true}
                    />

                    <FormSelect
                        label='Artist'
                        name='artist'
                        onChange={inputChangeHandler}
                        value={albumData.artist}
                        options={artists}
                        required={true}
                        error={getFieldError('artist')}
                    />

                    <Grid item>
                        <FileInput
                            label="Image"
                            name="image"
                            onChange={fileChangeHandler}
                        />
                    </Grid>

                    <Grid item>
                        <Button type="submit" color="primary" variant="contained">Create</Button>
                    </Grid>
                </Grid>
            </form> : <h2 style={{textAlign: 'center'}}>No artists found, at least one artist is required to create an album.</h2>}
        </>
    );
};

export default AlbumForm;