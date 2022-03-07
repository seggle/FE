import { shallowMount } from '@vue/test-utils'
import Login from '@/views/users/Login.vue'

describe('Login', () => {
  it('로그인폼 있어요', () => {
    const wrapper = shallowMount(Login)
    const idForm = wrapper.get('.id-form')

    expect(idForm.exists()).toBeTruthy()
  })
})
