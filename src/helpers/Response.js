export default class {
  saveSuccess(message = "Successfully Saved") {
    return {status: true, message}
  }

  getDataSuccess(data, message = "Success") {
    return {status: true, data, message}
  }
}