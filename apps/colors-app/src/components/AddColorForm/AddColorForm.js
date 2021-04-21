import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { http } from 'services/Axios';
import { HexColorPicker } from "react-colorful";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

const useStyles = theme => ({
    colorSample: {
        flexGrow: 1,
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
});

class AddColorForm extends Component {
    state = {
        name: {
            value: '',
            isValid: true,
            shouldBeValidated: false,
        },
        color: '#319536',
    }

    isNameValid = (value) => {
        return (value !== '');
    }

    handleNameChange = (e) => {
        const isValid = this.isNameValid(e.target.value);

        this.setState({
            name: {
                value: e.target.value,
                isValid: isValid,
                shouldBeValidated: true,
            }
        });
    }

    handleColorChange = (color) => {
        this.setState({ color });
    };

    handleCancel = () => {
        this.props.history.push('/');
    }

    handleSave = () => {
        const isValid = this.isNameValid(this.state.name.value);

        this.setState({
            name: {
                ...this.state.name,
                shouldBeValidated: true,
                isValid
            }
        });

        if (isValid) {
            http.post('/colors', {
                name: this.state.name.value,
                hex_value: this.state.color
            })
            .then(response => {
                this.props.enqueueSnackbar('Successfully created a new color!', { 
                    variant: 'success',
                });
                this.props.history.push('/');
            })
            .catch(() => this.props.enqueueSnackbar('Failed create a new color.', { 
                variant: 'error',
            }));
        } else {
            this.props.enqueueSnackbar('Please fill all required fields.', { 
                variant: 'error',
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <React.Fragment>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="color-name"
                                name="color-name"
                                label="Color Name"
                                fullWidth
                                autoComplete=""
                                error={!this.state.name.isValid}
                                helperText={
                                    !this.state.name.isValid
                                    ? 'This field can not be blank'
                                    : ''
                                }
                                onChange={this.handleNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <HexColorPicker
                                color={this.state.color} 
                                onChange={this.handleColorChange} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper 
                                className={classes.colorSample}
                                elevation={1} 
                                style={{ backgroundColor: this.state.color }} 
                            />
                        </Grid>
                    </Grid>
                </React.Fragment>

                <Box className={classes.buttons}>
                    <Button onClick={this.handleCancel} className={classes.button}>
                        Cancel
                    </Button>
                    <Button
                        disableElevation
                        variant="contained"
                        color="primary"
                        onClick={this.handleSave}
                        className={classes.button}
                    >
                        Save
                    </Button>
                </Box>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(withRouter(withSnackbar(AddColorForm)));