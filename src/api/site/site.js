const path = require("path");
const fs = require("fs");
const { Upload, Download } = require("../../app/models");

const filetypeToContentType = (file) => {
  const mime = {
    gif: "image/gif",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    webp: "image/webp",
    weba: "audio/webp",
    webm: "video/webp",

    pdf: "application/pdf",
    zip: "application/zip",
    rar: "application/x-rar-compressed",

    mid: "audio/midi",
    midi: "audio/midi",

    avi: "video/x-msvideo",
    mpeg: "video/mpeg",
  };
  const type = mime[path.extname(file).slice(1)] || "text/plain";
  // res.setHeader("Content-Type", type);
  return type;
};

class siteController {
  getBanner(req, res) {
    const i = Math.floor(Math.random() * 3) + 1;
    res.sendFile(
      path.resolve(__dirname, `../../assets/img/banners/banner_${i}.png`)
    );
  }

  getBannerPlan(req, res) {
    const { type } = req.params;
    res.sendFile(
      path.resolve(__dirname, `../../assets/img/banners/${type}_banner.png`)
    );
  }

  // async getDeposition(req, res) {
  //   const { id } = req.params;
  //   let filetype = "image/jpeg";

  //   const downloadFromDB = await Download.findOne({
  //     where: { id },
  //   });
  //   if (downloadFromDB) {
  //     filetype = downloadFromDB.uploadFiletype;
  //     console.log(filetype);
  //   }

  //   const fileLocation = path.resolve(
  //     __dirname,
  //     `../../depositions/deposition_${id}.img`
  //   );

  //   fs.access(fileLocation, (error) => {
  //     if (!error) {
  //       res.sendFile(fileLocation);
  //     } else {
  //       const fileLocationModel = path.resolve(
  //         __dirname,
  //         `../../depositions/deposition_0.img`
  //       );
  //       res.setHeader("Content-Type", filetype);
  //       res.sendFile(fileLocationModel);
  //     }
  //   });
  // }

  // async getUpload(req, res) {
  //   const { id } = req.params;

  //   let filetype = "image/png";
  //   let fileLocation = path.resolve(`src/uploads/upload_0.png`);

  //   const uploadFromDB = await Upload.findOne({
  //     where: { id },
  //   });

  //   if (uploadFromDB) {
  //     fileLocation = path.resolve(uploadFromDB.filePath);
  //     filetype = uploadFromDB.fileType;
  //   }

  //   fs.access(fileLocation, (error) => {
  //     if (!error) {
  //       res.setHeader("Content-Type", filetype);
  //       res.sendFile(fileLocation);
  //     } else {
  //       console.log("Arquivo de upload não encontrado!!!");
  //     }
  //   });
  // }

  // getImage(req, res) {
  //   const { name } = req.params;
  //   console.log("getImage>>>>>>>>");
  //   console.log(name);
  //   let options = {
  //     dotfiles: "ignore",
  //     etag: false,
  //     extensions: ["jpeg", "jpg", "png", "gif", "ico", "svg"],
  //     index: false,
  //     maxAge: "1d",
  //     redirect: false,
  //     setHeaders: function (res, path, stat) {
  //       res.set("x-timestamp", Date.now());
  //     },
  //   };
  //   res.sendFile(`/uploads/${name}`, options, function (err) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       console.log("Sent:", fileName);
  //     }
  //   });
  // }

  // getDownload(req, res) {
  //   const { name } = req.params;
  //   console.log("getDownload>>>>>>>>");
  //   console.log(name);
  //   let options = {
  //     dotfiles: "ignore",
  //     etag: false,
  //     extensions: ["pdf", "zip"],
  //     index: false,
  //     maxAge: "1d",
  //     redirect: false,
  //     setHeaders: function (res, path, stat) {
  //       res.set("x-timestamp", Date.now());
  //     },
  //   };
  //   res.sendFile(`/downloads/${name}`, options, function (err) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       console.log("Sent:", fileName);
  //     }
  //   });
  // }
}
module.exports = new siteController();
