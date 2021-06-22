import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { IsLogin } from "../store/reducers/userSlice";
const LoginGoogle = () => {
  const [loginAuth, setLoginAuth] = useState(false);
  const history = useHistory();
  console.log(loginAuth);
  const responseGoogle = (response) => {};
  const dispatch = useDispatch();
  return (
    <div className="container-google">
      <div class="form-login">
        <img src="http://www.androidpolice.com/wp-content/themes/ap2/ap_resize/ap_resize.php?src=http%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fnexus2cee_Search-Thumb-150x150.png&w=150&h=150&zc=3" />
        <span>Click To Login Google</span>
        <GoogleLogin
          clientId="690263197250-njicc6kr5d85a6104lpbs5k1bmjar7ue.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={(responseGoogle) => {
            setLoginAuth(true);
            dispatch(IsLogin({ ...responseGoogle.profileObj, login: true }));
            alert("Login Seccesfull");
            history.push("/");
          }}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          className="button-login"
        />
        <div>
          <a href="https://www.google.com/" target="_blank">
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginGoogle;
