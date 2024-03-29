import React from 'react';
import config from 'config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { discordCodeRequest, discordCodeSucess } from '../../actions';
import styles from './styles.css';
import logo from './logo.png';

class DiscordExtService extends React.Component {
  handleClick = () => {
    this.props.requestDiscord();
    const { authorizeURL, clientID } = config.api.discord;
    const { pathname, origin } = window.location;
    const current = encodeURIComponent(origin + pathname);
    const url = `${authorizeURL}?client_id=${clientID}&redirect_uri=${current}&response_type=code&scope=identify`;
    window.location.href = url;
  };

  componentDidMount() {
    const { search } = this.props.location;
    const { requested } = this.props;
    if (search.startsWith('?code=') && requested === 'discord') {
      const code = search.split('=')[1];
      const { pathname, origin } = window.location;
      const codeConsumedUrl = origin + pathname;
      this.props.parseCodeDiscord(code, codeConsumedUrl);
      this.props.redirect(pathname);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { entity, status } = nextProps;
    if (entity && entity.length > 0 && status.success) {
      this.props.onSuccess({
        label: 'Discord',
        value: entity,
        action: {
          type: 'extservice',
          vendor: 'discord'
        }
      });
    }
  }

  render() {
    return (
      <div className={styles.root} onClick={this.handleClick}>
        <img className={styles.logo} src={logo} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.extService.status,
    requested: state.extService.requested,
    entity: state.extService.entities.discord
  };
};

const mapDispatchToProps = dispatch => ({
  redirect: bindActionCreators(push, dispatch),
  requestDiscord: bindActionCreators(discordCodeRequest, dispatch),
  parseCodeDiscord: bindActionCreators(discordCodeSucess, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DiscordExtService)
);
