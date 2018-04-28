export const EXT_DISCORD_CODE_REQUEST = 'EXT_DISCORD_CODE_REQUEST';
export const EXT_DISCORD_CODE_SUCCESS = 'EXT_DISCORD_CODE_SUCCESS';

export const EXT_DISCORD_TOKEN_SUCCESS = 'EXT_DISCORD_TOKEN_SUCCESS';
export const EXT_DISCORD_TOKEN_ERROR = 'EXT_DISCORD_TOKEN_ERROR';

export const EXT_DISCORD_USERDATA_SUCCESS = 'EXT_DISCORD_USERDATA_SUCCESS';

export const discordCodeRequest = () => ({
  type: EXT_DISCORD_CODE_REQUEST
});

export const discordCodeSucess = (code, redirectUrl) => ({
  type: EXT_DISCORD_CODE_SUCCESS,
  meta: { authorization: true },
  code,
  redirectUrl
});

export const discordTokenSuccess = payload => ({
  type: EXT_DISCORD_TOKEN_SUCCESS,
  payload
});

export const discordTokenError = error => ({
  type: EXT_DISCORD_TOKEN_ERROR,
  error
});

export const discordUserDataSuccess = data => ({
  type: EXT_DISCORD_USERDATA_SUCCESS,
  data
});

export const EXT_GITHUB_CODE_REQUEST = 'EXT_GITHUB_CODE_REQUEST';
export const EXT_GITHUB_CODE_SUCCESS = 'EXT_GITHUB_CODE_SUCCESS';

export const EXT_GITHUB_TOKEN_SUCCESS = 'EXT_GITHUB_TOKEN_SUCCESS';
export const EXT_GITHUB_TOKEN_ERROR = 'EXT_GITHUB_TOKEN_ERROR';

export const EXT_GITHUB_USERDATA_SUCCESS = 'EXT_GITHUB_USERDATA_SUCCESS';

export const githubCodeRequest = () => ({
  type: EXT_GITHUB_CODE_REQUEST
});

export const githubCodeSucess = (code, redirectUrl) => ({
  type: EXT_GITHUB_CODE_SUCCESS,
  meta: { authorization: true },
  code,
  redirectUrl
});

export const githubTokenSuccess = payload => ({
  type: EXT_GITHUB_TOKEN_SUCCESS,
  payload
});

export const githubTokenError = error => ({
  type: EXT_GITHUB_TOKEN_ERROR,
  error
});

export const githubUserDataSuccess = data => ({
  type: EXT_GITHUB_USERDATA_SUCCESS,
  data
});
