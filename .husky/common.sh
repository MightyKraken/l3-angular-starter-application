# Git hooks often run without your shell profile (IDE push, GUI, etc.).
# Restore Node/npm when missing from PATH.

if ! command -v npm >/dev/null 2>&1; then
	export PATH="$HOME/.local/share/fnm/aliases/default/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

	if [ -s "$HOME/.nvm/nvm.sh" ]; then
		# shellcheck disable=SC1091
		. "$HOME/.nvm/nvm.sh"
	elif command -v fnm >/dev/null 2>&1; then
		eval "$(fnm env --shell bash 2>/dev/null)" || true
	fi
fi

if ! command -v npm >/dev/null 2>&1; then
	echo "husky: npm not found. Install Node or push from a terminal where fnm/nvm is loaded."
	exit 1
fi
