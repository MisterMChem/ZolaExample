import routes from './routes';
import * as reducer from './reducer';
import wrapper from './wrapper';
import asyncSettings from './react-isomorphic-render-async';

export default {
  reducer,
  routes,
  wrapper,
  preload: {
    catch: (error, {path, url, redirect, dispatch, getState}) => {
      console.log(error);
      return redirect(`/login?continue=${encodeURIComponent(url)}`);
    }
  },

  ...asyncSettings
};
