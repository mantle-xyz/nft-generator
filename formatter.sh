#!/bin/bash

# Remove the output/images folder
rm -rf ./output/images

# Move and rename the cache/temp folder to output/images
mv ./cache/temp ./output/images

# Rename the output/erc721 metadata folder to output/metadata
mv ./output/erc721\ metadata ./output/metadata
