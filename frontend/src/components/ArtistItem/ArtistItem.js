import React from 'react';
import {Link} from "react-router-dom";
import {Box, Button, Card, CardActions, CardHeader, CardMedia, Grid} from "@mui/material";

const ArtistItem = ({name, image, id}) => (
    <Grid item xs={12} sm={4} lg={3}>
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1'
            }}
        >
            <Box sx={{display: 'flex'}}>
                {image ?
                    <CardMedia
                        title={name}
                        image={image}
                        sx={{
                            margin: '10px 0 0 10px',
                            height: 85,
                            width: 85,
                            borderRadius: '50%',
                        }}
                    />
                    : null}
                <CardHeader title={name}/>
            </Box>
            <CardActions
                sx={{
                    flexGrow: '1',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    size='small'
                    variant='outlined'
                    component={Link}
                    to={`/artist/${name}/${id}`}
                >
                    Подробнее
                </Button>
            </CardActions>
        </Card>
    </Grid>
);

export default ArtistItem;