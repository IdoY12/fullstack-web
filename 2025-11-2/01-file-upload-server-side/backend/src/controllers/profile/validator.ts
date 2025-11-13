import Joi from "joi";

export const newPostValidator = Joi.object({
    title: Joi.string().min(10).max(40).required(),
    body: Joi.string().min(20).required()
})

export const updatePostValidator = newPostValidator

export const getPostValidator = Joi.object({
    id: Joi.string().uuid()
})

export const newPostImageValidator = Joi.object({      // <-- i expected to get obj called 'image' and hes an obj
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/webp')
    }).unknown(true).optional()
})