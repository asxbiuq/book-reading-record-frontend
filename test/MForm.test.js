import { flushPromises, mount } from '@vue/test-utils'
import MForm from 'components/MForm.vue'

test('mount component', async () => {
  expect(MForm).toBeTruthy()

  const wrapper = mount(MForm, {
    props: {
      formLabel: '表单',
      btnName: '按钮',
    },
  })

  expect(wrapper.text()).toContain('表')
  expect(wrapper.html()).toMatchSnapshot()

  // await wrapper.get('button').trigger('click')

  // expect(wrapper.text()).toContain('4 x 3 = 12')

  // await wrapper.get('button').trigger('click')

  // expect(wrapper.text()).toContain('4 x 4 = 16')
})
