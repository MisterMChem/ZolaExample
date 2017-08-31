import ReactDOMServer from 'react-dom/server'

// Renders React page content element
// (wrapping it with the <Html/> component)
// to the resulting Html markup code
// (returns a string containing the final html markup)
//
export default function render_on_server({ render_webpage, page_element })
{
	return '<!doctype html>\n' + render_webpage(page_element)
}