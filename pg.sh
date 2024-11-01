#!/bin/sh

# Proceed only if git config user.name and user.email are set
if [ -z "$(git config user.name)" ]; then
  echo "git config user.name is not set. Retry after setting it like..."
  echo "git config user.name yourname"
  exit 2
fi
if [ -z "$(git config user.email)" ]; then
  echo "git config user.email is not set. Retry after setting it like..."
  echo "git config user.email yourname@example.com"
  exit 3
fi
# Proceed only if gh is installed
if ! command -v gh &> /dev/null; then
  echo "gh is not installed. Go to cli.github.com to install. Exiting..."
  exit 4
fi
# Proceed only if gh is auth'd
if ! gh auth status >/dev/null 2>&1; then
    echo "You need to login to gh cli first: gh auth login"
    exit 6
fi


# ~~

# prompt for an album name
echo "Enter album name: "
read tmpAlbumName
albumName="PG${tmpAlbumName//[^[:alnum:]]/}"
echo "Album name (clensed): $albumName, proceed? (Y/n)"
read proceed
if [ "$proceed" = "n" ]; then
  echo "Exiting..."
  exit 7
fi



# ~~

# prompt for a directory where the photos are located
echo "eg: /Users/username/Downloads/20240205_SomeoneBdayU"
read -e -p "Enter directory where photos are located: " dir

# Proceed only if the directory exists
if [ ! -d "$dir" ]; then
  echo "Directory "$dir" does not exist. Exiting..."
  exit 8
fi

# copy all the photos from $dir to ./setup/input
rm -rf ./setup/input && mkdir -p ./setup/input
cp $dir/* ./setup/input

# Proceed only if ./setup/input is not empty
if [ ! "$(ls -A ./setup/input)" ]; then
  echo "No photos found in setup/input. Exiting..."
  exit 9
fi

# ~~ 

# Optimize images and cleanup
(cd ./setup; npm i; npm run start)
rm -rf ./setup/input && mkdir -p ./setup/input
rm -rf ./public/photos/raw && mkdir -p ./public/photos/raw



# Proceed only if ./public/photos/optimized is not empty
if [ ! "$(ls -A ./public/photos/optimized)" ]; then
  echo "No photos found in ./public/photos/optimized. Exiting..."
  exit 10
fi

# ~~

# rename to $albumName (prefix with PG and only alphanumeric characters)
mv ../pixel-geeks "../$albumName"

# Replace all pixel-geeks in the album with $albumName
sed -i '' -e "s/pixel-geeks/$albumName/g" package.json
sed -i '' -e "s/pixel-geeks/$tmpAlbumName/g" ./public/index.html
sed -i '' -e "s/pixel-geeks/$tmpAlbumName/g" ./setup/digest.js



# ~~

# Extract the remote url from git remote -v and replace pixel-geens with $albumName
remoteUrl=$(git remote -v | grep origin | grep fetch | awk '{print $2}')
updatedRemoteUrl=$(echo "$remoteUrl" | sed "s/pixel-geeks/$albumName/g")
echo -e "Updated remote repo url from: $remoteUrl to: $updatedRemoteUrl"
git remote set-url origin $updatedRemoteUrl

# Remove username and token from $updatedRemoteUrl
updatedRemoteUrlNoCreds=$(echo "$updatedRemoteUrl" | sed "s/https:\/\/.*@/https:\/\//")



# ~~

# Create a new private repository on GitHub
tmp=${updatedRemoteUrlNoCreds#https://github.com/}
tmp=${tmp%.git}
usernameOrOrgname=$(echo "$tmp" | cut -d'/' -f1)
echo "Checking if organization $usernameOrOrgname exists..."
if gh api /orgs/"$usernameOrOrgname" &> /dev/null; then
  echo "Organization found. Creating repository $tmp"
  orgname=$(echo "$tmp" | cut -d'/' -f1)
  gh repo create "$tmp" --private --homepage "https://$orgname.github.io/$albumName/album?slideshow=true"
else
  username=$(echo "$tmp" | cut -d'/' -f1)
  gh repo create "$albumName" --private --homepage "https://$username.github.io/$albumName/album?slideshow=true"
  echo "Creating repository $tmp"
fi

echo "Repository created. Waiting for 15 seconds..."
sleep 15

if gh api repos/$usernameOrOrgname/$albumName &>/dev/null; then
    echo "Repository $albumName exists"
else
    echo "Repository $albumName does not exist"
    exit 11
fi

echo "Pushing to the new repo $updatedRemoteUrlNoCreds"
# Commit and push to the new repository
git add .
git commit -m "Initial commit"
git push -u origin main

echo "Pushed the new repo to remote, opening in the browser now."

# ~~

# Open the new repository in the browser
open "$updatedRemoteUrlNoCreds"
cd "../$albumName"
