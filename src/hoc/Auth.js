const MainAuth = {
    isAuth: false,
    authenticate(cb) {
      this.isAuth = true;
      cb();
    },
  };
  
  export default MainAuth;