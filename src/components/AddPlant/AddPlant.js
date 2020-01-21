/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useContext } from 'react';
import { store } from '../../store/store';
import api from '../../api/index';
import { validateForm } from '../../helpers/utility';
import Loader from '../Loader/Loader';

const AddPlant = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [plant, setPlant] = useState({ name: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const inputChangeHandler = e => {
    setErrors({});
    setPlant({ name: e.target.value });
    const validateFormFields = validateForm({ name: e.target.value }, ['name']);
    if (!validateFormFields.isValid) {
      setErrors(validateFormFields.errors);
    }
  };

  const notify = msg => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  const submitHandler = e => {
    e.preventDefault();
    const validateFormFields = validateForm(plant, ['name']);
    if (!validateFormFields.isValid) {
      setErrors(validateFormFields.errors);
      return;
    }
    setLoading(true);
    setIsError(false);
    api.plants
      .add(plant)
      .then(resp => {
        setLoading(false);
        if (resp && resp.uid) {
          dispatch({
            type: 'ADD_PLANT',
            plant: resp
          });
          setPlant({ name: '' });
          notify('Plant added');
        }
      })
      .catch(() => {
        setLoading(false);
        setIsError(true);
        notify('Sometthing wennt wrong!');
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
          {message && (
            <div
              data-test="success-alert"
              className={`alert alert-${isError ? 'danger' : 'success'} mt-1`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default AddPlant;
