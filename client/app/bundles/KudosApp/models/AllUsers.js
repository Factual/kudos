import { observable } from 'mobx'
import { get, merge } from 'lodash'

export class AllUsers {
  length;
  @observable allUsers;

  constructor(allUsers = []) {
    this.length = allUsers.length;
    this.userList = allUsers;
  }
}

export default AllUsers;