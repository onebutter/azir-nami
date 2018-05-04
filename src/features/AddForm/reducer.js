import { combineReducers } from 'redux';
import _ from 'lodash';
import * as actionsAddform from './actions';
import * as actionsNamecard from 'Features/Namecard/actions';

const { NAMECARD_CREATE_SUCCESS } = actionsNamecard;

const {
  ADDFORM_SERVICE_UPSERT,
  ADDFORM_SERVICE_REMOVE,
  ADDFORM_ALIAS_UPSERT,
  ADDFORM_ALIAS_REMOVE,
  ADDFORM_TAG_UPSERT,
  ADDFORM_TAG_REMOVE,
  ADDFORM_META_UPDATE,
  ADDFORM_META_RESET,
  ADDFORM_PRIVACY_UPDATE,
  ADDFORM_DATA_RESET,
  ADDFORM_ALIAS_NEWITEM_UPDATE,
  ADDFORM_SERVICE_NEWITEM_UPDATE
} = actionsAddform;

const services = (state = [], action) => {
  switch (action.type) {
    case ADDFORM_ALIAS_UPSERT:
    case ADDFORM_SERVICE_UPSERT:
    case ADDFORM_TAG_UPSERT: {
      if (action.idx === null) {
        return [...state, action.data];
      }
      const currentLength = state.length || 0;
      const idx = Math.min(currentLength, action.idx);
      const clonedState = _.cloneDeep(state);
      if (idx === currentLength) {
        clonedState.splice(idx, 0, action.data);
      } else {
        clonedState.splice(idx, 1, action.data);
      }
      return clonedState;
    }
    case ADDFORM_ALIAS_REMOVE:
    case ADDFORM_SERVICE_REMOVE:
    case ADDFORM_TAG_REMOVE: {
      const clonedState = _.cloneDeep(state);
      if (0 <= action.idx && action.idx < state.length) {
        clonedState.splice(action.idx, 1);
      }
      return clonedState;
    }
    default:
      return state;
  }
};

const aliases = (state = [], action) => {
  return services(state, action);
};

const tags = (state = [], action) => {
  return services(state, action);
};

const initFormData = {
  aliases: [],
  privacy: 'public',
  services: [],
  tags: []
};

const formData = (state = initFormData, action) => {
  switch (action.type) {
    case ADDFORM_ALIAS_UPSERT:
    case ADDFORM_ALIAS_REMOVE:
      return {
        ...state,
        aliases: aliases(state.aliases, action)
      };
    case ADDFORM_PRIVACY_UPDATE:
      return {
        ...state,
        privacy: action.privacy
      };
    case ADDFORM_SERVICE_UPSERT:
    case ADDFORM_SERVICE_REMOVE:
      return {
        ...state,
        services: services(state.services, action)
      };
    case ADDFORM_TAG_UPSERT:
    case ADDFORM_TAG_REMOVE:
      return {
        ...state,
        tags: tags(state.tags, action)
      };
    case NAMECARD_CREATE_SUCCESS:
    case ADDFORM_DATA_RESET:
      return initFormData;
    default:
      return state;
  }
};

const initMeta = {
  activeKey: '',
  activeIdx: -1,
  activeField: ''
};

const meta = (state = initMeta, action) => {
  switch (action.type) {
    case ADDFORM_META_UPDATE:
      return {
        ...state,
        ...action.data
      };
    case NAMECARD_CREATE_SUCCESS:
    case ADDFORM_META_RESET:
      return initMeta;
    default:
      return state;
  }
};

const initNewItems = {
  services: {
    value: '',
    label: ''
  },
  aliases: {
    value: '',
    label: ''
  }
};

const newItems = (state = initNewItems, action) => {
  switch (action.type) {
    case ADDFORM_ALIAS_NEWITEM_UPDATE:
      return {
        ...state,
        aliases: action.data
      };
    case ADDFORM_SERVICE_NEWITEM_UPDATE:
      return {
        ...state,
        services: action.data
      };
    case NAMECARD_CREATE_SUCCESS:
    case ADDFORM_DATA_RESET:
      return initNewItems;
    default:
      return state;
  }
};

export default combineReducers({
  data: formData,
  meta,
  newItems
});
