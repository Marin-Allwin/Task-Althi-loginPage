import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.228.1.81:8087",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;


// if (setUserNameStatus === !null && setPasswordStatus === !null) {
//     try {
//       Event.preventDefault();
//       const encrypt = (data) => {
//         const key = CryptoJS.enc.Utf8.parse("acaiaalthi0001uu"); // 16, 24, or 32 bytes key
//         const iv = CryptoJS.enc.Utf8.parse("qwertyuioplkjhgf"); // 16 bytes IV
//         const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
//         return encrypted.toString();
//       };
//       const encryptedEmail = encrypt(userName);
//       const encryptedPassword = encrypt(password);
//       const response = await axios.post(`/sign_in`, {
//         emailId: encryptedEmail,
//         password: encryptedPassword,
//       });

//       const accessToken = response.data.access_token;
//       sessionStorage.setItem("access_token", accessToken);
//       const refreshToken = response.data.refresh_token;
//       sessionStorage.setItem("refresh_token", refreshToken);

//       const [validateResponse] = await Promise.all([
//         axios.get("token_info/" + accessToken),
//       ]);

//       if (validateResponse.status === 200) {
//         toast.current.show({
//           severity: "success",
//           summary: "Login Successfully",
//         });
//         setTimeout(() => {
//           window.location.href =
//             "https://new-portfolio-ebon-kappa.vercel.app/";
//         }, 1000);
//       }
//     } catch (error) {
//       toast.current.show({
//         severity: "error",
//         detail: "Please enter valid username and Password",
//       });
//     }
//   }