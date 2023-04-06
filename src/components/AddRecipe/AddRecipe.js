import React, { useContext, useEffect, useState } from 'react'
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ActivedRecipe } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    textField: {
        width: "100%",
        marginBottom: "1rem"
    },
    btnSpace: {
        marginRight: '1rem'
    }
}));

const AddRecipe = (props) => {
    const classes = useStyles();

    const { HomeHandler, fetchRecipe, seteditRecipe, isEditRecipe } = props;
    const ActiveRecipe = useContext(ActivedRecipe);
    let initialstate = {
        dish: "",
        chef: "",
        description: "",
        image: "",
        ingredients: "",
        onSubmit: false
    };
    if (ActiveRecipe) {
        let ingredients = ActiveRecipe.ingredientsArray.join();
        console.log(ingredients);
        initialstate = { ...initialstate, ...ActiveRecipe, ingredients };
    }
    const [state, setstate] = useState(initialstate);

    const onChangeRecipeDetails = (event) => {
        event.persist();
        setstate((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
    }

    const onSubmitRecipe = () => {
        if (!(state.dish && state.chef && state.image && state.description && state.ingredients))
            return alert("Input Fields must not Empty.")

        let imgValid = /http:|https:/;
        if (!imgValid.test(state.image))
            return alert("Image field must have a valid URL.");

        setstate((prevState) => ({ ...prevState, onSubmit: true }));
    }

    useEffect(() => {
        if (state.onSubmit) fetchRecipe(state);
        return () => {
            if (state.onSubmit)
                setstate((prevState) => ({ ...prevState, onSubmit: false }));
        }
    }, [state, fetchRecipe])

    const backHandler = () => {
        if (isEditRecipe) {
            seteditRecipe(false);
        } else {
            HomeHandler();
        }
    }

    return (
        <Grid container className={classes.root}>
            <Grid item sm={2}></Grid>
            <Grid container item sm={8}>
                <TextField
                    className={classes.textField}
                    label="Recipe Name"
                    color='secondary'
                    variant="outlined"
                    name="dish"
                    value={state.dish}
                    onChange={onChangeRecipeDetails}
                />
                <TextField
                    className={classes.textField}
                    label="Chef Name"
                    color='secondary'
                    variant="outlined"
                    name="chef"
                    value={state.chef}
                    onChange={onChangeRecipeDetails}
                />
                <TextField
                    className={classes.textField}
                    label="Recipe Ingredients"
                    color='secondary'
                    variant="outlined"
                    name="ingredients"
                    value={state.ingredients}
                    onChange={onChangeRecipeDetails}
                />
                <TextField
                    className={classes.textField}
                    label="Recipe URL"
                    color='secondary'
                    type='url'
                    variant="outlined"
                    name="image"
                    value={state.image}
                    onChange={onChangeRecipeDetails}
                />
                <TextField
                    className={classes.textField}
                    label="Recipe Description"
                    color='secondary'
                    variant="outlined"
                    name="description"
                    value={state.description}
                    onChange={onChangeRecipeDetails}
                />
                <Button
                    onClick={onSubmitRecipe}
                    className={classes.btnSpace}
                    variant="contained"
                    color='secondary'
                >
                    Save Recipe
                </Button>
                <Button onClick={backHandler} variant="contained" color='primary'>
                    Back
                </Button>
            </Grid>
            <Grid item sm={2}></Grid>
        </Grid>

    )
}

export default AddRecipe