import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import CreatePage from 'pages/CreatePage';
import NotFoundPage from 'pages/NotFoundPage';

const Routes = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/create" component={CreatePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </React.Fragment>
    )
}

export default Routes;