import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, CardMedia, CardContent, Button } from '@material-ui/core';
import AddRecipe from '../AddRecipe/AddRecipe';
import { ActivedRecipe } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        minHeight: "500px",
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
    },
    cover: {
        width: "50%",
    },
    content: {
        flex: '1 0 auto',
    },
    buttons: {
        marginTop: "2rem",
        textAlign: 'right',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    Ingredients: {
        marginTop: '1rem',
        padding: '0.6rem'
    },
    ingButtons: {
        marginTop: "1rem",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    Editinfo: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "1rem"
    },
    textField: {
        width: "100%",
        marginBottom: "1rem"
    },
    btnSpace: {
        marginRight: '1rem'
    }
}));

function RecipeInfo(props) {
    const classes = useStyles();
    const { HomeHandler, deleteActiveRecipe, fetchRecipe } = props;
    const [isEditRecipe, seteditRecipe] = useState(false);
    const ActiveRecipe = useContext(ActivedRecipe);
    const { date, dish, chef, description, image, ingredientsArray } = ActiveRecipe;

    const random = () => Math.floor(Math.random() * 3);
    const badgeVariant = ["contained", "outlined", "text"];
    const badgeColor = ["secondary", "inherit", "primary",];
    const ingredientBadges = ingredientsArray.map((Ingredient) => (
        <Button key={Ingredient} variant={badgeVariant[random()]} color={badgeColor[random()]}>
            {Ingredient}
        </Button>
    ));

    const onEditInfoHandler = () => {
        seteditRecipe(true);
    };

    let RecipeInfoContent = '';
    if (isEditRecipe) RecipeInfoContent = (
        <div className={classes.Editinfo}>
            <Typography component="h4" variant="h4">
                Edit Recipe Details
            </Typography>
            <br />
                <AddRecipe isEditRecipe={isEditRecipe} seteditRecipe={seteditRecipe} fetchRecipe={fetchRecipe} />
        </div>
    );
    else RecipeInfoContent = (
        <CardContent className={classes.content}>
            <Typography component="h4" variant="h4">
                {dish.toUpperCase()}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                {chef}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
                {date}
            </Typography>
            <br />
            <Typography variant="subtitle2" color="textSecondary">
                {description}
            </Typography>

            <Paper elevation={5} className={classes.Ingredients}>
                <Typography component="h5" variant="h5">
                    <span role="img">
                        🍜
                    </span>
                    Ingredients
                </Typography>
                <div className={classes.ingButtons}>
                    {ingredientBadges}
                </div>
            </Paper>

            <div className={classes.buttons}>
                <Button onClick={onEditInfoHandler} variant="contained" color="primary">
                    Edit
                </Button>
                <Button variant="contained"
                    color="secondary"
                    onClick={() => deleteActiveRecipe(date)}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    onClick={HomeHandler}
                >
                    Home
                </Button>
            </div>


        </CardContent>
    );


    return (
        <Paper elevation={5} className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={image}
                title={dish}
            />
            <div className={classes.details}>
                {RecipeInfoContent}
            </div>
        </Paper>
    );
}

export default RecipeInfo;