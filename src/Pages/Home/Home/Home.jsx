import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../Works/HowItWorks";
import Survice from "../../../Components/Survice/Survice";
import CompaniName from "../../../Components/Compani/CompaniName";
import Saport from "../../../Components/Saport/Saport";
import Revews from "../Revews/Revews";

const revewsDataJson = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="w-11/12 mx-auto mt-4 mb-4">
      <main>
        {" "}
        <Banner></Banner>
      </main>
      <section>
        <HowItWorks></HowItWorks>
      </section>
      <section>
        <Survice></Survice>
      </section>
      <section>
        <CompaniName></CompaniName>
      </section>
      <section>
        <Saport></Saport>
      </section>
      <section>
        <Revews revewsDataJson={revewsDataJson}></Revews>
      </section>
    </div>
  );
};

export default Home;
