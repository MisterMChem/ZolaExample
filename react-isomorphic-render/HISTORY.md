9.1.17 / 06.02.2017
===================

  * Fixed the initial page not preloading when the user navigated "Back" up to it (the initial page happened to require a special treatment)

9.1.16 / 05.02.2017
===================

  * Added `server` parameter to `preload.catch` function arguments

9.1.13 / 26.01.2017
===================

  * Added support for synchronous action creators (see README)

9.1.12 / 26.01.2017
===================

  * Fixed [`react-router` bug](https://github.com/ReactTraining/react-router/issues/1982) when it didn't remount a `<Route/>` `component`

9.1.10 / 25.01.2017
===================

  * Fixed `@preload()` with back/forward browser navigation
  * Added `pushLocation` and `replaceLocation`
  * Added support for `@preload()` cancellation when `bluebird` is used and configured for `Promise` cancellation

9.1.9 / 24.01.2017
==================

  * Added `websocket` client-side hepler (see `WebSocket` section of the README).

9.1.4 / 19.01.2017
==================

  * Added `authorize` helper (See `Authorized routes` section of the README)
  * (small breaking change) Removed `goto` from `preload.catch` parameters and now `redirect` does what `goto` did, because the older `redirect` made really no sense: on the client side it would rewrite the URL of the previous page and on the server side it was equal to `goto`. So just use `redirect` in `preload.catch` and if `goto` was used there then just replace it with `redirect` and it will work the same.

9.1.2 / 18.01.2017
==================

  * Added back the `redirect` and `goto` parameters to `preload.catch`

9.1.0 / 13.01.2017
==================

  * (small breaking change) server-side `localize()` function parameter now takes not just `store` argument but instead a wrapped `{ store }` argument.
  * (small breaking change) server-side `assets`, `head`, `bodyStart` and `bodyEnd` now take not the old `url` argument but instead the new `path` argument (aka `pathname`), because query parameters should be irrelevant for code-splitting and customization.
  * Added `path` to `preload.error` handler parameters.

9.0.0 / 10.01.2017
==================

  * Added "asynchronous action handlers" (see README)
  <!--* Since `redux-router` maintainers are incompetent and lazy, they don't want to merge my Pull Requests, I'm forking `redux-router` repo as part of this library (`./source/redux/redux-router`) and making the neccessary changes to the code.-->
  * (breaking change) Removed `redux-router` out of this library. Therefore, **there's no more `router` property in Redux state** (e.g. `Cannot read property 'location' of undefined` on `state.router.location`). See the ["Get current location"](https://github.com/halt-hammerzeit/react-isomorphic-render#get-current-location) section of the README to find out how to get current location now.
  * (breaking change) In order for `@preload()` to work on the client-side now use `import { Link } from 'react-isomorphic-render'` instead of `import { Link } from 'react-router'`
  * (breaking change) `import` everything from `react-isomorphic-render` now instead of `react-isomorphic-render/redux`
  * (breaking change) Changed the order of arguments for `render()` and `pageRenderingService()`: they both now take the common settings first, then the specific settings. Migration: `render({...}, settigs)` -> `render(settings, {...})`, `pageRenderingService({...}, settings)` -> `pageRenderingService(settings, {...})`
  * (breaking change) Removed `onStoreCreated` due to it not being used anymore (Redux reducers hot reload is now moved to `application.js` client-side main file)
  * (breaking change) `@onEnter` workaround helper is no longer neccessary because I fixed the `redux-router` `onEnter` bug
  * (breaking change) `onNavigate` moved to client-side `render()` function parameters
  * Renamed `promise_event_naming` to `asynchronous_action_event_naming` and added a camelCase alias. And it no longer has a default.

8.0.13 / 08.01.2017
===================

  * Added proper ES6 exports (`package.module` for Webpack 2 ES6 "tree shaking"). Prefer direct `import { ... } from 'react-isomorphic-render'` now instead of the old `import { ... } from 'react-isomorphic-render/redux'` (`/redux` export is still gonna be around for this major version for compatibility reasons)

8.0.11 / 07.01.2017
===================

  * `development` flag is no longer effective, set up a proper `process.env.NODE_ENV` instead (`development === process.env.NODE_ENV !== 'production'`)

8.0.6 / 04.01.2017
==================

  * Updated the project to work with both `react-router@2` and `react-router@3`

8.0.0 / 03.01.2017
==================

  * Refactored `Html.js`: it is now not a React component but rather a simple HTML string (because that's faster).

  Removed all of the old deprecated parameters (which were deprecated in previous versions):

  * `reduxMiddleware` function now doesn't get an empty array as an argument
  * Removed server-side `preload` function parameter (a more appropriate name is `initialize`)
  * Removed server-side `catch` function parameter (use `common.catch`)
  * Removed `html.style` parameter (use `html.head` instead, for example)
  * Server-side `localize` now must not return a `Promise` (because it's more performant that way: just cache the messages server-side)
  * `on_preload_error` and `preload.on_error` are no longer being aliased to `preload.catch`
  * `http_request` is no longer being aliased to `http.request`

7.1.23 / 15.12.2016
===================

  * Fixed an XSS attack hole when Redux state data was inserted in a page inside a `<script/>` tag without escaping closing tags.

7.1.20 / 14.12.2016
===================

  * Fixed faulty `Date` parsing regular expression which previously caused any four-digit number to be treated as a `Date`

7.1.19 / 13.12.2016
===================

  * Added support for file upload using `http` tool: it automatically constructs a `FormData` instance if it finds an `HTMLInputElement`, a `FileList`, or a `File`. It also supports file upload progress metering via the new `progress` option.

7.1.18 / 13.12.2016
===================

  * Calling `getState()` directly inside `getRoutes()` doesn't throw "TypeError: Cannot read property 'getState' of undefined" now: instead if the store hasn't been created yet it simply returns the result of the `initialize` function parameter (if specified, otherwise - an empty object)

7.1.17 / 07.12.2016
===================

  * Added `{ store }` as a second parameter of `head`, `body_start` and `body_end` (which are now also `bodyStart` and `bodyEnd`)

7.1.16 / 03.12.2016
===================

  * (misc) Better ISO 8601 date/time regular expression

7.1.11 / 07.11.2016
===================

  * Renamed page rendering server setting `preload` to `initialize`, and now splitting `preload` timing into two separate timings: `initialize` and `preload`.

7.1.10 / 07.11.2016
===================

  * Removed `catch` from page rendering server parameters – it is now taken from `preload.catch` common setting

7.1.7 / 05.11.2016
==================

  * Added `dispatch` and `getState` to error handler parameters

7.1.4 / 04.11.2016
==================

  * Removing StatsD from this library since all stats are passed to the `report` user-defined function and therefore the user can choose whether to even use StatsD or any other monitoring solution. Therefore removing `profile.statsd` section. Therefore collapsing `profile.report` path into just `stats` parameter function (the arguments stayed the same).

7.1.0 / 02.11.2016
==================

  * Releasing StatsD monitoring metrics
  * Added a possibility to report page rendering time for any rendered page
  * `translation: async locale => messages` function parameter is now not required. If it's not passed then all translated messages, received from `localize()` function parameter on the server-side, are embedded immediately in the `<html/>` markup sent as the page service reply. `translation` function still may be passed in development mode to enable Webpack Hot Module Replacement for translation data.
  * `localize` function is now recommended to be synchronous (not `async`) because it seems convenient that way (no one really needs to do something complex and asynchronous for translating a page each time a request comes in: it should instead be fast and simple, like caching all translations to RAM at startup and then just synchronously returning them from the RAM cache for each page render). Older `async localize` functions will still work (for this `7.x` version at least)
  * `localize` function may now return a 3rd property as part of the result object: `messagesJSON`. It's a tiny optimization to avoid calculating `JSON.stringify(messages)` for each rendered page.

7.0.1 / 01.11.2016
==================

  * Quick change: renamed `disable: true` to `render: false` in server rendering settings

7.0.0 / 31.10.2016
==================

  * (shouldn't break anything, but just in case) `koa-locale` is not required anymore, instead extracted a couple of functions from it and using them internally to get preferred locales
  * (breaking change) renamed `disable_server_side_rendering` setting to just `disable`
  * (breaking change) `preferredLocale` arugument of `localize` function is now an array (`preferredLocales`)
  * (breaking change) `authentication` settings were moved from server settings to common settings
  * Added `header` parameter to `authentication` settings
  * `@preload()` decorator now takes a second `options` argument which can specify `blocking: false` for child route components to start preloading immediately instead of waiting for this preload to finish first
  * Added `loading` parameter for server configuration (returns a React element for "loading" page when server-side rendering is disabled)
  * Started working towards StatsD monitoring (rendering timings, not yet even tested)

6.1.0 / 23.10.2016
==================

  * Introduced `server_configuration.authentication.cookie` setting which sets authentication cookie name (if this setting is configured). If the authentication cookie exists then its value is assumed to be an authentication token and when using `http` utility in Redux actions this authentication token will be automatically sent along as part of `Authorization: Bearer {token}` HTTP header. If you were using a custom `http.url` formatter function (which is unlikely) then be aware that this authentication token can leak to a 3rd party if you don't restrict the allowed domains in your custom `http.url` formatter function.

6.0.3 / 18.10.2016
===================

  * Fixed preloading middleware error handling

6.0.2 / 13.10.2016
===================

  * Added a common `parse_dates` option (if set to `false` it disables parsing `Date`s during AJAX calls and also while initializing Redux store state on the client-side)

6.0.0 / 11.10.2016
===================

  * Removed `redux-devtools` from the list of dependencies
  * (breaking change) renamed `development_tools` to `devtools`, and it's now not just a React component but an object of shape `{ component, persistState }`
  * (breaking change) renamed `load_translation` to `translation`
  * (breaking change) renamed `on_error` to `catch` in server-side options
  * (breaking change) renamed `preload.on_error` option to `preload.catch`

5.0.9 / 11.10.2016
===================

  * Implemented a workaround for missing redirect parameters `react-router` bug

5.0.7 / 10.10.2016
===================

  * Fixed `redirectLocation.search === undefined` being appended to redirect URLs

5.0.5 / 05.10.2016
===================

  * Added common `history` options (e.g. for setting `basename`)

5.0.4 / 01.10.2016
===================

  * Parsing dates in error JSON objects too

5.0.2 / 11.09.2016
===================

  * Fixed `on_navigation` is not a function bug
  * All `@preload()`s are now blocking; removed the exported `Preload_blocking_method_name`
  * Added `onEnter(({ dispatch, getState }, redirect) => {})(component)` decorator to mimic `react-router`'s `onEnter` hook

5.0.1 / 10.09.2016
===================

  * Fixed `dispatch()` and `getState()` throwing errors in `onEnter` hooks

5.0.0 / 10.09.2016
===================

  * (breaking change) `@preload()` now takes a JSON object with named parameters: `dispatch`, `getState`, `location`, `parameters` and also everything from an optional `preload.helpers` object
  * (breaking change) Renamed `on_preload_error` to `preload.on_error`
  * Added support for `react-router` `onUpdate` handler: a common `on_navigate` function

4.1.10 / 10.09.2016
===================

  * Added `http.url` common option which replaces the default `format_url()` function if specified
  * Renamed `http_request` to `http.request`

4.1.9 / 10.09.2016
===================

  * Added `normalize_common_options` to page server's `render()`

4.1.7 / 08.09.2016
===================

  * Fixed `action is not defined` error when calling `store.getState()` inside `routes()`

4.1.5 / 08.09.2016
===================

  * `assets()` function now has the second argument which is `{ store }`; this can be used, for example, to show different favicons for different users.

4.1.4 / 02.09.2016
===================

  * `development_tools` option is now not a `true` flag but rather a `DevTools` instance created by `crateDevTools()` function call. This way one can customize the tools however he likes. See https://github.com/halt-hammerzeit/react-isomorphic-render#miscellaneous-client-side-rendering-options

4.1.3 / 27.08.2016
===================

  * Fixing `Date` parsing

4.1.2 / 20.08.2016
===================

  * Slightly changed the behaviour of the undocumented `event` parameter of `asynchronous_middleware`: now it transforms `event` into an array of `[event: pending, event: done, event: failed]` as opposed to the older colonless `[event pending, event done, event failed]`. This could break things for those who were using this undocumented feature, but an easy hotfix is to provide `asynchronous_action_event_naming` function parameter in `common.js` to retain the old Redux event naming scheme:

```js
asynchronous_action_event_naming(event_name)
{
  return [`${event_name} pending`, `${event_name} done`, `${event_name} failed`]
}
```

4.1.0 / 17.08.2016
===================

  * (a slight possibility of a breaking change) `http` utility now emits `Failure` Redux event with the `error` different from what it was in `4.0.x`: it used to be the raw `Error` javascript object, and now it is an error data object containing `{ status: 403, message: 'Unauthorized' }` and all other values returned as part of the HTTP response JSON body. The reasoning behind this change is that the `error` from the `Failure` Redux event payload is usually immediately stored in Redux state tree in the corresponding reducer, and since Redux state tree should only contain plain (pure) javascript objects, then it makes sence to store only the useful properties there instead of the whole instance of an `Error` class which is not a plain (pure) javascript object (and, therefore, is not serializable, which is not a functional programming approach).

4.0.40 / 15.08.2016
===================

  * Small fix for Redux `<DevTools/>` extension

4.0.37 / 01.08.2016
===================

  * Fixed `redirect` and `goto` not working from `asynchronous_middleware` failure event dispatch handler

4.0.36 / 31.07.2016
===================

  * Added a dedicated HTTP status code `204` handler to `http` utility

4.0.35 / 28.07.2016
===================

  * Fixed `asynchronous_middleware` events not being dispatched through user-defined middleware

4.0.31 / 27.07.2016
===================

  * Fixed `create_routes`: it now takes `store` as a parameter

4.0.30 / 27.07.2016
===================

  * Fixed user supplied middleware not being able to `goto` or `redirect`

4.0.27 / 27.07.2016
===================

  * `render` on client now also returns `component` and `store` along with `rerender`

4.0.23 / 27.07.2016
===================

  * Added support for asynchronous `react-router` routes for Redux renderer

4.0.22 / 23.07.2016
===================

  * `localize` bug fix

4.0.16 / 22.07.2016
===================

  * Extracted `page-server` rendering into a separate `async` (returns Promise) function `render` (see readme for arguments and return values)

4.0.15 / 22.07.2016
===================

  * Added `secure` option to `page-server`

4.0.13 / 21.07.2016
===================

  * Constrained `http` utility URLs to internal ones only to prevent sensitive data leakage (e.g. HTTP cookies)

4.0.11 / 20.07.2016
===================

  * Removed server-side `development` option. Using `process.env.NODE_ENV` now.

4.0.10 / 20.07.2016
===================

  * Migrated from Koa v1 to Koa v2
  * Added `middleware` option for possible Koa application extension
  * Bumped `superagent` version (1.x -> 2.x)
  * Fixed `preload` function `request` parameter: it was a Koa request, now it's Node.js request
  * Fixed `clone_request` parameter of `http_client`: it was a Koa request, now it's Node.js request

4.0.9 / 19.07.2016
===================

  * Fixed `PUT` and `PATCH` `http` requests not sending data via POST

4.0.8 / 19.07.2016
===================

  * Added second parameter to `preload` server-side function. The added parameter is an object having a `request` property which can be used, for example, to read a cookie into Redux store.

4.0.7 / 19.07.2016
===================

  * Added second parameter for `http` utility customization function, which holds the `store`

4.0.6 / 18.07.2016
===================

  * Added `http_request` parameter for `http` utility adjustment

4.0.5 / 18.07.2016
===================

  * Added support for supplying custom HTTP headers to `http` utility

4.0.4 / 18.07.2016
===================

  * @adailey14 Fixed a bug of `redux_middleware` not working on server-side

4.0.0 / 05.07.2016
===================

  * Renamed `markup_wrapper` to `wrapper`
  * Now takes `reducer` parameter instead of `create_store`
  * Now takes `routes` parameter instead of `create_routes`
  * Many other API changes (mostly refactoring)

3.0.4 / 04.07.2016
===================

  * Refactoring
  * `<div id="react_markup"/>` -> `<div id="react"/>`
  * Fixed `redux-devtools`

3.0.0 / 29.05.2016
===================

  * Migrated from `react-document-meta` to `react-helmet` (nothing special). Breaking changes: `meta` is now a `react-helmet` `meta` array, and the `head()` function now takes only two parameters - `title` and `meta` - therefore omitting `description` parameter.


2.1.31 / 27.04.2016
===================

  * Fixed infinite looping page freeze when navigating to the same `<Route/>`

2.1.29 / 09.04.2016
===================

  * Migrated to react-router 2

2.1.22 / 01.03.2016
===================

  * Added support for `Date`s in Redux state

2.1.21 / 29.02.2016
===================

  * Fixed occasional "Invariant Violation: `mapStateToProps` must return an object. Instead received [object Promise]" Redux error

2.1.12 / 08.02.2016
===================

  * Added `@preload()`ing events for preload status indication

2.1.10 / 04.02.2016
===================

  * Optimized `@preload()`ing for top level components

2.1.6 / 03.02.2016
==================

  * Added `on_preload_error` error handler for client side rendering (used for 401 and 403 redirects, for example)

2.1.4 / 02.02.2016
==================

  * Added `on_error` error handler (used for 401 and 403 redirects, for example)

2.1.0 / 22.01.2016
==================

  * Now correctly manages Http Cookies (allows for cookie modification on server-side)
  * Added blocking preload methods for Reat-Routed Components

2.0.0 / 19.01.2016
==================

  * changed `markup_wrapper` from a function to a React component
  * internationalization messages are now not passed from server to client but are instead loaded during client-side rendering (to allow for Hot Module Replacement aka hot reload)
  * extensive refactoring and some minor features added

1.4.1 / 07.01.2016
==================

  * can now use `Promise`s returned from Redux dispatched actions

1.4.0 / 03.01.2016
==================

  * changed `body` function a bit
  * removed `to` from client-side rendering function parameters

1.2.0 / 26.12.2015
==================

  * changed `preload` arguments order

1.2.0 / 26.12.2015
==================

  * simplified website "favicon" insertion into <head/>
  * `styles` parameter renamed to `style`

1.1.0 / 26.12.2015
==================

  * `create_routes` is now required on server-side too
  * `create_store` simplifed

1.0.2 / 25.12.2015
==================

  * API refactoring

1.0.0 / 24.12.2015
==================

  * Initial release