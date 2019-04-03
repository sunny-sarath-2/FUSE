const appController = {
  checkAccess() {
    var hours = localStorage.getItem("expires_in");
    var setupTime = localStorage.getItem("setupTime");
    var now = new Date().getTime();
    if (setupTime == null || setupTime == undefined) {
      return false;
    } else {
      if (now - setupTime > (hours / 60 / 60) * 60 * 60 * 1000) {
        localStorage.clear();
        return false;
      } else {
        return true;
      }
    }
  }
};
export default appController;
