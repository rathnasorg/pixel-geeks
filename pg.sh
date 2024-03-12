#!/bin/sh

# prompt for an album name
echo "Enter album name: "
read tmpAlbumName
albumName="PG${tmpAlbumName//[^[:alnum:]]/}"
echo "Album name (clensed): $albumName"

# Prompt for confirmation to proceed
echo "Proceed with the above album name? (Y/n)"
read proceed
if [ "$proceed" = "n" ]; then
  echo "Exiting..."
  exit 1
fi

# Proceed only if git config user.name and user.email are set
if [ -z "$(git config user.name)" ]; then
  echo "git config user.name is not set. Exiting..."
  exit 1
fi
if [ -z "$(git config user.email)" ]; then
  echo "git config user.email is not set. Exiting..."
  exit 1
fi



# ~~

# rename to $albumName (prefix with PG and only alphanumeric characters)
mv ../pixel-geeks ../$albumName

# Replace all pixel-geeks in the album with $albumName
sed -i '' -e "s/pixel-geeks/$albumName/g" package.json
sed -i '' -e "s/pixel-geeks/$tmpAlbumName/g" ./public/index.html
sed -i '' -e "s/pixel-geeks/$tmpAlbumName/g" ./setup/digest.js



# ~~

# prompt for a directory where the photos are located
echo "Enter directory where photos are located: "
read dir

# Proceed only if the directory exists
if [ ! -d "$dir" ]; then
  echo "Directory does not exist. Exiting..."
  exit 1
fi

# copy all the photos from $dir to ./setup/input
rm -rf ./setup/input && mkdir -p ./setup/input
cp $dir/* ./setup/input

# Proceed only if ./setup/input is not empty
if [ ! "$(ls -A ./setup/input)" ]; then
  echo "No photos found in setup/input. Exiting..."
  exit 1
fi

# ~~ 

# Optimize images and cleanup
npm i && node ./setup/digest.js
rm -rf ./setup/input && mkdir -p ./setup/input
rm -rf ./public/photos/raw && mkdir -p ./public/photos/raw



# ~~

# Extract the remote url from git remote -v and replace pixel-geens with $albumName
remoteUrl=$(git remote -v | grep origin | grep fetch | awk '{print $2}')
updatedRemoteUrl=$(echo "$remoteUrl" | sed "s/pixel-geeks/$albumName/g")
echo -e "Updated remote repo url from: $remoteUrl to: $updatedRemoteUrl"
git remote set-url origin $updatedRemoteUrl


# Commit and push to the new repository
git config user.name
git config user.email
git add .
git commit -m "Initial commit"
git push -u origin main



# ~~

# Remove username and token from $updatedRemoteUrl
updatedRemoteUrlNoCreds=$(echo "$updatedRemoteUrl" | sed "s/https:\/\/.*@/https:\/\//")

# Open the new repository in the browser
open "$updatedRemoteUrlNoCreds"