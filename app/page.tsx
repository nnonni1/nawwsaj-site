import SiteClient from "./site-client";
export default function Home(){
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://www.nawwsaj.com/#organization", name: "Nawwsaj Innovation Lab", alternateName: "نوسج", url: "https://www.nawwsaj.com/", logo: "https://www.nawwsaj.com/logo.png", email: "info@nawwsaj.com", address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" } },
      { "@type": "WebSite", "@id": "https://www.nawwsaj.com/#website", url: "https://www.nawwsaj.com/", name: "Nawwsaj Innovation Lab", inLanguage: "ar", publisher: { "@id": "https://www.nawwsaj.com/#organization" } },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteClient/></>;
}
