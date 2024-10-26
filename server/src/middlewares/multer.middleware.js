// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({
//   storage,
// });

// // console.log("Upload ==== ",upload)

import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory instead of on disk

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Optional: limit file size (e.g., 10 MB)
});
