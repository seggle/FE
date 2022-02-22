import axios from 'axios'
import { setInterceptors } from './interceptors'

function createInstance (formData) {
  const instance = axios.create({
    proxy: {
      target: 'http://3.37.186.158:8000',
      changeOrigin: true
    }
  })
  return setInterceptors(instance, formData)
}

const instance = createInstance(false)
const formDataInstance = createInstance(true)

function registerUser (data) {
  return instance.post('/users/', data)
}

function loginUser (data) {
  return instance.post('/users/login/', data)
}

function logoutUser (data) {
  return instance.post('/users/logout/', data)
}

function refreshAccessToken (data) {
  return instance.post('/users/login/refresh/', data)
}

function getUserInfo (username) {
  return instance.get(`/users/${username}/`)
}

function checkUserIDorEmail (data) {
  return instance.post('check-userid-or-email/', data)
}

function findPassword (data) {
  return instance.post('users/password/', data)
}

function resetPassword (username, data) {
  return instance.patch(`users/${username}/`, data)
}

function resignUser (username, data) {
  console.log({ data })
  return instance.delete(`users/${username}/`, { data })
}

function getCompetitionList () {
  return instance.get('/competitions/')
}

function getUserCompetitionList (userID) {
  return instance.get(`/users/${userID}/competitions/`)
}

function joinCompetition (competitionID) {
  return instance.post(`/competitions/${competitionID}/participation/`)
}

function getCompetitions (competitionID) {
  return instance.get(`/competitions/${competitionID}/`)
}

function getCompetitionsLeaderboard (competitionID) {
  return instance.get('leaderboards/competition', {
    params: {
      competition_id: competitionID
    }
  })
}

function getUserSubmissions (userID, competitionID, contestProblemID) {
  return instance.get('submissions', {
    params: {
      uid: userID,
      cid: competitionID,
      cpid: contestProblemID
    }
  })
}

function selectFile (competitionID, userID, data) {
  return instance.post(`submissions/${competitionID}/${userID}/`, data)
}

function createClass (data) {
  return instance.post('/class/', data)
}

function getClass (classID) {
  return instance.get(`/class/${classID}`)
}

function editClass (data, classID) {
  return instance.patch(`/class/${classID}`, data)
}

function removeClass (classID) {
  return instance.delete(`/class/${classID}`)
}

function getClassList () {
  return instance.get('/users/class')
}

function editClassList (data) {
  return instance.patch('/users/class', data)
}

function getContestProblem (classID, contestID, contestProblemID) {
  return instance.get(
        `class/${classID}/contests/${contestID}/${contestProblemID}/`
  )
}

function getClassLeaderboard (contestProblemID) {
  return instance.get('leaderboards/contest-problem/', {
    params: {
      cp_id: contestProblemID
    }
  })
}

function getClassUserList (classID) {
  return instance.get(`/class/${classID}/users`)
}

function createContest (classID, data) {
  return instance.post(`/class/${classID}/contests`, data)
}

function editContest (classID, contestID, data) {
  return instance.patch(`/class/${classID}/contests/${contestID}`, data)
}

function getContestList (classID) {
  return instance.get(`/class/${classID}/contests`)
}

function deleteContest (classID, contestID) {
  return instance.delete(`/class/${classID}/contests/${contestID}`)
}

function getContestProblemList (classID, contestID) {
  return instance.get(`/class/${classID}/contests/${contestID}`)
}

function selectContestProblem (classID, contestID, data) {
  return instance.post(`/class/${classID}/contests/${contestID}`, data)
}

function editContestProblem (classID, contestID, data) {
  return instance.patch(`/class/${classID}/contests/${contestID}/title`, data)
}

function deleteContestProblem (classID, contestID, problemID) {
  return instance.delete(
        `/class/${classID}/contests/${contestID}/${problemID}`
  )
}

function changeContestPublic (classID, contestID) {
  return instance.patch(`/class/${classID}/contests/${contestID}/check`)
}

function getFAQList () {
  return instance.get('/admin/faqs/')
}

function deleteFAQ (faqID) {
  return instance.delete('/admin/faqs/' + faqID)
}

function editFAQ (faqID) {
  return instance.get('/admin/faqs/' + faqID)
}

function submitEditFAQ (faqID, data) {
  return instance.patch('/admin/faqs/' + faqID, data)
}

function submitFAQ (data) {
  return instance.post('/admin/faqs/', data)
}

function changeFAQSwitch (faqID) {
  const data = {
    id: faqID
  }
  return instance.post('/admin/faqs/check/', data)
}

