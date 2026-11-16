import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = ({ title, description }) => {
  const location = useLocation();
  
  // Updated to the Super Value domain[cite: 13]
  const siteUrl = "https://gosupervalue.com"; 
  
  // Auto-generates the full canonical URL[cite: 13]
  const canonicalUrl = `${siteUrl}${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph (Social Media & AI Link Previews) tags[cite: 13] */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEO;