import React, { useState } from 'react';
import './App.css';
import SettingsContext from './Components/Settings/SettingContext';
import Settings from './Components/Settings/Settings';
import Timer from './Components/Timer/Timer';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [breakMinutes , setBreakMinutes] = useState(0) 

  return (
    <div className="App">
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          workMinutes,
          setWorkMinutes,
          breakMinutes,
          setBreakMinutes
        }}
      >
        { showSettings ?  <Settings /> :<Timer /> }
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
