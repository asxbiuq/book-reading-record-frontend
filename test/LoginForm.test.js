import { flushPromises, mount } from '@vue/test-utils'
import LoginForm from '@/pages/login/components/LoginForm.vue'

test('LoginForm', async () => {
  expect(LoginForm).toBeTruthy()

  const wrapper = mount(LoginForm, {
    // props: {
    //   formLabel: '表单',
    //   btnName: '按钮',
    // },
  })

  // expect(wrapper.text()).toContain('表')
  expect(wrapper.html()).toMatchSnapshot()

  // await wrapper.get('button').trigger('click')

  // expect(wrapper.text()).toContain('4 x 3 = 12')

  // await wrapper.get('button').trigger('click')

  // expect(wrapper.text()).toContain('4 x 4 = 16')
})
