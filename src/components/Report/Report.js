/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { store } from '../../store/store';

import api from '../../api/index';
import { validateForm } from '../../helpers/utility';
import Graaph from '../Graph/Graph';
import Loader from '../Loader/Loader';

const Report = () => {
  const globalState = useContext(store);
  const { plants } = globalState.state;
  const initialDataPoint = {
    plant_id: '',
    type: 'energy',
    date: ''
  };
  const [dataPoint, setDataPoint] = useState(initialDataPoint);
  const [reportData, setReportData] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    setDataPoint({
      ...dataPoint,
      [name]: value
    });
    if (name === 'plant_id') {
      setReportData([]);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    const validateFields = validateForm(dataPoint, ['plant_id', 'date']);
    if (!validateFields.isValid) {
      setErrors(validateFields.errors);
      return;
    }
    setLoading(true);
    api.datapoints
      .report({
        plant_id: dataPoint.plant_id,
        date: dataPoint.date
      })
      .then(resp => {
        setLoading(false);
        if (resp && resp.length) {
          setReportData(resp);
          setMessage('');
        } else {
          setMessage('No data found.');
        }
      })
      .catch(() => {
        setLoading(false);
        setMessage('No data found.');
      });
  };

  return (
    <React.Fragment>
      <div className="card mt-1">
        <div className="card-header">Report</div>
        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Select Plant</label>
              <select
                name="plant_id"
                data-test="plant_id"
                className="form-control"
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
              <label>Select type</label>
              <select
                name="type"
                data-test="type"
                className="form-control"
                value={dataPoint.type}
                onChange={changeHandler}
              >
                <option value="energy">Energy</option>
                <option value="irradiation">IRradiation</option>
              </select>
            </div>
            <div className="form-group">
              <label>Select month</label>
              <input
                type="date"
                name="date"
                data-test="date"
                className="form-control"
                placeholder="Select from date"
                value={dataPoint.date}
                onChange={changeHandler}
              />
              {errors && errors.date && <span>{errors.date.message}</span>}
            </div>
            <button
              type="submit"
              data-test="report_btn"
              className="btn btn-primary"
              disabled={
                !dataPoint ||
                !dataPoint.plant_id ||
                dataPoint.plant_id === '' ||
                !dataPoint.date
              }
            >
              Report
            </button>
          </form>
        </div>
        {loading && <Loader />}
      </div>
      {!loading && reportData && reportData.length > 0 ? (
        <Graaph type={dataPoint.type} data={reportData} />
      ) : (
        <div>{message}</div>
      )}
    </React.Fragment>
  );
};

export default Report;
