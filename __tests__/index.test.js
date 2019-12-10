import React from 'react'
import { render, mount } from 'enzyme'

import Form from '../src/index'

describe('<Form />', () => {
  it('renders three Form.Item', () => {
    const wrapper = render(<Form />)
    expect(wrapper.find('.ant-form-item')).toHaveLength(3)
  })
  it('box checked', () => {
    const wrapper = mount(<Form />)
    expect(wrapper.find('.ant-checkbox-input')).toBeChecked()
  })
})
