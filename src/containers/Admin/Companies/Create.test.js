import ClientForm from './ClientForm';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import React from "react";

describe('<Create />', () => {
  it('Create Client testing', () => {
    const wrapper = mount(<ClientForm/>);
    const form = wrapper.find('form#clientForm');
    wrapper.find('input[name="name"]').simulate('change', {target: {value: 'David'}});
    wrapper.find('input[name="location"]').simulate('change', {target: {value: 'David'}});
    form.simulate('submit');
  });
});
