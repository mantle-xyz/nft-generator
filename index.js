require("dotenv").config();

const {
  ArtEngine,
  inputs,
  generators,
  renderers,
  exporters,
} = require("@hashlips-lab/art-engine");

const BASE_PATH = __dirname;

const ae = new ArtEngine({
  cachePath: `${BASE_PATH}/cache`,
  outputPath: `${BASE_PATH}/output`,

  inputs: {
    mantle: new inputs.ImageLayersInput({
      assetsBasePath: `${BASE_PATH}/data`,
    }),
  },

  generators: [
    new generators.ImageLayersAttributesGenerator({
      dataSet: process.env.DATASET,
      startIndex: process.env.START_INDEX,
      endIndex: process.env.END_INDEX,
    }),
  ],

  renderers: [
    new renderers.ItemAttributesRenderer({
      name: (itemUid) => `${process.env.NAME_PREFIX} ${itemUid}`,
      description: (attributes) => process.env.DESCRIPTION,
    }),
    new renderers.ImageLayersRenderer({
      width: 3000,
      height: 3000,
    }),
  ],

  exporters: [
    new exporters.ImagesExporter(),
    new exporters.Erc721MetadataExporter({
      imageUriPrefix: process.env.IMAGE_URI_PREFIX,
    }),
  ],
});

ae.run();
