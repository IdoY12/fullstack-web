import { Router } from "express";
import { follow, getFollowers, getFollowing, unfollow } from "../controllers/follows/controller";
import { followValidator, unfollowValidator } from "../controllers/follows/validator";
import validation from "../middlewares/validation";

const router = Router()

router.get('/following', getFollowing)
router.get('/followers', getFollowers)
router.post('/follow/:id', validation(followValidator, 'params'), follow)
router.post('/unfollow/:id', validation(unfollowValidator, 'params'), unfollow)

export default router