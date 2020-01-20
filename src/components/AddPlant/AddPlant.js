/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useContext } from 'react';
import { store } from '../../store/store';
import AxiosHelper from '../../helpers/AxiosHelper';
import { validateForm } from '../../helpers/utility';

const AddPlant = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [plant, setPlant] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const inputChangeHandler = e => {
    setErrors({});
    setPlant({ name: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    const validateFormFields = validateForm(plant, ['name']);
    if (!validateFormFields.isValid) {
      setErrors(validateFormFields.errors);
      return;
    }
    AxiosHelper.post('/plants', plant)
      .then(resp => {
        if (resp && resp.uid) {
          dispatch({
            type: 'ADD_PLANT',
            plant: resp
          });
          setPlant({ name: '' });
          setSuccessMessage('Plant added');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="card mt-1">
      <div className="card-header">Add New Plant</div>
      <div className="card-body">
        <form data-test="add-plant-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label>Plant Name</label>
            <input
              data-test="plant-name"
              className="form-control"
              placeholder="Plant Name"
              name="plant-name"
              value={plant.name}
              onChange={inputChangeHandler}
            />
            {errors && errors.name && (
              <div data-test="danger-alert" className="alert alert-danger mt-1">
                {errors.name.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            data-test="add-plant-btn"
            className="btn btn-primary"
          >
            Add Plant
          </button>
          {successMessage && (
            <div data-test="success-alert" className="alert alert-success mt-1">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPlant;
