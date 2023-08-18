const fs = require("fs");
const path = require("path");
const util = require("util");

const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);

async function getNftsWithMatchingAttributes(directory, combinations) {
  const matchedNftIds = [];

  const files = await readDir(directory);
  const jsonFiles = files.filter((file) => path.extname(file) === ".json");

  for (const file of jsonFiles) {
    const data = fs.readFileSync(path.join(directory, file), "utf8");
    const nft = JSON.parse(data);

    const hasMatchingAttributes = combinations.some((combination) => {
      const hasAttribute1 = nft.attributes.some(
        (attr) =>
          attr.trait_type === combination.trait1 &&
          attr.value === combination.value1
      );
      const hasAttribute2 = nft.attributes.some(
        (attr) =>
          attr.trait_type === combination.trait2 &&
          attr.value === combination.value2
      );
      return hasAttribute1 && hasAttribute2;
    });

    if (hasMatchingAttributes) {
      matchedNftIds.push(nft.uid);
    }
  }

  return matchedNftIds;
}

// Usage
const combinations = [
  {
    trait1: "OUTFIT",
    value1: "VEST",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "VEST",
    trait2: "HAND",
    value2: "MECHANIC HAND",
  },

  {
    trait1: "OUTFIT",
    value1: "VEST",
    trait2: "HAND",
    value2: "YELLOW GLOVE",
  },
  {
    trait1: "OUTFIT",
    value1: "VEST",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "VEST",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "MUSCLEFLEX",
    trait2: "HAND",
    value2: "MECHANIC HAND",
  },
  {
    trait1: "OUTFIT",
    value1: "MUSCLEFLEX",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "MUSCLEFLEX",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "STUDDED JACKET",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "STUDDED JACKET",
    trait2: "HAND",
    value2: "YELLOW GLOVE",
  },
  {
    trait1: "OUTFIT",
    value1: "STUDDED JACKET",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "JERSEY",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "JERSEY",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "JERSEY",
    trait2: "HAND",
    value2: "YELLOW GLOVE",
  },
  {
    trait1: "OUTFIT",
    value1: "SUIT",
    trait2: "HAND",
    value2: "YELLOW GLOVE",
  },
  {
    trait1: "OUTFIT",
    value1: "SUIT",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "SUIT",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "PURPLE JACKET",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "PURPLE JACKET",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "VERDANT ATTIRE",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "VERDANT ATTIRE",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "SQUAMISH JACKET",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "SQUAMISH JACKET",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "SQUAMISH JACKET",
    trait2: "HAND",
    value2: "BRACELET HAND",
  },
  {
    trait1: "OUTFIT",
    value1: "NAUTICAL JACKET",
    trait2: "HAND",
    value2: "YELLOW GLOVE",
  },
  {
    trait1: "OUTFIT",
    value1: "NAUTICAL JACKET",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "NAUTICAL JACKET",
    trait2: "HAIR",
    value2: "RED PONYTAIL",
  },
  {
    trait1: "OUTFIT",
    value1: "SAMURAI GEAR",
    trait2: "HAIR",
    value2: "PINK HAIR",
  },
  {
    trait1: "OUTFIT",
    value1: "SPACESUIT",
    trait2: "HAND",
    value2: "ROCK HAND",
  },
  {
    trait1: "OUTFIT",
    value1: "SPACESUIT",
    trait2: "HAND",
    value2: "BRACELET HAND",
  },
  {
    trait1: "OUTFIT",
    value1: "MECHANOSHIELD",
    trait2: "HAND",
    value2: "BRACELET HAND",
  },
  {
    trait1: "OUTFIT",
    value1: "MECHANOSHIELD",
    trait2: "HAND",
    value2: "ROCK HAND",
  },
  {
    trait1: "OUTFIT",
    value1: "MECHANOSHIELD",
    trait2: "HAND",
    value2: "YELLOW GLOVE",
  },
  {
    trait1: "OUTFIT",
    value1: "SHADOWSTEEL",
    trait2: "HAND",
    value2: "YELLOW GLOVE",
  },
  {
    trait1: "OUTFIT",
    value1: "LUMINA JACKET",
    trait2: "HAND",
    value2: "YELLOW GLOVE",
  },
];

getNftsWithMatchingAttributes("./output/metadata", combinations)
  .then((ids) => writeFile("./output/incompatible.json", JSON.stringify(ids)))
  .catch((err) => console.error(err));
