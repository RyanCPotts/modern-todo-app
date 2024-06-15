import React from 'react';

import SettingsForm from './Context/SettingsForm';

import { MantineProvider } from '@mantine/core';

import SettingsProvider from './Context/Settings'

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Todo from './Components/Todo';

import '@mantine/core/styles.css';

import './site.scss';

import Header from './Components/Header';

const App = () =>{
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <SettingsProvider>
        <BrowserRouter>
          <Header/>
          {/* <Todo /> */}
          <Routes>
            <Route path = '/' element = {<Todo/>}/>
            <Route path = '/settings' element = {<SettingsForm/>}/>
        </Routes>
      </BrowserRouter>
      </SettingsProvider>
      </MantineProvider>
    );
  }

export default App
