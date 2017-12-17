import React from 'react';
import AuthReqruiedRoute from 'Features/Auth/containers/AuthRequired';
import ManageNamecards from 'Features/Namecard/containers/Manage';

const ManageNamecardView = () => (
  <AuthReqruiedRoute
    render={() => {
      return <ManageNamecards />;
    }}
  />
);

export default ManageNamecardView;
