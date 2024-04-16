#!/bin/sh
# Add more photos to an existing album

# ~~

# prompt for a directory where the photos are located
echo "eg: /Users/username/Downloads/20240205_SomeoneBdayU"
read -e -p "Enter directory where photos are located: " dir

# Proceed only if the directory exists
if [ ! -d "$dir" ]; then
  echo "Directory "$dir" does not exist. Exiting..."
  exit 1
fi

# Proceed only if $dir is not empty
if [ ! "$(ls -A $dir)" ]; then
  echo "No photos found in $dir. Exiting..."
  exit 2
fi


# ~~ 

# Optimize images and cleanup
(cd ./setup; npm i; npm run start)
rm -rf ./setup/input && mkdir -p ./setup/input
rm -rf ./public/photos/raw && mkdir -p ./public/photos/raw


# Proceed only if ./public/photos/optimized is not empty
if [ ! "$(ls -A ./public/photos/optimized)" ]; then
  echo "No photos found in ./public/photos/optimized. Exiting..."
  exit 3
fi

git add .
git commit -m "Add new photos"
git push
