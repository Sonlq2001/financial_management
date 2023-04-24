import * as Yup from "yup";

export const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email không được để trống !")
    .email("Email không hợp lệ !"),
  password: Yup.string().required("Mật khẩu không được để trống !"),
});
