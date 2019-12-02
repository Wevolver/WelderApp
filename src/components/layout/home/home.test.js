import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  const wrapper = shallow(
      <Home />
  );
});
