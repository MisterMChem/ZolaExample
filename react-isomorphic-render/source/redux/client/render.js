import React from 'react'
import { Router, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'

import react_render_on_client from '../../render on client'
import { location_url } from '../../location'
import { redirect_action } from '../actions'
import match_routes_against_location from '../../react-router/match'

// Renders the current page React element inside the `to` DOM element.
//
// Returns a `Promise` resolving to `{ store, component }`,
// where `component` is the rendered React component
// and `store` is the Redux store.
//
export default function render_on_client({ history, devtools, create_page_element, routes, store, to })
{
	// Performs `react-router` asynchronous match for current location
	// (is required for asynchonous routes to work).
	return match_routes_against_location
	({
		// `react-router` `match()` internally uses this `history` to get current location.
		// Could have just used `document.location` here,
		// but what if, for example, `basename` feature of `history` is being used.
		history,
		routes: typeof routes === 'function' ? routes(store) : routes
	})
	.then(({ redirect, router_state }) =>
	{
		// In case of a `react-router` `<Redirect/>`
		if (redirect)
		{
			return store.dispatch(redirect_action(redirect))
		}

		const router_element = <Router
			{ ...router_state }
			createElement={ create_route_element }
			history={ history }
			render={ applyRouterMiddleware( useScroll(should_scroll) ) }/>

		// Wraps <Router/> with arbitrary React components (e.g. Redux <Provider/>),
		// loads internationalization messages,
		// and then renders the wrapped React page element to DOM
		return create_page_element(router_element, { store }).then(element =>
		{
			// Render the wrapped React page element to DOM
			const component = react_render_on_client
			({
				element, // wrapped React page element
				to // DOM element to which React markup will be rendered
			})
			.component

			const result =
			{
				component,
				store
			}

			// If Redux-devtools aren't enabled, then just return the rendered page component
			// (if Redux-devtools are installed as a web browser extension
			//  then no need to do the second render pass too)
			if (process.env.NODE_ENV === 'production' || !devtools || window.devToolsExtension)
			{
				return result
			}

			// Dev tools should be rendered after initial client render to prevent warning
			// "React attempted to reuse markup in a container but the checksum was invalid"

			// React JSX syntax can't detect lowercase elements
			const DevTools = devtools.component

			// This element will contain
			// React page element and Redux-devtools.
			//
			// Since `DevTools` are inserted
			// outside of the `<Provider/>`,
			// provide the `store` manually.
			//
			element = 
			(
				<div>
					{ element }
					<DevTools store={ store }/>
				</div>
			)

			// Render the wrapped React page element to DOM
			result.component = react_render_on_client
			({
				element, // wrapped React page element
				to, // DOM element to which React markup will be rendered
				subsequent_render: true // Prevents "Server-side React render was discarded" warning
			})
			.component

			return result
		})
	})
}

function should_scroll(previous_router_properties, new_router_properties)
{
	const { location } = new_router_properties

	if (location.scroll === false)
	{
		return false
	}

	return true
}

// Fixes `react-router` bug by forcing 
// `<Route/>` `component` remount on any URL change.
// https://github.com/ReactTraining/react-router/issues/1982
function create_route_element(component, props)
{
	const { location, routes } = props

	// Is this the last React component in the route components chain
	const is_page_component = component === routes[routes.length - 1].component

	// If it is then remount this page component
	if (is_page_component)
	{
		// Unless explicitly told not to remount
		if (location.remount !== false)
		{
			window._react_router_page_element_key = `${location.pathname}${location.search}`
		}

		// Force `<Route/>` `component` remount on any URL change via `key` property.
		props = { ...props, key: window._react_router_page_element_key }
	}

	// Default behaviour
	return React.createElement(component, props)
}