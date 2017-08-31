import { location_url } from './location'

// Creates `history`
export default function create_history(createHistory, location, history_options, server)
{
	// Create `history`.
	//
	// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#customize-your-history-further
	//
	// `entries` is used in `MemoryHistory` only (i.e. on server side)
	// https://github.com/ReactTraining/history/blob/v3.x/modules/createMemoryHistory.js
	//
	const history = createHistory({ ...history_options, entries: [ location ] })

	// Because History API won't work on the server side for navigation,
	// instrument it with custom redirection handlers.
	if (server)
	{
		// Instrument `history`
		// (which was earlier passed to `preloading_middleware`)
		history.replace = server_side_redirect(history_options && history_options.basename)
		history.push    = history.replace
	}

	// Return `history`
	return history
}

// A hacky way but it should work
// for calling `redirect` from anywhere
// inside `@preload()` function argument.
function server_side_redirect(basename)
{
	return (location) =>
	{
		// Sanity check
		if (!location)
		{
			throw new Error(`location parameter is required for redirect() or goto()`)
		}

		// Convert an object to a textual URL
		let url = location_url(location)

		// If it's a relative URL, then prepend `basename` to it.
		// (imulates `history` `basename` functionality)
		if (url[0] === '/' && basename)
		{
			url = `${basename}${url}`
		}

		// Construct a special "Error" used for aborting and redirecting
		server_redirect(url)
	}
}

export function get_location(history)
{
	// v4
	if (history.location)
	{
		return history.location
	}

	// v3
	if (history.getCurrentLocation)
	{
		return history.getCurrentLocation()
	}

	// v2
	let location
	const unlisten = history.listen(x => location = x)
	unlisten()
	return location
}

export function server_redirect(location)
{
	const url = location_url(location)
	const error = new Error(`Redirecting to ${url} (this is not an error)`)
	error._redirect = url
	throw error
}