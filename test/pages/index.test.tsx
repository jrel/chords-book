import React from 'react'
import { render } from '../testUtils'
import Index from '../../pages/index'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Index categories={[]} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
