import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: "white",
        padding: "10px 1.5rem"
    },
    imageSpace: {
        marginRight: "1rem",
        width: "50px",
        borderRadius: "50%"
    },
    listdiv: {
        minHeight: '100%',
        width: '100vw',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
    }
}));

const ListRecipe = (props) => {
    const classes = useStyles();
    const { RecipeInfoHandler, Recipe } = props;
    const {description, image, dish} = Recipe;

    return (
        <div className={classes.listdiv}>
            <Button
                variant="contained"
                className={classes.button}
                onClick={RecipeInfoHandler}
                title={description}
            >
                <img height={50} className={classes.imageSpace} src={image} alt={dish} />
                {dish}
            </Button>
        </div>
    )
}

export default ListRecipe