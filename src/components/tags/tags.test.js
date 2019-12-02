import React from 'react';
import Tags from '../Tags';
import {shallow} from 'enzyme'

describe('Related tag querying', () => {

  it('it generates a query for a single tag', () => {
    const wrapper = shallow(
        <Tags/>
    );
    expect(wrapper.instance().generateQuery("tagName", false)).toBe('?tags=tagName');
  });

  it('it generates a query for removing single tag', () => {
    const wrapper = shallow(
        <Tags/>
    );
    expect(wrapper.instance().generateQuery("tagName", true)).toBe('');
  });

});
