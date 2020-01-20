import { validateForm } from './utility';

describe('Utility functions test', () => {
  it('should validate if all required fields are available', () => {
    const targetObj = {
      first_name: 'first name',
      last_name: 'last name'
    };
    const requiredFields = ['first_name', 'last_name'];
    const formValidation = validateForm(targetObj, requiredFields);
    expect(formValidation.isValid).toBe(true);
    const errorKeys = Object.keys(formValidation.errors);
    expect(errorKeys.length).toBe(0);
  });
  it('should not validate if any required field is missing or empty', () => {
    const targetObj = {
      first_name: 'first name'
    };
    const requiredFields = ['first_name', 'last_name'];
    const formValidation = validateForm(targetObj, requiredFields);
    expect(formValidation.isValid).toBe(false);
    const errorKeys = Object.keys(formValidation.errors);
    expect(errorKeys.length).toBe(1);
  });
});
