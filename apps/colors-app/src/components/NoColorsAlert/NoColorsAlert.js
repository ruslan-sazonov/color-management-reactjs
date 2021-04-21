import React from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

const NoColorsAlert = ({visible}) => {
    return (
        visible ? (
            <Grid item md={12}>
                <Alert severity="info">
                    No colors found. It's a great time to add a new one!
                </Alert>
            </Grid>
        ) : null
    )
}

export default NoColorsAlert;