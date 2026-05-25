/* eslint-disable no-undef */
(function () {
	var root = document.documentElement;
	var validSchemes = { light: true, dark: true };
	var validPalettes = {
		default: true,
		ocean: true,
		forest: true,
		violet: true,
		sunset: true,
		rose: true,
		slate: true,
		amber: true,
		mint: true,
		monochrome: true
	};

	function readCookie(name) {
		var encoded = encodeURIComponent(name) + '=';
		var parts = document.cookie.split('; ');

		for (var i = 0; i < parts.length; i++) {
			if (parts[i].indexOf(encoded) === 0) {
				return decodeURIComponent(parts[i].slice(encoded.length));
			}
		}

		return null;
	}

	var scheme = readCookie('app.colorScheme');
	var palette = readCookie('app.palette');

	root.dataset.colorScheme = validSchemes[scheme] ? scheme : 'light';
	root.dataset.palette = validPalettes[palette] ? palette : 'default';
	root.style.colorScheme = root.dataset.colorScheme;
})();
