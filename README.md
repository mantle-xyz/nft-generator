# Image Batch Generation

This repository contains scripts and instructions for generating batches of images with customizable traits. The process involves storing traits data, generating images, and organizing the output. Follow the steps below to get started.

## Installation

1. Install Node.js:
   If Node.js is not installed on your machine, you can download it from [nodejs.org](https://nodejs.org/).

2. Clone this repository:

   ```sh
   git clone https://github.com/your-username/your-repo.git
   ```

   Install dependencies:

   ```sh
   npm install
   ```

   Datasets Storage
   Use the datasets-storage folder to store datasets, which are batches of traits used for generating images.

## Data Folder

Store the traits that will generate the next batch of images in the data folder. Make sure to replace the traits inside this folder for each new generation.

The naming convention for each trait folder should be as follows:

- Layer 1: trait\_\_z1
- Layer 2: trait\_\_z2
- Layer 3: trait\_\_z3

The \_\_z followed by the layer number represents the desired layer for that trait.

## Configuration

Before you start generating images, you can configure various settings using the .env file. Create a .env file in the root directory of your project and define the following variables:

DATASET=mantle

START_INDEX=0

END_INDEX=500

IMAGE_URI_PREFIX=journey.mantle.xyz/nft/citizensofmantle?id=

NAME_PREFIX=Citizen of Mantle

DESCRIPTION=Citizens of Mantle collection

HEIGHT=3000

WIDTH=3000

## Generating Images

Once you are set up and ready to generate a batch of images, follow these steps:

Generate images:

```sh
npm run generate
```

```sh
npm run format
```

```sh
npm run replacer
```

```sh
npm run folderer
```

After executing these commands, all images and JSON metadata files will be available in the output folder. You can zip this folder and conveniently send it to your preferred storage, such as Google Drive.
