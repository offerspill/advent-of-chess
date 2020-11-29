const sanityClient = require("@sanity/client");

export const client = sanityClient({
  projectId: "l3m1tz9l",
  dataset: "production",
  useCdn: true,
});
