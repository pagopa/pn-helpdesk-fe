import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivateRoute from '../PrivateRoute';
import { createMemoryHistory } from 'history';
import { Router, Route, Routes } from 'react-router-dom';


it('returns', () => {
  const history = createMemoryHistory ({ initialEntries: ["/Private"] });
    const PrivateComponent = () => <>Private!</>
    render(
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/private" element={<PrivateRoute condition="token"><PrivateComponent /></PrivateRoute>}/>
          </Routes>
        </Router>
    );
    expect(screen.queryByText("Private!")).not.toBeInTheDocument();
});

