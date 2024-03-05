# Pixel-Geeks
A photo album for geeks to host photos on GitHub.

## How to clone & use
```sh
# Clone the repo
git clone https://github.com/rathnasorg/pixel-geeks.git

# Change the repo name
mv pixel-geeks PG20240304AadyaBday && cd PG20240304AadyaBday

# Change the base uri
sed -i '' 's/pixel-geeks/PG20240304AadyaBday/g' package.json

# Change the title
sed -i '' 's/pixel-geeks/PG20240304AadyaBday/g' ./public/index.html
sed -i '' 's/pixel-geeks/PG20240304AadyaBday/g' ./setup/digest.js

# Change the remote url
git remote -v
git remote set-url origin https://github.com/rathnasorg/PG20240304AadyaBday.git
git remote -v

# Cleanup ./setup/input
rm -rf ./setup/input && mkdir -p ./setup/input

# Copy your images (DO NOT MOVE IT) into ./setup/input
cp -r ~/Downloads/20240304_AadyaBday/* ./setup/input/

# Skip this step if you want to deploy directly online, if you want to to test locally
npm i && npm start

# Optimize images
npm i && node ./setup/digest.js

# Cleanup to reduce file size, ignore if you want to persist original files
rm -rf ./setup/input && mkdir -p ./setup/input
rm -rf ./public/photos/raw && mkdir -p ./public/photos/raw

# Create the remote GitHub repo & push to automatically deploy on GitHub pages
git checkout --orphan main1
git add -A
git commit -am "first commit"
git branch -D main
git branch -m main
git push -f origin main
git branch --set-upstream-to=origin/main main

```

## To host it on GitHub Pages

- Create a GITHUB_TOKEN [here](https://github.com/settings/tokens) 
- Create a repo (eg: reponame)
- Add it as `GH_PAT` https://github.com/user/reponame/settings/secrets/actions for GitHub actions
- Update homepage in package.json to match your reponame
- Copy your images into ./setup/input
- Commit the changes and push the code
- GitHub Actions will automatically deploy it to GitHub Pages