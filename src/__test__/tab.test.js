import React, { Component } from 'react';
import Tab from "../components/Tab";
import renderer from 'react-test-renderer';

/* Jest snapshot test for testing the rendering of the Tab component */
describe('Tab', () => {
  it('renders', () => {
    const component = renderer.create(<Tab />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
