// recieve the user info
// validate the require info
//send info the our ai trip planner
//calculate the budget per night
//search Mongodb for suitable properties
//send both Ai trip plan + matching properties back to the frontend / user

import { Property } from "../models/propertyModel.js";
import { planTrip } from "../ai/tripPlanner.js";
import { generateDescription } from "../ai/generateDescription.js";

// const cleanCity = (text) => text.toLowerCase().replaceAll(" ", "");

const cleanCity = (text) => text.trim();

const createTripPlan = async (req, res) => {
  try {
    console.log("TRIP CONTROLLER CALLED");
    console.log("BODY:", req.body);

    const { destination, budget, days, people, interests } = req.body;

    if (!destination || !budget || !days || !people || !interests) {
      return res.status(400).json({
        status: "fail",
        message:
          "Missing required fields- destination budget,days,people, interests",
      });
    }

    const plan = await planTrip({
      destination,
      budget,
      days,
      people,
      interests: interests || [],
    });

    const perNight = Number(budget) / Number(days);

    const city = cleanCity(destination);

    console.log("Destination:", destination);
    console.log("City:", city);
    console.log("Per night:", perNight);
    console.log("People:", people);

    // const properties = await Property.find({
    //   $or: [
    //     { "address.city": { $regex: city, $options: "i" } },
    //     { "address.area": { $regex: city, $options: "i" } },
    //     { "address.state": { $regex: city, $options: "i" } },
    //   ],
    //   price: { $lte: perNight },
    //   maximumGuests: { $gte: Number(people) },
    // }).limit(6);

    // const properties = await Property.find({
    //   $or: [
    //     { "address.city": { $regex: city, $options: "i" } },
    //     { "address.area": { $regex: city, $options: "i" } },
    //     { "address.state": { $regex: city, $options: "i" } },
    //   ],
    //   price: { $lte: perNight },
    //   maximumGuests: { $gte: Number(people) },
    // }).limit(6);

    // console.log("Properties found:", properties.length);
    // console.log("Properties:", properties);
    const properties = await Property.find({
      $or: [
        { "address.city": { $regex: city, $options: "i" } },
        { "address.area": { $regex: city, $options: "i" } },
        { "address.state": { $regex: city, $options: "i" } },
      ],
    }).limit(6);

    console.log("Location properties:", properties.length);
    console.log("Properties:", properties);

    res.status(200).json({
      status: "success",
      data: {
        plan,
        properties,
        perNight,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "could not create trip plan, please try again ",
    });
  }
};

const writeDescription = async (req, res) => {
  try {
    const description = await generateDescription(req.body);
    res.status(200).json({ status: "success", data: { description } });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "could not generate description, please try again ",
    });
  }
};

export { createTripPlan, writeDescription };
