import { ref } from "vue";
import {
  getStorage,
  ref as refFirebase,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export function useStorage(name) {
  const error = ref(null);
  const filePath = ref(null);
  const url = ref("");

  async function uploadFile(file) {
    error.value = null;

    filePath.value = `${name}/${file.name}`;

    const fileRef = refFirebase(storage, filePath.value);

    try {
      const response = await uploadBytes(fileRef, file);

      // get url image
      url.value = await getDownloadURL(response.ref);
      return url.value;
    } catch (err) {
      //
    }
  }
  return { uploadFile, error, filePath, url };
}
