/*
  This is the file responsible for rendering content and handling verification.
  There are a number of technologies demonstrated here, but importantly:
  - We use Passport for login management.
  - In conjunction with the JWT Strategy, we can get a fully stateless user management on frontend.
  - This is consistent with how the api manages state, see root/api
*/
import passport from 'koa-passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';
import mount from 'koa-mount';
import jwt from 'jsonwebtoken';
import authConfig from '../../auth/config';
import userService from '../../auth/user-service';
import settings from '../src/react-isomorphic-render';
import webpageServer from '../../react-isomorphic-render/server';

const convert = require('koa-convert');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser');

const WEB_SERVICE_PORT = 3000;
const PAGE_SERVICE_PORT = 3002;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: authConfig.jwt.secret,
  issuer: authConfig.jwt.issuer,
  audience: authConfig.jwt.audience
};

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  userService(jwtPayload.email).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));
export default function(parameters) {
  // Starts webpage rendering server
  const server = webpageServer(settings, {
    // HTTP host and port for performing all AJAX requests
    // when rendering pages on server-side.
    // E.g. an AJAX request to `/items/5` will be transformed to
    // `http://${host}:${port}/items/5` during server-side rendering.
    // Specify `secure: true` flag to use `https` protocol instead of `http`.
    application: {
      host: 'localhost',
      port: WEB_SERVICE_PORT
      // secure: true
    },

    // Http Urls to javascripts and (optionally) CSS styles
    // which will be insterted into the <head/> element of the resulting Html webpage
    // (as <script src="..."/> and <link rel="style" href="..."/> respectively)
    //
    // Also a website "favicon".
    //
    assets(path) {
      // Retrieve asset chunk file names
      // (which are output by client side Webpack build)
      const result = { ...parameters.chunks() }

      // Webpack entry point (can be used for code splitting)
      result.entry = 'main'

      // // Clear Webpack require() cache for hot reload in development mode
      // // (this is not necessary)
      // if (process.env.NODE_ENV !== 'production') {
      //   delete require.cache[require.resolve('../assets/images/icon.png')]
      // }

      // Add "favicon"
      result.icon = require('../assets/images/zolaicon.png')


      // Return assets
      return result
    },
    middleware: [
      mount(convert(bodyParser())),
      mount(convert(passport.initialize())),
    ],
        // (optional)
    // Initializes Redux state before performing
    // page preloading and rendering.
    //
    // If defined, this function must return an object
    // which is gonna be the initial Redux state.
    //
    // `request` is the original HTTP request for the webpage.
    // It can be used, for example, to load the currently
    // logged in user info (user name, user picture, etc).
    //
    initialize: async (httpClient, { request }) => {
      const jwtCookie = getCookie('JWT', request.headers.cookie);
      const userObj = jwtCookie ? jwt.verify(jwtCookie, authConfig.jwt.secret) : {};
      return {
        Authentication: {
          user: userObj
        }
      };
    },
    // (or same without `async`: (httpClient, { request }) => Promise.resolve({})
    authentication: {
      cookie: 'JWT',
      header: 'Authorization'
    },
    html: {
      // Will be inserted into server rendered webpage <head/>
      // (this `head()` function is optional and is not required)
      // (its gonna work with or without this `head()` parameter)
      head(path) {
        if (process.env.NODE_ENV !== 'production') {
          // `devtools` just tampers with CSS styles a bit.
          // It's not required for operation and can be omitted.
          // It just removes the "flash of unstyled content" in development mode.
          // EDIT: Seemed as if this needed to be gone to work with extract text
          // return `<script>${devtools({ ...parameters, entry: 'main' })}</script>`
        }
      },

      // Isomorphic CSS flag
      bodyStart() {
        return `
          <script>
            // This line is just for CSS
            document.body.classList.add('javascript-is-enabled');
          </script>
        `;
      }
    }
  })
  function getCookie(name, cookie) {
    if (!cookie) return;
    var value = "; " + cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  // Start webpage rendering server
  server.listen(PAGE_SERVICE_PORT, function(error) {
    if (error) {
      console.error('Webpage rendering server shutdown due to an error')
      throw error
    }

    console.log(`Webpage server is listening at http://localhost:${PAGE_SERVICE_PORT}`)
  })
}
