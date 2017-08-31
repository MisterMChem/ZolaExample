import { action, createHandler, stateConnector } from '../../../react-isomorphic-render'
import settings from '../react-isomorphic-render-async'

const handler = createHandler(settings);

// A little helper for Redux `@connect()`
export const connector = stateConnector(handler)

// This is the action called on submit
export const submit_user = action
({
  namespace: 'auth',
  event: 'SUBMIT_USER',
  action: async (payload, http) =>
  {
    // simulate server lag
    await delay(3000);

    return await http.post('/api/login', {
      data: payload
    });
  },
  result: (state, result) => {
    // normally we'd do something more robust here but this is fine for now to set the browser cookie
    document.cookie = 'JWT=' + result.data.token;
    return {
      ...state,
      user: result.data
    };
  }
},
handler);

const initial_state = {
  user: {}
};

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default handler.reducer(initial_state)

// "Sleep" using `Promise`
function delay(delay)
{
  return new Promise(resolve => setTimeout(resolve, delay))
}