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

function checkUserIDorEmail (data) {
  return instance.post('check-userid-or-email', data)
}

function findPassword (data) {
  return instance.post('find-password', data)
}

function resetPassword (data) {
  return instance.put('reset-password', data)
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

function getUserSubmissions (userID, competitionID) {
  return instance.get('submissions', {
    params: {
      uid: userID,
      cid: competitionID
    }
  })
}

function submitFile (competitionID, userID, data) {
  return instance.post(`submissions/${competitionID}/${userID}`, data)
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  checkUserIDorEmail,
  findPassword,
  resetPassword,
  getUserCompetitionList,
  joinCompetition,
  getCompetitions,
  getCompetitionsLeaderboard,
  getUserSubmissions,
  submitFile
}
