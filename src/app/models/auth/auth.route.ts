import express from "express";
import { UserControllers } from "../user/user.controller";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post("/signUp", UserControllers.signUpUser);

router.post("/logIn", AuthControllers.loginUser);

router.post("/refresh-token", AuthControllers.refreshToken);

export const AuthRoutes = router;
