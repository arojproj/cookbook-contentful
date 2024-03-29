import React from "react";
import AboutUs from "../AboutUs/Aboutus";
import SliderImage from "./group1.jpg";
import catGif from "./mochi-cat.gif";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Helmet } from "react-helmet";

import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const contentful = require("contentful");
  const client = contentful.createClient({
    space: "3nafpp0jo6h4",
    environment: "master", // defaults to 'master' if not set
    accessToken: "hsNzkIL8Lrero_6ljmPQHYT7gn9_0sho0Akw6R7tQ_s",
  });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      client
        .getEntries()
        .then((response) => {
          setRecipes(response.items);
          setLoading(false);
        })
        .catch(console.error);
    };
    setTimeout(fetchData, 3000);
  }, []);

  return (
    <div className="container">
      {loading ? (
        <img className="cat-spinner" src={catGif} alt="Cat spinner" />
      ) : (
        <img src={SliderImage} className="img-fluid" alt="H"></img>
      )}
      <div className="row">
        <div className="col col-md-9">
          <hr />

          <h3>Welcome!</h3>
          <p>
            Welcome to our recipe website! We are excited to share our love of
            cooking with you. Our site is full of delicious and easy-to-follow
            recipes for every occasion. Whether you're a seasoned chef or just
            starting out in the kitchen, we have something for everyone. In our
            recipe collection, you'll find a wide variety of dishes to choose
            from, including appetizers, main courses, sides, and desserts. We
            have recipes for all types of dietary restrictions and preferences,
            including vegetarian, vegan, gluten-free, and low-carb options. Not
            sure what to make? Check out our featured recipes section for some
            inspiration. You can also search for recipes by ingredient, cuisine,
            or occasion. We hope you enjoy exploring our site and trying out our
            recipes. Happy cooking!
          </p>
          <div className="row">
            <div class="hr-sect">
              <h3>Our Top Rated Recipes</h3>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            {recipes?.map((recipe) => {
              if (recipe.fields.recipeRating === 5) {
                return (
                  <div className="col col-md-4">
                    <img
                      className="image margin-bottom1"
                      src={recipe.fields.recipeImages[0].fields.file.url}
                    ></img>
                    <p>{recipe.fields.recipeTitle}</p>

                    <span className="ratingstars">
                      {Array(5)
                        .fill()
                        .map((_, i) => {
                          const ratingValue = i + 1;
                          if (ratingValue <= recipe.fields?.recipeRating) {
                            return <span key={i}>★</span>;
                          } else {
                            return <span key={i}>☆</span>;
                          }
                        })}
                    </span>
                    <br />

                    <Link to={`/recipes/${recipe.sys.id}`}>
                      <button type="button" className="btn btn-dark">
                        Learn more
                      </button>
                    </Link>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <AboutUs />
      </div>
      <Helmet>
        <title>Home - Easy Peasy</title>
        <meta name="Home - Easy Peasy" content="Home - Easy Peasy" />
      </Helmet>
    </div>
  );
}

export default Home;
