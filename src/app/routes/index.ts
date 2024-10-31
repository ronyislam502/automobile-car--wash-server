import { Router } from "express";
import { ServiceRoutes } from "../models/service/service.route";
import { SlotRoutes } from "../models/slot/slot.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
