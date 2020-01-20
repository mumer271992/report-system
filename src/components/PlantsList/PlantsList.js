import React, { useContext, useEffect } from 'react';
import { store } from '../../store/store';
import AxiosHelper from '../../helpers/AxiosHelper';

const PlantsList = () => {
  const globalState = useContext(store);
  const {
    state: { plants },
    dispatch
  } = globalState;

  const deleteHandler = uid => {
    AxiosHelper.delete(`/plants/${uid}`)
      .then(() => {
        dispatch({ type: 'REMOVE_PLANT', plant_uuid: uid });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (plants && plants.length === 0) {
      AxiosHelper.get('/plants')
        .then(resp => {
          if (resp && resp.results) {
            dispatch({
              type: 'Add_PLANTS_LIST',
              plants: resp.results
            });
          }
        })
        .catch(error => console.log(error));
    }
  }, [dispatch, plants]);

  return (
    <div className="card mt-1">
      <div className="card-header">Plants List</div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center p-2">
          <div style={{ width: '40%' }}>
            {' '}
            <b>UID</b>
          </div>
          <div style={{ width: '40%' }}>
            <b>Name</b>
          </div>
          <div style={{ width: '20%' }}>
            <b>Actions</b>
          </div>
        </div>
        {plants && plants.length ? (
          plants.map(item => (
            <div
              data-test="list-item"
              key={item.uid}
              className="d-flex justify-content-between align-items-center p-2 border-top"
            >
              <div style={{ width: '40%' }}>{item.uid}</div>
              <div style={{ width: '40%' }}>{item.name}</div>
              <div style={{ width: '20%' }}>
                <button
                  data-test="delete-plant-btn"
                  className="btn btn-danger"
                  onClick={() => deleteHandler(item.uid)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No Data found</div>
        )}
      </div>
    </div>
  );
};

export default PlantsList;
