import AskButtons from "@/components/ui/Homepage/AskButtons";
import CTA from "@/components/ui/Homepage/CTA";
import Discover from "@/components/ui/Homepage/Discover";
import Hero from "@/components/ui/Homepage/Hero";
import Info from "@/components/ui/Homepage/Info";
import PopularRoutes from "@/components/ui/Homepage/PopularRoutes";
import Priorities from "@/components/ui/Homepage/Priorities";
import Stats from "@/components/ui/Homepage/Stats";
import SearchField from "@/components/ui/SearchField";
import styles from "@/components/ui/Homepage/home.module.css";

const Home = () => {
  const searchParams = {
    startingPoint: "",
    endPoint: "",
    startDate: "",
  };

  return (
    <>
      <Hero />

      <div className={styles.searchWrap}>
        <div className="hh-container">
          <div className={styles.searchCard}>
            <div className={styles.searchHead}>
              <div>
                <h3>Find your bus</h3>
                <p>Search live routes and book in seconds.</p>
              </div>
            </div>
            <SearchField searchParams={searchParams} compact />
          </div>
        </div>
      </div>

      <Stats />
      <Priorities />
      <Discover />
      <PopularRoutes />
      <Info />
      <AskButtons />
      <CTA />
    </>
  );
};

export default Home;
