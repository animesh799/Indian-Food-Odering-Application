import classes from "./AvailableMeals.module.css";
import MealItem from "../MealItem/MealItem";
// const { initializeApp } = require('firebase-admin/app');

import Card from "../UI/Card";

import { useState, useEffect } from "react";


// 283889224745-2ba74s6pfb61aikv120i3ihdig3j0frg.apps.googleusercontent.com


// const myRefreshToken = '283889224745-2ba74s6pfb61aikv120i3ihdig3j0frg.apps.googleusercontent.com'; // Get refresh token from OAuth2 flow

// initializeApp({
//   credential: refreshToken(myRefreshToken),
//   databaseURL: 'https://foodapp-3e2ba-default-rtdb.firebaseio.com/'
// });

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        // https://foodapp-3e2ba-default-rtdb.firebaseio.com/
        "https://foodapp-3e2ba-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong!!!");
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };
    fetchData().catch((error) => {
      setLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return <p className={classes.MealsLoading}>Loading...</p>;
  }

  if (error) {
    return <p className={classes.MealsError}>{error}</p>;
  }

  const mealItems = meals.map((item) => (
    <MealItem
      name={item.name}
      price={item.price}
      description={item.description}
      key={item.id}
      id={item.id}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealItems}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
