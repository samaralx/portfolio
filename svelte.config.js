import adapter from "@sveltejs/adapter-static";

export default {
	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				"script-src": ["self"],
				"frame-ancestors": ["self"],
			},
			// must be specified with either the `report-uri` or `report-to` directives, or both
			reportOnly: {
				"script-src": ["self"],
				"report-uri": ["/"],
			},
		},
	},
};
