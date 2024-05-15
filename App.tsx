import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { store } from './src/store';
import { Provider } from 'react-redux';

// Containers
import Home from './src/containers/Home';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </Provider>
  );
};

export default App;