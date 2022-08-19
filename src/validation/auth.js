import joi from "joi";

export const ValidateSignup = (userData) => {
    const Schema = joi.object(
        {
            fullName: joi.string().min(5).max(30),
            email: joi.email().required(),
            password: joi.string(),
            phoneNumber: joi.number().required().min(10).max(10),
            address: joi.array().
            items(
                joi.object({ details: joi.string(), for: joi.string() }))
        }
    );
    return Schema.validateAsync(userData);

}

export const ValidateSignin = (userData) => {
    const Schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
  
    return Schema.validateAsync(userData);
  };