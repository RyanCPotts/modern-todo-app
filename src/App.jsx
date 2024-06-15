import React from 'react';

import { MantineProvider } from '@mantine/core';

import SettingsProvider from './Context/Settings';

import Todo from './Components/Todo';

import '@mantine/core/styles.css';

import './site.scss';

const App = () =>{
    return (
      <SettingsProvider>
        <MantineProvider>
          <Todo />
        </MantineProvider>
      </SettingsProvider>
    );
  }

export default App
