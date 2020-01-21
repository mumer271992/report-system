import React, { useState, useEffect, useContext } from 'react';

import './App.css';
import AddPlant from './components/AddPlant/AddPlant';
import PlantsList from './components/PlantsList/PlantsList';
import Datapoints from './components/Datapoints/Datapoints';
import Report from './components/Report/Report';
import AxiosHelper from './helpers/AxiosHelper';
import { store } from './store/store';
import Tabs from './components/Tabs/Tabs';

function App() {
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
      <h1 className="text-center mt-5 mb-5">3megawatt challenge</h1>
      <div className="container">
        <Tabs defaultTab="plants">
          <div label="plants" uniqueKey="plants">
            <AddPlant />
            <PlantsList />
          </div>
          <div label="datapoints" uniqueKey="datapoints">
            <Datapoints />
          </div>
          <div label="report" uniqueKey="report">
            <Report />
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
