import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import NoColorsAlert from 'components/NoColorsAlert';
import LoaderProgress from 'components/LoaderProgress';
import ColorCard from 'components/ColorCard';
import ConfirmDialog from 'components/ConfirmDialog';
import { http } from 'services/Axios';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

const useStyles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
});

class ColorGallery extends Component {
    state = {
        isLoading: false,
        isConfirmOpen: false,
        removeColorId: null,
        colors: []
    }

    componentDidMount = () => {
        this.setState({
            isLoading: true
        });

        http.get('/colors').then(response => {
            this.setState({
                isLoading: false,
                colors: response.data.data
            })
        });
    }

    showRemoveConfirmation = (id) => {
        this.setState({
            removeColorId: id,
            isConfirmOpen: true
        })
    }

    closeRemoveConfirmation = () => {
        this.setState({
            removeColorId: null,
            isConfirmOpen: false
        })
    }

    handleRemove = (id) => {
        this.closeRemoveConfirmation();
        http.delete(`/colors/${id}`)
        .then(response => {
            const colors = this.state.colors.filter(color => {
                return color.id !== id;
            });

            this.setState({
                colors
            });
        })
        .then(() => this.props.enqueueSnackbar('Successfully deleted selected color!', { 
            variant: 'success',
        }))
        .catch(() => this.props.enqueueSnackbar('Failed deleting selected color.', { 
            variant: 'error',
        }));
    }

    render() {
        const { classes } = this.props;
        const colorsRendered = this.state.colors.length ? (
            this.state.colors.map(color => {
                return <ColorCard 
                    key={color.id} 
                    color={color}
                    handleRemove={() => {this.showRemoveConfirmation(color.id)}}
                />
            })
        ) : (
            <NoColorsAlert visible={!this.state.isLoading}/>
        );

        return (
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    <LoaderProgress visible={this.state.isLoading} />
                    <ConfirmDialog 
                        title="Confirm this action"
                        open={this.state.isConfirmOpen}
                        setOpen={this.showRemoveConfirmation}
                        setClose={this.closeRemoveConfirmation}
                        onConfirm={this.handleRemove}
                        itemId={this.state.removeColorId}
                    >
                        Are you sure you want to delete selected color?
                    </ConfirmDialog>

                    {colorsRendered}
                </Grid>
            </Container>
        )
    }
}

export default withSnackbar(withStyles(useStyles)(ColorGallery));