import "./LoginPage.css";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRef, useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { Toast } from "primereact/toast";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameStatus, setUserNameStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const toast = useRef(null);

  async function verify(userName, password) {
    if (!userName) {
      setUserNameStatus("Email is Required");
    } else if (!/\S+@\S+\.\S+/.test(userName)) {
      setUserNameStatus("Invalid Email Format");
    } else {
      setUserNameStatus("");
    }
    if (!password) {
      setPasswordStatus("Enter the password");
    } else {
      setPasswordStatus("");
    }

    if (setUserNameStatus && setPasswordStatus) {
      try {
        // event.preventDefault();
        const encrypt = (data) => {
          console.log(data, "data");
          console.log("this is data");
          const key = CryptoJS.enc.Utf8.parse("acaiaalthi0001uu"); // 16, 24, or 32 bytes key
          const iv = CryptoJS.enc.Utf8.parse("qwertyuioplkjhgf"); // 16 bytes IV
          const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
          return encrypted.toString();
        };
        const encryptedEmail = encrypt(userName);
        const encryptedPassword = encrypt(password);
        const response = await axios.post(`http://10.228.1.81:8087/sign_in`, {
          emailId: encryptedEmail,
          password: encryptedPassword,
        });
        const accessToken = response.data.access_token;
        sessionStorage.setItem("access_token", accessToken);
        const refreshToken = response.data.refresh_token;
        sessionStorage.setItem("refresh_token", refreshToken);

        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Login Successfully",
            className: "toast-message",
          });
          setTimeout(() => {
            window.location.href = "https://marin-allwin.github.io/react-quiz/";
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        toast.current.show({
          severity: "error",
          detail: "Please enter valid username and Password",
        });
      }
    }
  }

  return (
    <div className="main flex align-items-center justify-content-center linear-bg">
      {/* <div className="card"> */}
      <Toast ref={toast} />
      <Card className=" border-round-xl shadow-7  p-2 linear-bg">
        <div className=" flex flex-column justify-content-center align-items-center md:flex-row  card-body sm:flex justify-content-center">
          <div className=" flex flex-1 flex-column justify-content-center align-items-center gap-2 h-full">
            <h1>
              <i className="pi pi-moon text-primary text-6xl"></i>
            </h1>
            <div className="flex flex-column align-items-center lg:text-lg md:text-sm sm:text-xs">
              <h1 className="text-primary ">NSOC DASHBOARD</h1>
              <h3>how are you</h3>
            </div>
          </div>
          <div className="w-16rem h-full md:w-3 flex  flex-1 flex-column justify-content-center gap-3 text-white sm:flex w-8rem ">
            <div className="flex flex-column justify-content-start gap-3 sm:flexw-8rem">
              <div className=" flex flex-column flex-wrap justify-content-start align-items-center gap-2 text-xs ">
                <div className="flex flex-column gap-2 sm:p-gird">
                  <label className=" flex justify-content-start ">
                    Username
                  </label>
                  <InputText
                    id="username"
                    type="text"
                    className="w-12rem border-noround"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onEnter
                  />
                  {userNameStatus && (
                    <small className="text-red-500">{userNameStatus}</small>
                  )}
                </div>
                <div className="flex flex-column gap-2">
                  <label className="w-8rem flex justify-content-start">
                    Password
                  </label>
                  <InputText
                    id="password"
                    type="password"
                    className="w-12rem border-noround flex"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // onEnter={() => verify(userName, password)}
                  />
                  {passwordStatus && (
                    <small className="text-red-500">{passwordStatus}</small>
                  )}
                  <div className="flex justify-content-end gap-2">
                    <h6 className="text-xs font-light">forgot password</h6>
                  </div>
                </div>
              </div>

              <Button
                label="SignIn"
                // icon="pi pi-user"
                className="w-12rem h-2rem mx-auto flex justify-content-center text-white"
                onClick={() => verify(userName, password)}
              ></Button>
            </div>
          </div>
        </div>
        {/* <div>wegdweyugdweuduw</div> */}
      </Card>
      {/* </div> */}
    </div>
  );
}

export default LoginPage;
