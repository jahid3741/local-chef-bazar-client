import Hero from "./Hero/Hero";
import HomeMeals from "./HomeMeals/HomeMeals";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

import CustomerReviews from "./CustomerReviews/CustomerReviews";
import FeaturedChefs from "./FeaturedChefs/FeaturedChefs";
import Faq from "./Faq/Faq"; 

import HowItWorks from "./HowItWorks/HowItWorks";
import Newsletter from "./Newsletter/NewsLetter";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Hero />
      <HomeMeals />
      <HowItWorks />
      <WhyChooseUs />
      <FeaturedChefs />
      <CustomerReviews />
      <Faq />
      <Newsletter />
    </div>
  );
};

export default Home;
