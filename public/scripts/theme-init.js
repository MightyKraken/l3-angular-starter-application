/* eslint-disable no-undef */
(function () {
	var root = document.documentElement;
	var validThemes = {
		light: true,
		dark: true,
		cupcake: true,
		bumblebee: true,
		emerald: true,
		corporate: true,
		synthwave: true,
		retro: true,
		cyberpunk: true,
		valentine: true,
		halloween: true,
		garden: true,
		forest: true,
		aqua: true,
		lofi: true,
		pastel: true,
		fantasy: true,
		wireframe: true,
		black: true,
		luxury: true,
		dracula: true,
		cmyk: true,
		autumn: true,
		business: true,
		acid: true,
		lemonade: true,
		night: true,
		coffee: true,
		winter: true,
		dim: true,
		nord: true,
		sunset: true,
		caramellatte: true,
		abyss: true,
		silk: true
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

	var theme = readCookie('app.theme');
	root.setAttribute('data-theme', validThemes[theme] ? theme : 'nord');
})();
