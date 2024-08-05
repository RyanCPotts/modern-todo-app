import React from 'react';
import SettingsForm from './Context/SettingsForm';
import { MantineProvider } from '@mantine/core';
import SettingsProvider from './Context/Settings';
import LoginProvider from './Components/Auth/context';
import Login from './Components/Auth/login';
import Auth from './Components/Auth/auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from './Components/Todo';
import './site.scss';
// import Header from './Components/Header';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <LoginProvider>
        <SettingsProvider>
          <BrowserRouter>
            <Login />
            <Routes>
              <Route path='/' element={<Todo />} />
              <Route path='/settings' element={<SettingsForm />} />
            </Routes>
            <Auth><div>any user can see this</div></Auth>
          </BrowserRouter>
        </SettingsProvider>
      </LoginProvider>
    </MantineProvider>
  );
};

export default App;
