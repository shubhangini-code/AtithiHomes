import express from "express";
import {
  getProperties,
  getProperty,
} from "../controllers/propertyController.js";

//creates a separate router to manage all the peoperty related Apiroutes
const propertyRouter = express.Router(); //express.Router();   ...creates a mini router

propertyRouter.route("/").get(getProperties);
propertyRouter.route("/:id").get(getProperty);

export { propertyRouter };
