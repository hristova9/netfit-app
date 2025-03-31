export const validateFile = (file: File) => {
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes

  if (!validTypes.includes(file.type)) {
    return "Only JPEG, PNG, and GIF files are allowed!";
  }

  if (file.size > maxSize) {
    return "File size must not exceed 5MB!";
  }

  return null;
};
