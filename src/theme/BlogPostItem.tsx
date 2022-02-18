import React, { useEffect, useRef } from "react";
import OriginalBlogPostItem from "@theme-original/BlogPostItem";
import { useColorMode } from "@docusaurus/theme-common";
import SocialShares from "../components/SocialShares";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const utterancesSelector = "iframe.utterances-frame";

function BlogPostItem(props) {
  return (
    <>
      <OriginalBlogPostItem {...props} />
      <SocialShares
        url={props.metadata.permalink}
        title={props.metadata.title}
      />
      {props.isBlogPostPage && <Utterances />}
    </>
  );
}

interface UtterancesProps {
  repo: string;
  issueTerm: string;
  label: string;
  theme: string;
}

function Utterances() {
  const { isDarkTheme } = useColorMode();
  const utterancesTheme = isDarkTheme ? "github-dark" : "github-light";
  const containerRef = useRef(null);
  const { siteConfig } = useDocusaurusContext();
  const {
    utterances: {
      repo = "owner/repo",
      issueTerm = "pathname",
      label = "comment",
      theme = "preferred-color-scheme",
    },
  } = siteConfig.customFields as {
    utterances: UtterancesProps;
  };

  useEffect(() => {
    const utterancesEl = containerRef.current.querySelector(utterancesSelector);

    const createUtterancesEl = () => {
      const script = document.createElement("script");

      script.src = "https://utteranc.es/client.js";
      script.setAttribute("repo", repo);
      script.setAttribute("issue-term", issueTerm);
      script.setAttribute("label", label);
      script.setAttribute("theme", theme);
      script.crossOrigin = "anonymous";
      script.async = true;

      containerRef.current.appendChild(script);
    };

    const postThemeMessage = () => {
      const message = {
        type: "set-theme",
        theme: utterancesTheme,
      };

      utterancesEl.contentWindow.postMessage(message, "https://utteranc.es");
    };

    utterancesEl ? postThemeMessage() : createUtterancesEl();
  }, [utterancesTheme]);

  return <div ref={containerRef} />;
}

export default BlogPostItem;
