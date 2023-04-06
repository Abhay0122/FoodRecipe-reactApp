import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, AppBar, Typography, Button, IconButton } from '@material-ui/core';
import GridOn from '@material-ui/icons/GridOn';
import GridOff from '@material-ui/icons/GridOff';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: "2rem",
    },
    bg: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center"
    },
    img: {
        height: '30px',
        margin: '0 0.5vmax'
    }
}));

function Header(props) {
    const classes = useStyles();
    const {
        GridStatus,
        GridHandler,
        AddRecipeHandler,
        AddRecipeStatus,
        RecipeInfoStatus
    } = props;

    return (
        <div className={classes.root}>
            <AppBar className={classes.bg} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <span>🥄</span>
                        FOODअड्डा
                        <span>🥣</span>
                    </Typography>
                    <IconButton
                        onClick={GridHandler}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit" aria-label="menu"
                    >
                        {
                            !AddRecipeStatus && !RecipeInfoStatus ?
                                (GridStatus ? <GridOn /> : <GridOff />)
                                : ""
                        }
                    </IconButton>
                    <Button color="inherit" onClick={AddRecipeHandler}>
                        ADD RECIPE
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;