import { action, createHandler, stateConnector } from '../../../react-isomorphic-render'
import settings from '../react-isomorphic-render-async'

const handler = createHandler(settings);
let updatingTab = 0;

export const update_user = action
({
  namespace: 'forms',
  event: 'UPDATE_USER',
  action: async (newData, oldData, tab, http) =>
  {
    updatingTab = tab;
    for (let newIndex = 0; newIndex < Object.keys(newData).length; newIndex++) {
      const newKey = Object.keys(newData)[newIndex];
      if (oldData[newKey].length > 0) {
        // replace
        oldData[newKey] = newData[newKey];
      }
    }
    const userID = oldData.id;
    return await http.post('/api/users/' + userID, {
      data: oldData
    });
  },
  result: (state, result) => {
    let newWindows = state.FormWindows;
    newWindows[updatingTab] = {
      ...newWindows[updatingTab],
      updating: false,
      updated: true,
      error: {
        message: ''
      }
    };
    return {
      ...state,
      FormWindows: newWindows
    };
  }
},
handler)

export const update_plan = action
({
  namespace: 'forms',
  event: 'UPDATE_PLAN',
  action: async (newData, oldData, tab, http) =>
  {
    updatingTab = tab;
    for (let newIndex = 0; newIndex < Object.keys(newData).length; newIndex++) {
      const newKey = Object.keys(newData)[newIndex];
      if (oldData[newKey].length > 0) {
        // replace
        oldData[newKey] = newData[newKey];
      }
    }
    const planID = oldData.id;
    return await http.post('/api/plans/' + planID, {
      data: oldData
    });
  },
  result: (state, result) => {
    let newWindows = state.FormWindows;
    newWindows[updatingTab] = {
      ...newWindows[updatingTab],
      updating: false,
      updated: true,
      error: {
        message: ''
      }
    };
    return {
      ...state,
      FormWindows: newWindows
    };
  }
},
handler)


handler.addStateProperties('forms')

export const mountForm = action
({
  namespace: 'forms',
  event: 'MOUNT_FORM',
  action: async (actionType, tab, http) =>
  {
    return ({aType: actionType, tabID: tab });
  },
  result: (state, result) => {
    let newWindows = state.FormWindows;
    newWindows[result.tabID] = {
      ...newWindows[result.tabid],
      formOnPage: true,
      actionType: result.aType,
      error: {
        message: ''
      }
    };
    return {
      ...state,
      FormWindows: newWindows
    };
  }
},
handler)

export const clearForm = action
({
  namespace: 'forms',
  event: 'CLEAR_FORM',
  action: async (tab, http) =>
  {
    return ({ tabID: tab });
  },
  result: (state, result) => {
    let newWindows = state.FormWindows;
    if (typeof newWindows[result.tabID] !== 'undefined') {
      newWindows[result.tabID] = {
        ...newWindows[result.tabID],
        formOnPage: false,
        actionType: '',
        error: {
          message: ''
        }
      };
    }
    return {
      ...state,
      FormWindows: newWindows
    };
  }
},
handler)


// // A developer can additionally handle any other custom events
// handler.handle('CUSTOM_EVENT', (state, action) =>
// ({
//   ...state,
//   customProperty: action.result
// }))

// A little helper for Redux `@connect()`
export const connector = stateConnector(handler)

const initial_state = {
  FormWindows: {}
};

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default handler.reducer(initial_state)

// "Sleep" using `Promise`
function delay(delay)
{
  return new Promise(resolve => setTimeout(resolve, delay))
}