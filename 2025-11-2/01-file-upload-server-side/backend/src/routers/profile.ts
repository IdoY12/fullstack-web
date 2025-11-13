import { Router } from "express";
import { createPost, deletePost, getPost, getProfile, updatePost } from "../controllers/profile/controller";
import validation from "../middlewares/validation";
import { getPostValidator, newPostImageValidator, newPostValidator, updatePostValidator } from "../controllers/profile/validator";
import fileValidation from "../middlewares/file-validation";
import fileUploader from "../middlewares/file-uploader";

const router = Router()

router.get('/', getProfile)
router.get('/:id', validation(getPostValidator, 'params'), getPost)
router.delete('/:id', deletePost)
router.post('/', 
    validation(newPostValidator), 
    fileValidation(newPostImageValidator), 
    fileUploader, 
    createPost
)
router.patch('/:id', validation(getPostValidator, 'params'), validation(updatePostValidator, 'body'), updatePost)


export default router