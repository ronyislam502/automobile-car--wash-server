import express from "express";
import { ServiceControllers } from "./service.controller";

const router = express.Router();

router.post("/create-service", ServiceControllers.createService);

router.get("/", ServiceControllers.getAllServices);

router.get("/service/:id", ServiceControllers.getSingleService);

router.put("/update/:id", ServiceControllers.updateService);

router.delete("/delete/:id", ServiceControllers.deleteService);

export const ServiceRoutes = router;
