import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { client } from "../../sanity";
import { StyledAbout } from "./AboutElements";

const BlockContent = require("@sanity/block-content-to-react");

const About = () => {
  const [config, setConfig] = useState();

  const query = `*[_type == $type][0]`;

  const dataset =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SANITY_DATASET_PROD
      : process.env.REACT_APP_SANITY_DATASET_LOCAL;

  useEffect(() => {
    const fetchPosts = () => {
      client
        .fetch(query, { type: "config" })
        .then((res: any) => {
          setConfig(res);
        })
        .catch((err: Error) => {
          console.log("err", err);
          console.error("Oh no, error occured: ", err);
        });
    };
    fetchPosts();
  }, []);

  return (
    <StyledAbout>
      {config ? (
        <BlockContent
          blocks={config.about}
          imageOptions={{ w: 900 }}
          projectId={process.env.REACT_APP_SANITY_ID}
          dataset={dataset}
        />
      ) : (
        <h2>...</h2>
      )}
    </StyledAbout>
  );
};

export default About;
