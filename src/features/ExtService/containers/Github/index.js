import React from 'react';
import config from 'config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { githubCodeRequest, githubCodeSucess } from '../../actions';
import styles from './styles.css';
import logo from './logo.png';

class GithubExtService extends React.Component {
  handleClick = () => {
    this.props.requestGithub();
    const { authorizeURL, clientID } = config.api.github;
    const { pathname, origin } = window.location;
    const current = encodeURIComponent(origin + pathname);
    const url = `${authorizeURL}?client_id=${clientID}&redirect_uri=${current}&response_type=code&scope=identify`;
    window.location.href = url;
  };

  componentDidMount() {
    const { search } = this.props.location;
    const { requested } = this.props;
    if (search.startsWith('?code=') && requested === 'github') {
      const code = search.split('=')[1];
      const { pathname, origin } = window.location;
      const codeConsumedUrl = origin + pathname;
      this.props.parseCodeGithub(code, codeConsumedUrl);
      this.props.redirect(pathname);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { entity, status } = nextProps;
    if (entity && entity.length > 0 && status.success) {
      this.props.onSuccess({
        label: 'Github',
        value: entity,
        action: {
          type: 'extservice',
          vendor: 'github'
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
    entity: state.extService.entities.github
  };
};

const mapDispatchToProps = dispatch => ({
  redirect: bindActionCreators(push, dispatch),
  requestGithub: bindActionCreators(githubCodeRequest, dispatch),
  parseCodeGithub: bindActionCreators(githubCodeSucess, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GithubExtService)
);
