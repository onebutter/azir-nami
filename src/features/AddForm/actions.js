export const ADDFORM_ALIAS_ADD = 'ADDFORM_ALIAS_ADD';
export const ADDFORM_ALIAS_REMOVE = 'ADDFORM_ALIAS_REMOVE';
export const ADDFORM_PRIVACY_UPDATE = 'ADDFORM_PRIVACY_UPDATE';
export const ADDFORM_SERVICE_ADD = 'ADDFORM_SERVICE_ADD';
export const ADDFORM_SERVICE_REMOVE = 'ADDFORM_SERVICE_REMOVE';
export const ADDFORM_TAG_ADD = 'ADDFORM_TAG_ADD';
export const ADDFORM_TAG_REMOVE = 'ADDFORM_TAG_REMOVE';

export const addAlias = (data, idx = null) => ({
  type: ADDFORM_ALIAS_ADD,
  data,
  idx
});
export const removeAlias = idx => ({
  type: ADDFORM_ALIAS_REMOVE,
  idx
});

export const updatePrivacty = privacy => ({
  type: ADDFORM_PRIVACY_UPDATE,
  privacy
});

export const addService = (data, idx = null) => ({
  type: ADDFORM_SERVICE_ADD,
  data,
  idx
});
export const removeService = idx => ({
  type: ADDFORM_SERVICE_REMOVE,
  idx
});

export const addTag = (data, idx = null) => ({
  type: ADDFORM_TAG_ADD,
  data,
  idx
});
export const removeTag = idx => ({
  type: ADDFORM_TAG_REMOVE,
  idx
});
