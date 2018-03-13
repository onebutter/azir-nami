export const EXT_DISCORD_CODE_REQUEST = 'EXT_DISCORD_CODE_REQUEST';
export const EXT_DISCORD_CODE_SUCCESS = 'EXT_DISCORD_CODE_SUCCESS';

export const EXT_DISCORD_TOKEN_SUCCESS = 'EXT_DISCORD_TOKEN_SUCCESS';

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
  type: EXT_DISCORD_TOKEN_SUCCESS,
  error
});

export const discordUserDataSuccess = data => ({
  type: EXT_DISCORD_USERDATA_SUCCESS,
  data
});
