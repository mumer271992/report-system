export const validateForm = (targetObj, requiredFields) => {
  const errors = {};
  let isValid = true;
  requiredFields.forEach(field => {
    if (!targetObj[field]) {
      isValid = false;
      errors[field] = {
        message: `${field} is required!`
      };
    }
  });
  return {
    isValid,
    errors
  };
};
