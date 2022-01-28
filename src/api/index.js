import axios from 'axios'
import { setInterceptors } from './interceptors'

function createInstance () {
  const instance = axios.create({
    baseURL: 'https://91079725-6adf-4682-a6b2-dea7ebb71c08.mock.pstmn.io' // api 서버
  })
  return setInterceptors(instance)
}

const instance = createInstance()

function getFAQList () {
  return instance.get('admin/faqs')
}

function deleteFAQ (faqID) {
  return instance.delete('admin/faqs', { params: faqID })
}

function editFAQ (faqID) {
  return instance.get('admin/faqs', { params: faqID })
}

function submitEditFAQ (data) {
  return instance.put('admin/faqs', { data })
}

function submitFAQ (data) {
  return instance.post('admin/faqs', { data })
}

function changeFAQSwitch (faqID) {
  return instance.put('admin/faqs/check', { params: faqID })
}

function getAnnouncementList (offset, limit, keyword) {
  const params = { offset, limit }
  if (keyword) {
    params.keyword = keyword
  }
  console.log(params)
  return instance.get('admin/announcements', { params: params })
}

function deleteAnnouncement (announcementID) {
  return instance.delete('admin/announcements/' + announcementID)
}

function editAnnouncement (announcementID) {
  return instance.get('admin/announcements/' + announcementID)
}

function submitAnnouncement (data) {
  return instance.post('admin/announcements', { data })
}

function submitEditAnnouncement (announcementID, data) {
  return instance.put('admin/announcements/' + announcementID, { data })
}

function changeAnnouncementSwitch (announcementID, data) {
  return instance.put('admin/announcements/' + announcementID + '/check', { data })
}

function getUserList (page, size, keyword) {
  return instance.get('admin/users', { params: page, size, keyword })
}

function editUser (userID) {
  return instance.get('admin/users/' + userID)
}

function submitUser (userID, data) {
  return instance.put('admin/users/' + userID, { data })
}

export default { submitUser, editUser, getUserList, getFAQList, deleteFAQ, editFAQ, submitEditFAQ, submitFAQ, changeFAQSwitch, getAnnouncementList, deleteAnnouncement, editAnnouncement, submitEditAnnouncement, submitAnnouncement, changeAnnouncementSwitch }
