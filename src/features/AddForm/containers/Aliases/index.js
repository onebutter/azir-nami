import React from 'react';
import { connect } from 'react-redux';
import AliasFields from './aliasFields';
import NewAlias from './newAlias';

import styles from './styles.css';

class Aliases extends React.Component {
  render() {
    const { aliases } = this.props;
    const fields = aliases.map((v, i) => (
      <AliasFields {...v} key={i} idx={i} />
    ));
    const newAlias = <NewAlias idx={aliases.length} />;

    return (
      <div className={styles.aliases}>
        {fields}
        {newAlias}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { aliases } = state.formData.data;
  return {
    aliases
  };
};

export default connect(mapStateToProps, null)(Aliases);
