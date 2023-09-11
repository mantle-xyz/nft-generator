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

Move generated images and metadata to output folder [optional]

```sh
npm run format
```

Replace dna to token id in `image` attribute for each json file in output/metadata folder [optional]

```sh
npm run replacer
```

Move the images to the folder that is named as the outfit name [optional]

```sh
npm run folderer
```

Upload image and metadata files to S3

```sh
npm run upload
```

Upload traits images to S3

```sh
npm run upload_traits
```

After executing these commands, all images and JSON metadata files will be available in the output folder. You can zip this folder and conveniently send it to your preferred storage, such as Google Drive.

### Workflow for Citizen of Mantle

1. Copy the source images to `data` folder by batch - we categorized using skin type and with rare hair or not

2. Generate images:

```sh
npm run generate
```

3. Rewrite uid of each metadata file with dna values (reason: we will shuffle and assign token id later)

```sh
npm run rewrite-uid
```

4. Rename metadata file using dna value

```sh
npm run rename-metadata
```

5. Filter (YELLOW GLOVE should only match SPACESUIT but not other outfits)

```sh
npm run filter-yellow-glove
```

6. Pick a specific number of images after filtering
