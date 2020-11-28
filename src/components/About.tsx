import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { client } from "../sanity";

const BlockContent = require("@sanity/block-content-to-react");

const StyledAbout = styled.div`
  margin: 0 auto;
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;

  font-weight: 300;
  font-size: 18px;
  line-height: 1.5;

  h1,
  h2,
  h3 {
    text-align: center;
  }

  h2,
  h3 {
    margin-top: 3rem;
  }

  max-width: 680px;

  @media (max-width: 800px) {
    max-width: 360px;
  }
`;

const About = () => {
  const [config, setConfig] = useState();

  const query = `*[_type == $type][0]`;

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
          imageOptions={{ w: 550 }}
          projectId="l3m1tz9l"
          dataset="production"
        />
      ) : (
        <h2>...</h2>
      )}
    </StyledAbout>
  );
};

export default About;
