import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    error: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    controls: {
        textAlign:'center',
        paddingTop: theme.spacing(4),
    }
}));

const NotFoundPage = (props) => {
    const classes = useStyles();
    return (
        <main>
            <Container className={classes.error} maxWidth="md">
                <Grid container>
                    <Grid item md={12}>
                        <Typography component="h1" variant="h5" align="center">
                            404. Sorry, but this page does not exist.
                        </Typography>
                    </Grid>
                    <Grid item md={12} className={classes.controls}>
                        <Button
                            disableElevation
                            startIcon={<HomeIcon />}
                            onClick={() => {props.history.push('/')}}
                        >
                            Get back home
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
}

export default NotFoundPage;