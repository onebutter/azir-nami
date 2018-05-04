export const ADDFORM_ALIAS_UPSERT = 'ADDFORM_ALIAS_UPSERT';
export const ADDFORM_ALIAS_REMOVE = 'ADDFORM_ALIAS_REMOVE';
export const ADDFORM_PRIVACY_UPDATE = 'ADDFORM_PRIVACY_UPDATE';
export const ADDFORM_SERVICE_UPSERT = 'ADDFORM_SERVICE_UPSERT';
export const ADDFORM_SERVICE_REMOVE = 'ADDFORM_SERVICE_REMOVE';
export const ADDFORM_TAG_UPSERT = 'ADDFORM_TAG_UPSERT';
export const ADDFORM_TAG_REMOVE = 'ADDFORM_TAG_REMOVE';
export const ADDFORM_META_UPDATE = 'ADDFORM_META_UPDATE';
export const ADDFORM_META_RESET = 'ADDFORM_META_RESET';
export const ADDFORM_DATA_RESET = 'ADDFORM_DATA_RESET';
export const ADDFORM_ALIAS_NEWITEM_UPDATE = 'ADDFORM_ALIAS_NEWITEM_UPDATE';
export const ADDFORM_SERVICE_NEWITEM_UPDATE = 'ADDFORM_SERVICE_NEWITEM_UPDATE';

export const upsertAlias = (data, idx = null) => ({
  type: ADDFORM_ALIAS_UPSERT,
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

export const upsertService = (data, idx = null) => ({
  type: ADDFORM_SERVICE_UPSERT,
  data,
  idx
});
export const removeService = idx => ({
  type: ADDFORM_SERVICE_REMOVE,
  idx
});

export const upsertTag = (data, idx = null) => ({
  type: ADDFORM_TAG_UPSERT,
  data,
  idx
});
export const removeTag = idx => ({
  type: ADDFORM_TAG_REMOVE,
  idx
});

export const updateMeta = data => ({
  type: ADDFORM_META_UPDATE,
  data
});
export const resetMeta = () => ({
  type: ADDFORM_META_RESET
});

export const resetData = () => ({
  type: ADDFORM_DATA_RESET
});

export const updateNewService = data => ({
  type: ADDFORM_SERVICE_NEWITEM_UPDATE,
  data
});

export const updateNewAlias = data => ({
  type: ADDFORM_ALIAS_NEWITEM_UPDATE,
  data
});
