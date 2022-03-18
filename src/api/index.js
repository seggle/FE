import axios from 'axios'
import { setInterceptors } from './interceptors'

function createInstance (formData) {
  const instance = axios.create({
    proxy: {
      target: 'http://15.165.30.200:8000',
      changeOrigin: true
    }
  })
  return setInterceptors(instance, formData)
}

const instance = createInstance(false)
const formDataInstance = createInstance(true)

function registerUser (data) {
  return instance.post('/api/users/', data)
}

function loginUser (data) {
  return instance.post('/api/users/login/', data)
}

function logoutUser (data) {
  return instance.post('/api/users/logout/', data)
}

function refreshAccessToken (data) {
  return instance.post('/api/users/login/refresh/', data)
}

function getUserInfo (username) {
  return instance.get(`/api/users/${username}/`)
}

function checkUserIDorEmail (data) {
  return instance.post('/api/check-userid-or-email/', data)
}

function findPassword (data) {
  return instance.post('/api/users/password/', data)
}

function resetPassword (username, data) {
  return instance.patch(`/api/users/${username}/`, data)
}

function resignUser (username, data) {
  return instance.delete(`/api/users/${username}/`, { data })
}

function getCompetitionList () {
  return instance.get('/api/competitions/')
}

function getUserCompetitionList (userID) {
  return instance.get(`/api/users/${userID}/competitions/`)
}

function joinCompetition (competitionID) {
  return instance.post(`/api/competitions/${competitionID}/participation/`)
}

function getCompetitions (competitionID) {
  return instance.get(`/api/competitions/${competitionID}/`)
}

function deleteCompetition (competitionID) {
  return instance.delete(`/api/competitions/${competitionID}/`)
}

function getCompetitionTAList (competitionID) {
  return instance.get(`/api/competitions/${competitionID}/participation`)
}

function submitCompetitionTAList (competitionID, data) {
  return instance.post(
        `/api/competitions/${competitionID}/participation/ta`,
        data
  )
}

function getCompetitionsLeaderboard (competitionID) {
  return instance.get(`/api/leaderboards/competitions/${competitionID}`)
}

function getUserProblemSubmissions (page, username, contestProblemID) {
  return instance.get('/api/submissions/', {
    params: {
      page: page,
      username: username,
      cpid: contestProblemID
    }
  })
}

function getUserCompetitionSubmissions (competitionID, username) {
  return instance.get(`/api/competitions/${competitionID}/submissions`, {
    params: {
      username: username
    }
  })
}

function selectProblemSubmission (classID, contestID, cpID, data) {
  return instance.patch(
        `/api/class/${classID}/contests/${contestID}/${cpID}/check`,
        data
  )
}

function selectCompetitionSubmission (competitionID, data) {
  return instance.patch(`/api/competitions/${competitionID}/check`, data)
}

function createClass (data) {
  return instance.post('/api/class/', data)
}

function getClass (classID) {
  return instance.get(`/api/class/${classID}`)
}

function editClass (data, classID) {
  return instance.patch(`/api/class/${classID}`, data)
}

function removeClass (classID) {
  return instance.delete(`/api/class/${classID}`)
}

function getClassList () {
  return instance.get('/api/users/class')
}

function editClassList (data) {
  return instance.patch('/api/users/class', data)
}

function getContestProblem (classID, contestID, contestProblemID) {
  return instance.get(
        `/api/class/${classID}/contests/${contestID}/${contestProblemID}`
  )
}

function getClassLeaderboard (contestProblemID) {
  return instance.get(`/api/leaderboards/contest-problem/${contestProblemID}`)
}

function getClassUserList (classID) {
  return instance.get(`/api/class/${classID}/users`)
}

function createContest (classID, data) {
  return instance.post(`/api/class/${classID}/contests`, data)
}

function editContest (classID, contestID, data) {
  return instance.patch(`/api/class/${classID}/contests/${contestID}`, data)
}

function getContestList (classID) {
  return instance.get(`/api/class/${classID}/contests`)
}

function deleteContest (classID, contestID) {
  return instance.delete(`/api/class/${classID}/contests/${contestID}`)
}

function getContestProblemList (classID, contestID) {
  return instance.get(`/api/class/${classID}/contests/${contestID}`)
}

function selectContestProblem (classID, contestID, data) {
  return instance.post(`/api/class/${classID}/contests/${contestID}`, data)
}

function editContestProblem (classID, contestID, data) {
  return instance.patch(
        `/api/class/${classID}/contests/${contestID}/description`,
        data
  )
}

function deleteContestProblem (classID, contestID, problemID) {
  return instance.delete(
        `/api/class/${classID}/contests/${contestID}/${problemID}`
  )
}

function changeContestPublic (classID, contestID) {
  return instance.patch(`/api/class/${classID}/contests/${contestID}/check`)
}

function getFAQList () {
  return instance.get('/api/admin/faqs/')
}

function deleteFAQ (faqID) {
  return instance.delete('/api/admin/faqs/' + faqID)
}

function editFAQ (faqID) {
  return instance.get('/api/admin/faqs/' + faqID)
}

