import { Router } from "express";
import { createPost, deletePost, getPost, getProfile, updatePost } from "../controllers/profile/controller";
import validation from "../middlewares/validation";
import { getPostValidator, newPostValidator, updatePostValidator } from "../controllers/profile/validator";

const router = Router()

router.get('/', getProfile)
router.get('/:id', validation(getPostValidator, 'params'), getPost)
router.delete('/:id', deletePost)
router.post('/', validation(newPostValidator), createPost)
router.patch('/:id', validation(getPostValidator, 'params'), validation(updatePostValidator, 'body'), updatePost)


export default router