import axios from 'axios'
import { setInterceptors } from './interceptors'

function createInstance () {
  const instance = axios.create({
    baseURL: 'https://4deef9ba-f0a3-4580-b050-16b0001415d1.mock.pstmn.io' // api 서버
  })
  return setInterceptors(instance)
}

const instance = createInstance()

function registerUser (data) {
  return instance.post('users', data)
}

function loginUser (data) {
  return instance.post('users/login', data)
}

function logoutUser (data) {
  return instance.put('users/logout', data)
}

function checkUserIDorEmail (data) {
  return instance.post('check-userid-or-email', data)
}

function findPassword (data) {
  return instance.post('find-password', data)
}

function resetPassword (data) {
  return instance.put('reset-password', data)
}

function showUserCompetition () {
  return instance.get('user-competition')
}

function showUserHeatmap () {
  return instance.get('user-heatmap')
}

function getFAQ () {
  return instance.get('faqs')
}

function getAnnouncement (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('announcements', { params: params })
}

function getAnnouncementDetail (id) {
  return instance.get('announcements/' + id)
}

function getProposal (page) {
  const params = { page }
  return instance.get('proposals', { params: params })
}

function getProposalDetail (id) {
  return instance.get('proposals/' + id)
}

function createProposal (id, data) {
  return instance.post('proposals/' + id, data)
}

function editProposal (id, data) {
  return instance.patch('proposals/' + id, data)
}

function deleteProposal (id) {
  return instance.delete('proposals/' + id)
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  checkUserIDorEmail,
  findPassword,
  resetPassword,
  showUserCompetition,
  showUserHeatmap,
  getFAQ,
  getAnnouncement,
  getAnnouncementDetail,
  getProposal,
  getProposalDetail,
  createProposal,
  editProposal,
  deleteProposal
}