function getAnnouncementList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/admin/announcements', { params: params })
}

function deleteAnnouncement (announcementID) {
  return instance.delete('/admin/announcements/' + announcementID)
}

function editAnnouncement (announcementID) {
  return instance.get(`/admin/announcements/${announcementID}`)
}

function submitAnnouncement (data) {
  return instance.post('/admin/announcements/', data)
}

function submitEditAnnouncement (announcementID, data) {
  return instance.put('/admin/announcements/' + announcementID, data)
}

function changeAnnouncementSwitch (announcementID, data) {
  return instance.put(`/admin/announcements/${announcementID}/check`, data)
}

function getUserList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/admin/users', { params: params })
}

function editUser (username) {
  return instance.get('/admin/users/' + username)
}

function submitUser (username, data) {
  return instance.put(`/admin/users/${username}/`, data)
}

function deleteUser (username) {
  return instance.delete(`/admin/users/${username}`)
}

function getAdminProblemList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/admin/problems', { params: params })
}

function deleteAdminProblem (problemID) {
  return instance.delete('/admin/problems/' + problemID)
}

function changeAdminProblemSwitch (problemID) {
  return instance.put('/admin/problems/check', { params: { problemID } })
}

function getAdminClassList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/admin/class', { params: params })
}

function deleteClass (classID) {
  return instance.delete('/admin/class/' + classID)
}

function showUserCompetition (username) {
  return instance.get(`/users/${username}/competitions`)
}

function showUserHeatmap (username) {
  return instance.get(`/users/${username}/contributions`)
}

function getFAQ () {
  return instance.get('/faqs')
}

function getAnnouncement (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/announcements', { params: params })
}

function getAnnouncementDetail (id) {
  return instance.get('/announcements/' + id)
}

function getProposal (page) {
  const params = { page }
  return instance.get('/proposals', { params: params })
}

function getProposalDetail (id) {
  return instance.get('/proposals/' + id)
}

function createProposal (data) {
  return instance.post('/proposals/', data)
}

function editProposal (id, data) {
  return instance.patch('/proposals/' + id, data)
}

function deleteProposal (id) {
  return instance.delete('/proposals/' + id)
}

function getProblemList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/problems', { params: params })
}

function getProblem (id) {
  return instance.get(`/problems/${id}`)
}

function editProblem (id, data) {
  return formDataInstance.put(`/problems/${id}/`, data)
}

function deleteProblem (id) {
  return instance.delete(`/problems/${id}`)
}

function changeProblemSwitch (id) {
  return instance.post(`/problems/${id}/check`)
}

function createGeneralProblem (data) {
  return instance.post('/competitions/', data)
}

function createClassProblem (data) {
  return formDataInstance.post('/problems/', data)
}

function submitClassStudentList (classID, data) {
  return instance.post(`/class/${classID}/std`, data)
}

function submitClassTAList (classID, data) {
  return instance.post(`/class/${classID}/ta`, data)
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getUserInfo,
  checkUserIDorEmail,
  findPassword,
  resetPassword,
  resignUser,
  getCompetitionList,
  getUserCompetitionList,
  joinCompetition,
  getCompetitions,
  getCompetitionsLeaderboard,
  getUserSubmissions,
  selectFile,
  createClass,
  getClass,
  editClass,
  removeClass,
  getClassList,
  submitClassStudentList,
  submitClassTAList,
  editClassList,
  getContestProblem,
  getClassLeaderboard,
  getClassUserList,
  createContest,
  editContest,
  changeContestPublic,
  getContestList,
  getContestProblemList,
  selectContestProblem,
  editContestProblem,
  deleteContestProblem,
  deleteContest,
  deleteClass,
  getAdminClassList,
  getAdminProblemList,
  changeAdminProblemSwitch,
  deleteAdminProblem,
  deleteUser,
  submitUser,
  editUser,
  getUserList,
  getFAQList,
  deleteFAQ,
  editFAQ,
  submitEditFAQ,
  submitFAQ,
  changeFAQSwitch,
  getAnnouncementList,
  deleteAnnouncement,
  editAnnouncement,
  submitEditAnnouncement,
  submitAnnouncement,
  changeAnnouncementSwitch,
  showUserCompetition,
  showUserHeatmap,
  getFAQ,
  getAnnouncement,
  getAnnouncementDetail,
  getProposal,
  getProposalDetail,
  createProposal,
  editProposal,
  deleteProposal,
  getProblemList,
  getProblem,
  editProblem,
  deleteProblem,
  changeProblemSwitch,
  createClassProblem,
  createGeneralProblem
}
