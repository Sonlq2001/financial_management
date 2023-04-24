import * as Yup from "yup";

export const initValues = {
  name: "",
  category: "",
  date: "",
  year: "",
  month: "",
  time: "",
  total_bill: "",
  description_photo: "",
  note: "",
  createdAt: new Date().getTime(),
};

export const schema = Yup.object().shape({
  name: Yup.string().required("Bạn chưa nhập tên giao dịch !"),
  category: Yup.string().required("Bạn chưa chọn danh mục !"),
  date: Yup.string().required("Bạn chưa chọn ngày ngày !"),
  time: Yup.string().required("Bạn chưa chọn ngày thời gian !"),
  total_bill: Yup.mixed().test(
    "total_bill",
    "Bạn chưa nhập giá tiền !",
    (value) => {
      return value;
    }
  ),
  description_photo: Yup.string().required("Bạn chưa chọn ảnh !"),
  note: Yup.string()
    .required("Bạn chưa nhập ghi chú !")
    .max(100, "Độ dài ghi chú vượt quá 100 ký tự !"),
});

export const initLinkImage = {
  description_photo: "",
};

export const schemaLinkImage = Yup.object().shape({
  description_photo: Yup.string().required("Vui lòng nhập đường dẫn ảnh !"),
});
