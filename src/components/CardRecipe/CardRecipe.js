import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Button, CardMedia, CardContent, CardActions, Typography, Avatar } from '@material-ui/core';
import { More } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: "0 1rem 1rem 0"
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    button: {
        marginLeft: 'auto'
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const { RecipeInfoHandler, Recipe } = props;
    const { date, dish, chef, image, description } = Recipe;

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {chef.substr(0, 1).toUpperCase()}
                    </Avatar>
                }
                title={dish}
                subheader={date}
            />
            <CardMedia
                className={classes.media}
                image={image}
                title={dish}
            />
            <CardContent >
                <Typography className={classes.desc} variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button
                    className={classes.button}
                    startIcon={<More />}
                    color='secondary'
                    onClick={RecipeInfoHandler}
                >
                    Recipe Detail
                </Button>
            </CardActions>
        </Card>
    );
}
