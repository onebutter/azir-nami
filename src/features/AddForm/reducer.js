import { combineReducers } from 'redux';
import * as actionsAddform from './actions';
import * as actionsNamecard from 'Features/Namecard/actions';

const { NAMECARD_CREATE_SUCCESS } = actionsNamecard;

const {
  ADDFORM_SERVICE_ADD,
  ADDFORM_SERVICE_REMOVE,
  ADDFORM_ALIAS_ADD,
  ADDFORM_ALIAS_REMOVE,
  ADDFORM_TAG_ADD,
  ADDFORM_TAG_REMOVE
} = actionsAddform;

const services = (state = [], action) => {
  switch (action.type) {
    case ADDFORM_SERVICE_ADD: {
      if (action.idx === null) {
        return [...state, action.data];
      }
      const currentLength = state.length || 0;
      const idx = Math.max(currentLength, action.idx);
      return [...state].splice(idx, 0, action.data);
    }
    case ADDFORM_SERVICE_REMOVE:
      if (0 <= action.idx && action.idx < state.length) {
        return [...state].splice(action.idx, 1);
      }
      return state;
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
  privacy: '',
  services: [],
  tags: []
};

const formData = (state = initFormData, action) => {
  switch (action.type) {
    case ADDFORM_ALIAS_ADD:
    case ADDFORM_ALIAS_REMOVE:
      return {
        ...state,
        aliases: aliases(state.aliases, action)
      };
    case actionsAddform.ADDFORM_PRIVACY_UPDATE:
      return {
        ...state,
        privacy: action.privacy
      };
    case ADDFORM_SERVICE_ADD:
    case ADDFORM_SERVICE_REMOVE:
      return {
        ...state,
        services: services(state.services, action)
      };
    case ADDFORM_TAG_ADD:
    case ADDFORM_TAG_REMOVE:
      return {
        ...state,
        tags: tags(state.tags, action)
      };
    case NAMECARD_CREATE_SUCCESS:
    default:
      return state;
  }
};

export default combineReducers({
  formData
});
