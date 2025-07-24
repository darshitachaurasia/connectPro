const Joi=require('joi');


const signUpValidation=Joi.object().keys({
    name:Joi.string().required().trim(),
    username:Joi.string().required().trim(),
    email:Joi.string().required().trim(),
    password:Joi.string().required().min(8),
    role:Joi.string().valid("mentor","student").required(),
});

const signInValidation=Joi.object().keys({
    email:Joi.string().required().trim(),
    password:Joi.string().required(),
})

module.exports={signInValidation,signUpValidation}