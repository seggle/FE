import axios from 'axios'
import { setInterceptors } from './interceptors'

function createInstance () {
  const instance = axios.create({
    baseURL: 'https://efca6327-0540-445e-91df-2230fa4c20a4.mock.pstmn.io' // api 서버
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

function getUserInfo (username) {
  return instance.get(`users/${username}`)
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

function getCompetitionList () {
  return instance.get('/competitions')
}

function getUserCompetitionList (userID) {
  return instance.get(`/users/${userID}/competitions`)
}

function joinCompetition (competitionID) {
  return instance.post(`competitions/${competitionID}/user-engage`)
}

function getCompetitions (competitionID) {
  return instance.get('competitions', {
    params: {
      competition_id: competitionID
    }
  })
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
  return instance.post(`submissions/${competitionID}/${userID}`, data)
}

function createClass (data) {
  return instance.post('/class', data)
}

function getClassList (userID) {
  return instance.get(`users/${userID}/class`)
}

function editClassList (userID, data) {
  return instance.patch(`users/${userID}/class`, data)
}

function getClassProblem (classID, contestID, contestProblemID) {
  return instance.get(`class/${classID}/contests/${contestID}/${contestProblemID}`)
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

export default {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  checkUserIDorEmail,
  findPassword,
  resetPassword,
  getCompetitionList,
  getUserCompetitionList,
  joinCompetition,
  getCompetitions,
  getCompetitionsLeaderboard,
  getUserSubmissions,
  selectFile,
  createClass,
  getClassList,
  editClassList,
  getClassProblem,
  getClassLeaderboard,
  getClassUserList
}
