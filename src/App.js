import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import MainPage from './pages/mainPage';

export default () =>
  <ThemeProvider theme={theme}>
    <MainPage />
  </ThemeProvider>
