export const EXT_DISCORD_CODE_REQUEST = 'EXT_DISCORD_CODE_REQUEST';
export const EXT_DISCORD_CODE_SUCCESS = 'EXT_DISCORD_CODE_SUCCESS';

export const EXT_DISCORD_DATA_REQUEST = 'EXT_DISCORD_DATA_REQUEST';
export const EXT_DISCORD_DATA_SUCCESS = 'EXT_DISCORD_DATA_SUCCESS';

export const discordCodeRequest = () => ({
  type: EXT_DISCORD_CODE_REQUEST
});

export const discordCodeSucess = code => ({
  type: EXT_DISCORD_CODE_SUCCESS,
  code
});
