// Helpers

import { webpage_head, webpage_title, webpage_meta } from './source/webpage head'

// `const` is not supported in Internet Explorer 10
export var head  = webpage_head
export var title = webpage_title
export var meta  = webpage_meta

// Redux

import client  from './source/redux/client/client'
import preload from './source/redux/preload'

export { client as render, preload }

export
{
	Preload_started,
	Preload_started as PRELOAD_STARTED,
	Preload_finished,
	Preload_finished as PRELOAD_FINISHED,
	Preload_failed,
	Preload_failed as PRELOAD_FAILED,
	Preload_method_name,
	Preload_method_name as PRELOAD_METHOD_NAME,
	Preload_options_name,
	Preload_options_name as PRELOAD_OPTIONS_NAME
}
from './source/redux/middleware/preloading middleware'

export
{
	action,
	create_handler,
	create_handler as createHandler,
	state_connector,
	state_connector as stateConnector
}
from './source/redux/asynchronous action handler'

export
{
	default as asynchronous_action_handler,
	default as asynchronousActionHandler
}
from './source/redux/asynchronous action handler'

export
{
	underscoredToCamelCase,
	event_name,
	event_name as eventName
}
from './source/redux/naming'

export
{
	goto_action as goto,
	redirect_action as redirect,
	GoTo,
	GoTo as GO_TO,
	Redirect,
	Redirect as REDIRECT,
	Navigated,
	Navigated as NAVIGATED
}
from './source/redux/actions'

export
{
	default as Link
}
from './source/redux/Link'

export
{
	default as IndexLink
}
from './source/redux/IndexLink'

export
{
	default as authorize
}
from './source/redux/authorize'

export
{
	default as websocket
}
from './source/redux/client/websocket'

export {
	replace_location,
	replace_location as replaceLocation,
	push_location,
	push_location as pushLocation
} from './source/react-router/set location';

export {
  httpStatus,
	httpHeader
} from './source/http';
