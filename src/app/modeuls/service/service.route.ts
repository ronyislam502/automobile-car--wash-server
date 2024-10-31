import express from "express";
import { ServiceControllers } from "./service.controller";

const router = express.Router();

router.post("/", ServiceControllers.createService);

router.get("/", ServiceControllers.getAllServices);

router.get("/:id", ServiceControllers.getSingleService);

router.put("/:id", ServiceControllers.updateService);

router.delete("/:id", ServiceControllers.deleteService);

export const ServiceRoutes = router;
