# Pixel-Geeks
A photo album for geeks to host photos on GitHub.

## How to use

- Clone the repo
- Copy your images into ./setup/input
- `npm start`


## To host it on GitHub Pages

- Create a GITHUB_TOKEN [here](https://github.com/settings/tokens) 
- Create a repo (eg: reponame)
- Add it as `GH_PAT` https://github.com/user/reponame/settings/secrets/actions for GitHub actions
- Update homepage in package.json to match your reponame
- Copy your images into ./setup/input
- Commit the changes and push the code
- GitHub Actions will automatically deploy it to GitHub Pages