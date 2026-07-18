const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json",
    ".md",
    ".css",
    ".html",
    ".java",
    ".py",
    ".cpp",
    ".c",
    ".cs",
  ];

  const extension = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = upload;