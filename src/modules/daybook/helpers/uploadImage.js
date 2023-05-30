import axios from "axios";

const uploadImage = async (file) => {
  if (!file) return null;
  try {
    const cloudUrl = "https://api.cloudinary.com/v1_1/aalvag/image/upload";

    const formData = new FormData();
    formData.append("upload_preset", "journal-app");
    formData.append("file", file);

    const { data } = await axios.post(cloudUrl, formData);
    return data.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default uploadImage;
