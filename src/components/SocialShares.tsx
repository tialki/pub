import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faWeibo,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const socials = {
  twitter: {
    logo: <FontAwesomeIcon icon={faTwitter} />,
    urlBuilder: ({ url, text }) =>
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
  },
  facebook: {
    logo: <FontAwesomeIcon icon={faFacebook} />,
    urlBuilder: ({ url, text }) =>
      `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${text}`,
  },
  email: {
    logo: <FontAwesomeIcon icon={faEnvelope} />,
    urlBuilder: ({ url, text }) => `mailto:?subject=${text}&body=${url}`,
  },
  linkedin: {
    logo: <FontAwesomeIcon icon={faLinkedin} />,
    urlBuilder: ({ url, text }) =>
      `https://www.linkedin.com/shareArticle?url=${url}&title=${text}`,
  },
  whatsapp: {
    logo: <FontAwesomeIcon icon={faWhatsapp} />,
    urlBuilder: ({ url, text }) => `whatsapp://send?text=${text} ${url}`,
  },
  weibo: {
    logo: <FontAwesomeIcon icon={faWeibo} />,
    urlBuilder: ({ url, text }) =>
      `https://service.weibo.com/share/share.php?url=${url}&title=${text}`,
  },
};

export default function SocialShares({ url, title }) {
  const { siteConfig } = useDocusaurusContext();
  console.log(siteConfig.customFields.socialShares, siteConfig.url);
  return (
    <div style={{ display: "flex" }}>
      {(siteConfig.customFields.socialShares as string[])
        .map((key) => socials[key])
        .filter((item) => item)
        .map((item, index) => (
          <div key={index} style={{ marginRight: "8px" }}>
            <a
              href={item.urlBuilder({
                url: `${siteConfig.url}${url}`,
                text: title,
              })}
            >
              {item.logo}
            </a>
          </div>
        ))}
    </div>
  );
}
