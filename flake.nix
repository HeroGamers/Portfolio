{
	description = "Portfolio dev shell";

	inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

	outputs =
		{ nixpkgs, ... }:
		let
			systems = [
				"x86_64-linux"
				"aarch64-linux"
				"x86_64-darwin"
				"aarch64-darwin"
			];
			forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
		in
		{
			devShells = forAllSystems (pkgs: {
				default = pkgs.mkShell {
					packages = with pkgs; [
						nodejs_26
						just
					];

					# Use nix-provided browsers; keep playwright-driver in sync with @playwright/test in package.json
					PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";
					PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
					PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
				};
			});
		};
}
