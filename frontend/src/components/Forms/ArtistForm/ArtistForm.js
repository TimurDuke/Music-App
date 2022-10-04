import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FileInput from "../../UI/Form/FileInput/FileInput";
import FormElement from "../../UI/Form/FormElement/FormElement";

const ArtistForm = ({onSubmit, error}) => {
    const [artistData, setArtistData] = useState({
        name: "",
        information: "",
        image: "",
    });

    const submitFormHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(artistData).forEach(key => {
            formData.append(key, artistData[key]);
        });
        onSubmit(formData);
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setArtistData(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setArtistData(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <form
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
                    label="Name"
                    name='name'
                    onChange={inputChangeHandler}
                    value={artistData.name}
                    error={getFieldError('name')}
                    required={true}
                />

                <FormElement
                    label="Information"
                    name="information"
                    onChange={inputChangeHandler}
                    value={artistData.information}
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
        </form>
    );
};

export default ArtistForm;