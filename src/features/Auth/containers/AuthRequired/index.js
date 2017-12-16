import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthorized, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthorized) {
          return render(props);
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  isAuthorized: state.auth.access.isAuthorized
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
