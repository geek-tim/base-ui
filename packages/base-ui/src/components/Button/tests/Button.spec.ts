import Button from '../src/Button.vue'
import { mount } from '@vue/test-utils'

function add(a: number, b: number): number {
  return a + b;
}

describe("add function", () => {
  it('create', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' },
    })
    expect(wrapper.classes()).toContain('el-button--primary')
  })
});
