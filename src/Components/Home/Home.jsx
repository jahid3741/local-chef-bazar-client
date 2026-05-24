import CustomerReviews from "./CustomerReviews/CustomerReviews";
import Hero from "./Hero/Hero";
import HomeMeals from "./HomeMeals/HomeMeals";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeMeals />
      <CustomerReviews />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
