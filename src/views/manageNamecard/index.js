import React from 'react';
import AuthReqruiedRoute from 'Features/Auth/containers/AuthRequired';
import styles from './styles.css';

const ManageNamecardView = () => (
  <AuthReqruiedRoute
    render={() => {
      return <div>manage your namecard</div>;
    }}
  />
);

export default ManageNamecardView;
