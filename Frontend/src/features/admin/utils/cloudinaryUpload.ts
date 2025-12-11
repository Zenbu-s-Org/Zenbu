export async function uploadImage(file: File): Promise<string> {
  const CLOUD_NAME = "drjjxlrbk";
  const UPLOAD_PRESET = "zenbu_menu_upload";

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, { method: "POST", body: formData });
  const data = await res.json();

  // data.secure_url = URL till bilden
  return data.secure_url;
}
