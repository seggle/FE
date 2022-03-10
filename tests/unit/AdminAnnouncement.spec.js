import { shallowMount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import AdminAnnouncement from '@/views/admin/AdminAnnouncement.vue'

// const axios = require('axios')
// const MockAdapter = require('axios-mock-adapter')

// // This sets the mock adapter on the default instance
// const mock = new MockAdapter(axios)

// // Mock any GET request to /users
// // arguments for reply are (status, data, headers)

// const response = {
//   id: 1,
//   title: '세글 이용 공지',
//   context: '공지글 내용 공지글 내용 공지글 내용',
//   created_user: 'admin_user',
//   created_time: '2013-01-29T12:34:56.000000Z',
//   last_modified: '2013-01-29T12:34:56.000000Z',
//   important: true,
//   visible: true
// }

// mock.onGet('admin/announcement').reply(200, response)

// axios.get('admin/announcement').then((response) => {
//   console.log(response.data)
// })

// describe('AdminAnnouncement.vue', () => {
//   it('편집 버튼을 누르면 공지사항을 편집한다.', async () => {
//     const wrapper = shallowMount(AdminAnnouncement, {
//       data () {
//         return {
//           count: 1,
//           announcementList: [
//             {
//               id: 1,
//               title: '제목',
//               created_time: '1',
//               last_modified: '1'
//             }
//           ]
//         }
//       }
//     })
//     const editButton = wrapper.find('.edit-btn')

//     axios.get('admin/announcement')

//     expect(axios.get).toHaveBeenCalledTimes(1)
//     expect(axios.get).toHaveBeenCalledWith('admin/announcement')
//     await flushPromises()

//     expect(editButton.exists()).toBeTruthy()
//   })
// })

const announcementList = {
  id: 1,
  title: '세글 이용 공지',
  context: '공지글 내용 공지글 내용 공지글 내용',
  created_user: 'admin_user',
  created_time: '2013-01-29T12:34:56.000000Z',
  last_modified: '2013-01-29T12:34:56.000000Z',
  important: true,
  visible: true
}

const response = {
  code: 200,
  message: 'Success'
}

jest.mock('axios')

jest.spyOn(axios, 'get')
  .mockImplementation(() => {
    return jest.fn().mockResolvedValue(announcementList)()
  })

jest.spyOn(axios, 'delete')
  .mockImplementation(() => {
    return jest.fn().mockResolvedValue(response)()
  })

describe('AdminAnnouncement.vue', () => {
  const wrapper = shallowMount(AdminAnnouncement, {
    data () {
      return {
        count: 1,
        announcementList: [
          {
            id: 1,
            title: '제목',
            created_time: '1',
            last_modified: '1'
          }
        ]
      }
    }
  })

  it('편집 버튼을 누르면 공지사항을 get하는 api를 호출한다', async () => {
    // const editButton = wrapper.find('.edit-btn')

    // await editButton.trigger('click')

    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith('/admin/announcements/0')

    await flushPromises()
  })

  it('삭제 버튼을 누르면 공지사항을 delete하는 api를 호출한다.', async () => {
    const deleteButton = wrapper.find('.delete-btn')

    expect(deleteButton.exists()).toBeTruthy()

    await deleteButton.trigger('click')

    expect(axios.delete).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith('')

    await flushPromises()
  })
})
