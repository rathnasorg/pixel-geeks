# Pixel-Geeks
A photo album for geeks to host photos on GitHub.

## How to clone & use

- Ensure [github cli](cli.github.com) is installed
- Clone this repo
- Setup git's user.name and user.email
- Execute ./pg.sh and follow the prompts

```sh

gh auth login
git clone https://github.com/rathnasorg/pixel-geeks.git
cd pixel-geeks
git config user.name anand
git config user.email anand@rathnas.com
./pg.sh

```

## To host it on GitHub Pages

- Create a GITHUB_TOKEN [here](https://github.com/settings/tokens) 
- Add it as `GH_PAT` in https://github.com/{userOrOrg}/{repoName}/settings/secrets/actions
- GitHub Actions will automatically deploy it to GitHub Pages
