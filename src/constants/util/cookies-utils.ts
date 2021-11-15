// export const setCookie = (cname: string, cvalue: any, exdays: number): void => {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays);
//   const expires = "expires=" + d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// };
//
// export const getCookie = (cname: string): string | undefined => {
//   const name = cname + "=";
//   const ca = document.cookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
// };
// export const clearCookies = () => {
//   // document.cookie = "";
// };
