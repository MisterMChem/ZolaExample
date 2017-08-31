import { action, createHandler, stateConnector } from '../../../react-isomorphic-render'
import settings from '../react-isomorphic-render-async'
import queryString from 'query-string';

const handler = createHandler(settings);

// A little helper for Redux `@connect()`
export const connector = stateConnector(handler)

export const get_content = action({
  namespace: 'content',
  event: 'GET_CONTENT',
  action: (filter, http) => {
    // Let's sim server lag
    // We'll stick to filtering on the frontend but for large data sets we'd include pagination and filtering here
    return delay(3000).then(result => http.get(`/api/content?${queryString.stringify(filter)}`));
  },
  result: (state, result) => (
    {
      ...state,
      content: result.data.items,
      initialContent: result.data.items,
      filteredContent: result.data.items
    }
  )
}, handler);

export const set_content = action({
  namespace: 'content',
  event: 'SET_CONTENT',
  action: async (newContent, filter, http) =>
  ({
      content: newContent,
      filter
  }),
  result: (state, result) => (
    {
      ...state,
      content: result.content,
      filteredContent: result.filter ? result.content : state.filteredContent
    }
  )
}, handler);


const initial_state = {
  content: [],
  filteredContent: [],
  initialContent: []
};

// This is the Redux reducer which now
// handles the asynchronous actions defined above.
export default handler.reducer(initial_state)

// "Sleep" using `Promise`
function delay(delay)
{
  return new Promise(resolve => setTimeout(resolve, delay))
}