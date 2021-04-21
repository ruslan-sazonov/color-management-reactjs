import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const LoaderProgress = ({visible}) => {

    return (
        visible ? (
            <Grid item md={12} style={{ textAlign:'center' }}>
                <CircularProgress />
            </Grid>
        ) : null
    )
}

export default LoaderProgress;