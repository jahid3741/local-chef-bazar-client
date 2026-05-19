import CustomerReviews from "./CustomerReviews/CustomerReviews";
import Hero from "./Hero/Hero";
import HomeMeals from "./HomeMeals/HomeMeals";

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeMeals />
      <CustomerReviews />
    </div>
  );
};

export default Home;
