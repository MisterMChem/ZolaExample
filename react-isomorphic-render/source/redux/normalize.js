import React from 'react'
import { Provider } from 'react-redux'

import { clone } from '../helpers'

// Normalizes common settings
export default function normalize_common_settings(settings, options = {})
{
	if (settings === undefined)
	{
		throw new Error(`Common settings weren't passed.`)
	}

	if (typeof settings !== 'object')
	{
		throw new Error(`Expected a settings object, got ${typeof settings}: ${settings}`)
	}

	settings = clone(settings)

	if (options.full !== false)
	{
		if (!settings.routes)
		{
			throw new Error(`"routes" parameter is required`)
		}

		if (!settings.reducer)
		{
			throw new Error(`"reducer" parameter is required`)
		}
	}

	if (!settings.wrapper)
	{
		// By default it wraps everything with Redux'es `<Provider/>`.
		settings.wrapper = function Wrapper({ store, children })
		{
			return <Provider store={ store }>{ children }</Provider>
		}
	}

	// camelCase aliasing
	if (settings.asynchronousActionEventNaming)
	{
		settings.asynchronous_action_event_naming = settings.asynchronousActionEventNaming
		delete settings.asynchronousActionEventNaming
	}

	// camelCase aliasing
	if (settings.asynchronousActionHandlerStatePropertyNaming)
	{
		settings.asynchronous_action_handler_state_property_naming = settings.asynchronousActionHandlerStatePropertyNaming
		delete settings.asynchronousActionHandlerStatePropertyNaming
	}

	// camelCase aliasing
	if (settings.reduxMiddleware)
	{
		settings.redux_middleware = settings.reduxMiddleware
		delete settings.reduxMiddleware
	}

	// camelCase aliasing
	if (settings.parseDates !== undefined)
	{
		settings.parse_dates = settings.parseDates
		delete settings.parseDates
	}

	// Default value for `parse_dates` is `true`
	if (settings.parse_dates !== false)
	{
		settings.parse_dates = true
	}

	if (!settings.history)
	{
		settings.history = {}
	}

	// This message was too noisy printing on each page render.
	//
	// // For those who don't wish to proxy API requests to API servers
	// // and prefer to query those API servers directly (for whatever reasons).
	// // Direct API calls will contain user's cookies and HTTP headers (e.g. JWT token).
	// //
	// // Therefore warn about authentication token leakage
	// // in case a developer supplies his own custom `format_url` function.
	// //
	// if (settings.http && settings.http.url)
	// {
	// 	console.log('[react-isomorphic-render] The default `http.url` formatter only allows requesting local paths therefore protecting authentication token (and cookies) from leaking to a 3rd party. Since you supplied your own `http.url` formatting function, implementing such anti-leak guard is your responsibility now.')
	// }

	return settings
}