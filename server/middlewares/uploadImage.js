import multer from "multer";
import path from "path";
//uploading image
//sources : https://www.youtube.com/watch?v=jfZyqZycjmA
//https://www.youtube.com/watch?v=j_EAwG9Rwd4
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
      storage:storage
  })
  export default upload