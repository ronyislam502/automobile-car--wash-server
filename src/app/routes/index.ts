import { Router } from "express";
import { ServiceRoutes } from "../models/service/service.route";
import { SlotRoutes } from "../models/slot/slot.route";
import { UserRoutes } from "../models/user/user.route";
import { BookingRoutes } from "../models/booking/booking.route";
import { ReviewRoutes } from "../models/review/review.route";
import { AuthRoutes } from "../models/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
