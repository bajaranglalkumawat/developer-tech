import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  noindex?: boolean;
  image?: string;
  type?: "website" | "article";
  schema?: Record<string, unknown>;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  noindex = false,
  image = "https://developertech.in/og-image.jpg",
  type = "website",
  schema,
}: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large"} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {canonical && <link rel="canonical" href={canonical} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={canonical ?? "https://developertech.in/"} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
  </Helmet>
);

export default SEO;
