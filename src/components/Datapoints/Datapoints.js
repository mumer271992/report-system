/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useContext, useState } from 'react';
import { store } from '../../store/store';
import api from '../../api/index';
import { validateForm } from '../../helpers/utility';
import Loader from '../Loader/Loader';

const Datapoints = () => {
  const globalState = useContext(store);
  const { plants } = globalState.state;
  const initialDataPoint = {
    plant_id: '',
    from_date: '',
    to_date: ''
  };
  const [dataPoint, setDataPoint] = useState(initialDataPoint);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setDataPoint({
      ...dataPoint,
      [name]: value
    });
  };

  const showMessage = msg => {
    setMessage(msg);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const updateServerData = e => {
    e.preventDefault();
    const validateFields = validateForm(dataPoint, [
      'plant_id',
      'from_date',
      'to_date'
    ]);
    if (!validateFields.isValid) {
      setErrors(validateFields.errors);
      return;
    }
    setLoading(true);
    setIsError(false);
    api.datapoints
      .update(dataPoint)
      .then(resp => {
        setLoading(false);
        if (resp && resp.ok) {
          showMessage('Data points updated from monitoring service.');
        }
      })
      .catch(() => {
        setLoading(false);
        setIsError(true);
        showMessage('Something went wrong!');
      });
  };

  return (
    <React.Fragment>
      <div className="card mt-1">
        <div className="card-header">Fetch Data Points</div>
        <div className="card-body">
          <form onSubmit={updateServerData}>
            <div className="form-group">
              <label>Select Plant</label>
              <select
                className="form-control"
                name="plant_id"
                data-test="select_plant"
                value={dataPoint.plant_id}
                onChange={changeHandler}
              >
                <option value="">Select plant</option>
                {plants &&
                  plants.map(item => (
                    <option key={item.uid} value={item.uid}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {errors && errors.plant_id && (
                <span>{errors.plant_id.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>From date</label>
              <input
                type="date"
                name="from_date"
                data-test="from_date"
                className="form-control"
                placeholder="Select from date"
                value={dataPoint.from_date}
                onChange={changeHandler}
              />
              {errors && errors.from_date && (
                <span>{errors.from_date.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>To date</label>
              <input
                type="date"
                name="to_date"
                data-test="to_date"
                className="form-control"
                placeholder="Select to date"
                value={dataPoint.to_date}
                onChange={changeHandler}
              />
              {errors && errors.to_date && (
                <span>{errors.to_date.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              data-test="update_btn"
              disabled={
                !dataPoint ||
                !dataPoint.plant_id ||
                dataPoint.plant_id === '' ||
                !dataPoint.from_date ||
                !dataPoint.to_date
              }
            >
              Update server data
            </button>
          </form>
          {message && message !== '' && (
            <div
              className={`alert alert-${isError ? 'danger' : 'success'} mt-2`}
            >
              {message}
            </div>
          )}
        </div>
        {loading && <Loader />}
      </div>
    </React.Fragment>
  );
};

export default Datapoints;
