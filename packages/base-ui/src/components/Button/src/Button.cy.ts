import { mount } from '@cypress/vue'
import Button from './Button.vue'
import { cy } from 'local-cypress'

describe('BaseButton', () => {
  it('should show content', () => {
    const content = 'foo'

    mount(Button, {
      slots: {
        default: content
      }
    })

    cy.contains('foo')
  })
})
