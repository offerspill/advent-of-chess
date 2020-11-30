const sanityClient = require("@sanity/client");

const dataset =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SANITY_DATASET_PROD
    : process.env.REACT_APP_SANITY_DATASET_LOCAL;

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_ID,
  dataset,
  useCdn: true,
});
