registerModule(function() {
	const ampPrefix = "/amp/s/";
	return {
		redirect: function(url) {
			if ( url.hostname === "www.google.com" ) {
				if ( url.pathname === "/url" ) {
					return extractQueryPairAsUrl(url.searchParams, "q");
				}
				if ( url.pathname.startsWith(ampPrefix) ) {
					const rawAmpUrl = url.pathname.substring(ampPrefix.length);
					// does Google insert schemes to the AMPed pages?
					if ( rawAmpUrl.startsWith("http://") || rawAmpUrl.startsWith("https://") ) {
						return new URL(rawAmpUrl);
					}
					// assuming that the URL is always open for HTTP possibly redirecting to HTTPS itself
					const schemedAmpUrl = "http://" + rawAmpUrl;
					try {
						return new URL(schemedAmpUrl);
					} catch ( ex ) {
						console.error(ex);
						// pass
					}
				}
			}
		}
	};
});
