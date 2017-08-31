import nunjucks from 'nunjucks'

import { server_generated_webpage_head } from '../webpage head'
import { get_language_from_locale } from '../helpers'

nunjucks.configure({ autoescape: true })

export default function Html(options)
{
	const { assets } = options

	const style_url      = assets.entry ? assets.style[assets.entry]      : assets.style
	const javascript_url = assets.entry ? assets.javascript[assets.entry] : assets.javascript

	const webpage_head = server_generated_webpage_head()

	return template.render
	({
		...options,
		webpage_head,
		style_url,
		javascript_url,
		get_language_from_locale,
		safe_json_stringify,
		JSON
	})
}

export function safe_json_stringify(json)
{
	// The default javascript JSON.stringify doesn't escape forward slashes,
	// but it is allowed by the JSON specification, so we manually do it here.
	// (and javascript regular expressions don't support "negative lookbehind"
	//  so it's simply replacing all forward slashes with escaped ones,
	//  but also make sure to not call it twice on the same JSON)
	return JSON.stringify(json).replace(/\//g, '\\/')
}

const template = nunjucks.compile
(`
	<html {{ webpage_head.htmlAttributes.toString() }} {% if locale %} lang="{{get_language_from_locale(locale)}}" {% endif %}>
		<head>
			{# "react-helmet" stuff #}
			{{ webpage_head.title.toString() | safe }}
			{{ webpage_head.meta.toString()  | safe }}
			{{ webpage_head.link.toString()  | safe }}

			{#
				(will be done only in production mode
				 with webpack extract text plugin) 

				Mount CSS stylesheets for all entry points
				(should have been "for the current entry point only")

				(currently there is only one entry point: "main";
				 and also the "common" chunk)
			#}
			{% if assets.entry and assets.style and assets.style.common %}
				<link
					href="{{ assets.style.common | safe }}"
					rel="stylesheet"
					type="text/css"
					charset="UTF-8"/>
			{% endif %}

			{% if style_url %}
				<link
					href="{{ style_url | safe }}"
					rel="stylesheet"
					type="text/css"
					charset="UTF-8"/>
			{% endif %}

			{# Custom <head/> markup #}
			{{ head | safe }}

			{# Site icon #}
			{% if assets.icon %}
				<link rel="shortcut icon" href="{{ assets.icon | safe }}"/>
			{% endif %}
		</head>

		<body>
			{# Supports adding arbitrary markup to <body/> start #}
			{{ body_start | safe }}

			{# 
				React page content.
				(most of the possible XSS attack scripts are executed here,
				 before the global authentication token variable is set,
				 so they're unlikely to even be able to hijack it)
			#}
			<div id="react">
				{{- content | safe -}}
			</div>

			{#
				Locale for international messages
				(is only used in client-side Ajax "translate"
				 the existence of which is questionable).
			#}
			{% if locale %}
				<script>
					window._locale = {{ safe_json_stringify(locale) | safe }}
				</script>
			{% endif %}

			{#
				Localized messages.
				The value must be XSS-safe.
			#}
			{% if locale %}
				<script>
					window._locale_messages = {{ locale_messages_json | safe }}
				</script>
			{% endif %}

			{# Custom javascript. Must be XSS-safe. #}
			{# e.g. Redux stuff goes here (Redux state, Date parser) #}
			{% if extension_javascript %}
				{{ extension_javascript | safe }}
			{% endif %}

			{# javascripts #}

			{#
				Make JWT authentication token visible to the client-side code
				to set up the "http" utility used inside Redux actions.
				(the client-side React initialization code will
				 automatically erase this authenticaiton token global variable
				 to protect the user from session hijacking via an XSS attack)
			#}
			{% if authentication_token %}
				<script data-authentication-token>
					window._authentication_token={{ safe_json_stringify(authentication_token) | safe }}
				</script>
			{% endif %}

			{#
				Remove the <script/> tag above as soon as it executes
				to prevent potentially exposing authentication token during an XSS attack.
			#}
			{% if authentication_token %}
				<script>
					document.body.removeChild(document.querySelector('script[data-authentication-token]'))
				</script>
			{% endif %}

			{#
				The "common.js" chunk (see webpack extract commons plugin)
				(needs to be included first (by design))
			#}
			{% if assets.entry and assets.javascript and assets.javascript.common %}
				<script src="{{ assets.javascript.common | safe }}" charset="UTF-8"></script>
			{% endif %}

			{#
				Current application "entry" point javascript
				(currently there is only one entry point: "main")
			#}
			<script src="{{ javascript_url | safe }}" charset="UTF-8"></script>

			{# Supports adding arbitrary markup to <body/> end #}
			{{ body_end | safe }}
		</body>
	</html>
`
.replace(/\t/g, ''))