import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    colorSample: {
        flexGrow: 1,
        width: '100%',
        height: theme.spacing(16),
    },
    deleteAction: {
        marginLeft: 'auto',
    },
}));

const ColorCard = (props) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6" gutterBottom>
                        {props.color.name}
                    </Typography>
                    <Paper 
                        elevation={0} 
                        className={classes.colorSample}
                        style={{ backgroundColor: props.color.hex_value }} 
                    />
                </CardContent>
                <CardActions>
                    <IconButton 
                        size="medium" 
                        aria-label="delete" 
                        className={classes.deleteAction}
                        onClick={() => {props.handleRemove(props.color.id)}}
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ColorCard;