function submitEditFAQ (faqID, data) {
  return instance.patch('/api/admin/faqs/' + faqID, data)
}

function submitFAQ (data) {
  return instance.post('/api/admin/faqs/', data)
}

function changeFAQSwitch (faqID) {
  const data = {
    id: faqID
  }
  return instance.post('/api/admin/faqs/check/', data)
}

function getAnnouncementList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/api/admin/announcements/', { params: params })
}

function deleteAnnouncement (announcementID) {
  return instance.delete('/api/admin/announcements/' + announcementID)
}

function editAnnouncement (announcementID) {
  return instance.get(`/api/admin/announcements/${announcementID}`)
}

function submitAnnouncement (data) {
  return instance.post('/api/admin/announcements/', data)
}

function submitEditAnnouncement (announcementID, data) {
  return instance.put('/api/admin/announcements/' + announcementID, data)
}

function changeAnnouncementSwitch (announcementID, data) {
  return instance.put(`/api/admin/announcements/${announcementID}/check`, data)
}

function getUserList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/api/admin/users/', { params: params })
}

function editUser (username) {
  return instance.get('/api/admin/users/' + username)
}

function submitUser (username, data) {
  return instance.put(`/api/admin/users/${username}/`, data)
}

function deleteUser (username) {
  return instance.delete(`/api/admin/users/${username}`)
}

function getAdminProblemList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/api/admin/problems', { params: params })
}

function deleteAdminProblem (problemID) {
  return instance.delete(`/api/admin/problems/${problemID}`)
}

function changeAdminProblemSwitch (problemID) {
  return instance.put('/api/admin/problems/check', { params: { problemID } })
}

function getAdminClassList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/api/admin/class', { params: params })
}

function deleteClass (classID) {
  return instance.delete('/api/admin/class/' + classID)
}

function showUserCompetition (username) {
  return instance.get(`/api/users/${username}/competitions`)
}

function showUserHeatmap (username) {
  return instance.get(`/api/users/${username}/contributions`)
}

function getFAQ () {
  return instance.get('/api/faqs')
}

function getAnnouncement (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/api/announcements', { params: params })
}

function getAnnouncementDetail (id) {
  return instance.get('/api/announcements/' + id)
}

function getProposal (page) {
  const params = { page }
  return instance.get('/api/proposals', { params: params })
}

function getProposalDetail (id) {
  return instance.get('/api/proposals/' + id)
}

function createProposal (data) {
  return instance.post('/api/proposals/', data)
}

function editProposal (id, data) {
  return instance.patch('/api/proposals/' + id, data)
}

function deleteProposal (id) {
  return instance.delete('/api/proposals/' + id)
}

function getProblemList (page, keyword) {
  const params = { page }
  if (keyword) {
    params.keyword = keyword
  }
  return instance.get('/api/problems', { params: params })
}

function getProblem (id) {
  return instance.get(`/api/problems/${id}/`)
}

function editProblem (id, data) {
  return formDataInstance.put(`/api/problems/${id}/`, data)
}

function deleteProblem (id) {
  return instance.delete(`/api/problems/${id}`)
}

function changeProblemSwitch (id) {
  return instance.post(`/api/problems/${id}/check`)
}

function submitFileProblem (classID, contestID, cpID, username, data) {
  return formDataInstance.post(
        `/api/class/${classID}/contests/${contestID}/${cpID}/${username}`,
        data
  )
}

function submitFileCompetition (competitionID, username, data) {
  return formDataInstance.post(
        `/api/competitions/${competitionID}/${username}/`,
        data
  )
}

function createGeneralProblem (data) {
  return instance.post('/api/competitions/', data)
}

function editGeneralProblem (competitionID, data) {
  return instance.put(`/api/competitions/${competitionID}/`, data)
}

function createClassProblem (data) {
  return formDataInstance.post('/api/problems/', data)
}

function submitClassStudentList (classID, data) {
  return instance.post(`/api/class/${classID}/std`, data)
}

function submitClassTAList (classID, data) {
  return instance.post(`/api/class/${classID}/ta`, data)
}

function examStart (classID, contestID) {
  return instance.post(`/api/class/${classID}/contests/${contestID}/exam/`)
}

function examInfo (classID, contestID, page) {
  const params = { page }
  return instance.get(`/api/class/${classID}/contests/${contestID}/exam`, {
    params: params
  })
}

function resetExam (classID, contestID, examID) {
  return instance.post(
        `/api/class/${classID}/contests/${contestID}/exam/${examID}/reset`
  )
}

function exceptUser (classID, contestID, examID) {
  return instance.post(
        `/api/class/${classID}/contests/${contestID}/exam/${examID}/exception`
  )
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
  deleteCompetition,
  getCompetitionTAList,
  submitCompetitionTAList,
  getCompetitionsLeaderboard,
  getUserProblemSubmissions,
  getUserCompetitionSubmissions,
  selectProblemSubmission,
  selectCompetitionSubmission,
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
  submitFileCompetition,
  submitFileProblem,
  createClassProblem,
  createGeneralProblem,
  examStart,
  examInfo,
  resetExam,
  exceptUser,
  editGeneralProblem
}
