import { takeLatest, put, delay, fork, all, call } from "redux-saga/effects";
import {receiveUsers, addUser} from '../store/actions';

// function addUserCall() {
//   return axios({
//     method: "post",
//     url: "https://dog.ceo/api/breeds/image/random"
//   }, {user});
// }

function* addNewUser({user}) {
    // console.log(user);
    // const user = yield call(addUserCall, user)
    yield put(addUser(user));
}

function getUsersFunction() {
  return fetch(`https://jsonplaceholder.typicode.com/users`)
  .then(response => response.json())
  .then(json => json);
}

function* getUsers() {
  const usersList = yield call(getUsersFunction);
  yield put(receiveUsers(usersList));
}

function* watcherUserAction() {     //// watching for actions which are going to store
    yield takeLatest('ADD_USER_START', addNewUser);
    yield takeLatest('GET_USERS', getUsers);
}

function* rootUser() {
    yield all([
      fork(watcherUserAction)
  ]);
}
  
  export default rootUser;