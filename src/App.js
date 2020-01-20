import React, { useState, useEffect, useContext } from 'react';

import './App.css';
import AddPlant from './components/AddPlant/AddPlant';
import PlantsList from './components/PlantsList/PlantsList';
import Datapoints from './components/Datapoints/Datapoints';
import Report from './components/Report/Report';
import AxiosHelper from './helpers/AxiosHelper';
import { store } from './store/store';

function App() {
  const [currentTab, setCurrentTab] = useState('plants');
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
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
  }, [dispatch]);

  return (
    <div className="App">
      <h1 className="text-center">3megawatt challenge</h1>
      <div className="container">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <div
              className={`nav-link ${currentTab === 'plants' ? 'active' : ''}`}
              onClick={() => setCurrentTab('plants')}
            >
              Plant
            </div>
          </li>
          <li className="nav-item">
            <div
              className={`nav-link ${
                currentTab === 'datapoints' ? 'active' : ''
              }`}
              onClick={() => setCurrentTab('datapoints')}
            >
              Datapoints
            </div>
          </li>
          <li className="nav-item">
            <div
              className={`nav-link ${currentTab === 'report' ? 'active' : ''}`}
              onClick={() => setCurrentTab('report')}
            >
              Report
            </div>
          </li>
        </ul>
        {currentTab === 'plants' && (
          <>
            <AddPlant />
            <PlantsList />
          </>
        )}
        {currentTab === 'datapoints' && <Datapoints />}
        {currentTab === 'report' && <Report />}
      </div>
    </div>
  );
}

export default App;
