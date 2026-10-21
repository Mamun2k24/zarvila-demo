import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

import HeroSlider from "../../components/HomeHero/HeroSlider";
import HomeMarqueeBar from "../../../src/components/ui/HomeMarqueeBar";
import ProductCategory from "../productCategory/ProductCategory";
import MenCollection from "../../components/ui/MenCollection";

const WomenCollection = lazy(() =>
  import("../../components/ui/WomenCollection")
);
const KidCollection = lazy(() => import("../../components/ui/KidCollection"));
const AccessoriesCollection = lazy(() =>
  import("../../components/ui/AccessoriesCollection")
);
const FeaturesBar = lazy(() => import("../../components/FeaturesBar"));
const OurBrands = lazy(() => import("../../components/OurBrands"));
const RecentlyViewed = lazy(() =>
  import("../../components/RecentlyViewed")
);

const SectionLoader = () => (
  <div className="py-8 text-center text-sm text-gray-500">Loading...</div>
);

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>ZARVILA | Premium Fashion & Lifestyle Brand</title>

        <meta
          name="description"
          content="ZARVILA is a premium fashion and lifestyle brand in Bangladesh, offering stylish clothing, collections, and accessories for men, women, and kids."
        />

        <meta
          name="keywords"
          content="ZARVILA, Zarvila Lifestyle, Zarvila Bangladesh, fashion brand Bangladesh, clothing store Dhaka, men fashion, women fashion, kids fashion, accessories"
        />

        <link rel="canonical" href="https://zarvilalifestyle.com/" />

        <meta property="og:title" content="ZARVILA" />
        <meta property="og:site_name" content="ZARVILA" />
        <meta
          property="og:description"
          content="Premium fashion and lifestyle brand in Bangladesh."
        />
        <meta property="og:url" content="https://zarvilalifestyle.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ZARVILA" />
        <meta
          name="twitter:description"
          content="Premium fashion and lifestyle brand in Bangladesh."
        />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ZARVILA",
              "alternateName": "Zarvila Lifestyle",
              "url": "https://zarvilalifestyle.com/"
            }
          `}
        </script>
      </Helmet>

      <h1 className="hidden text-lg md:text-3xl font-bold text-center mt-4 text-blue-500">
        ZARVILA - Your Trusted Online Store
      </h1>

      <HeroSlider />
      <HomeMarqueeBar />
      <ProductCategory />
      <MenCollection />

      <Suspense fallback={<SectionLoader />}>
        <WomenCollection />
        <KidCollection />
        <AccessoriesCollection />
        <FeaturesBar />
        <div className="mt-7">
          <OurBrands />
        </div>
        <RecentlyViewed />
      </Suspense>
    </div>
  );
};

export default Home;