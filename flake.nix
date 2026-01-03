# flake.nix
# `nix develop`を実行して反映・仮想環境立ち上げ
{
  description = "プロジェクト名:BrailleFinder";

  inputs = {
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
    git-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    { flake-parts, ... }@inputs:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.git-hooks.flakeModule
        inputs.treefmt-nix.flakeModule
      ];
      systems = import inputs.systems;

      perSystem =
        {
          config,
          lib,
          pkgs,
          system,
          ...
        }:
        {
          devShells.default = pkgs.mkShell {

            # [カスタマイズ] プロジェクトで必要な開発ツールを追加
            packages = with pkgs; [
              git
              nodejs_24
              oxfmt
              oxlint
              typescript
              typescript-language-server
            ];
            shellHook = ''
              ${config.pre-commit.installationScript}

              alias e="exit"
            '';
          };
          pre-commit = {
            check.enable = true;

            # [カスタマイズ] コミット時に実行するフックを設定
            settings.hooks = {
              nil.enable = true;
              oxlint = {
                enable = true;
                entry = "${pkgs.oxlint}/bin/oxlint --fix";
                files = "\\.[jt]sx?$";
              };
              oxfmt = {
                enable = true;
                entry = "${pkgs.oxfmt}/bin/oxfmt --write";
                files = "\\.[jt]sx?$";
              };
              treefmt = {
                enable = true;
                package = config.treefmt.build.wrapper;
              };
            };
          };
          treefmt = {
            projectRootFile = "flake.nix";

            # [カスタマイズ] treefmtで使用するフォーマッターを選択
            programs = {
              nixfmt.enable = true;
            };
          };
        };
    };
}
