const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
});

let applicationMail = {
  subject: "[Escape] - Upisnica od ",
};

const sendEmail = (to, subject, emailObject) => {
  let arr = emailObject.dani;
  let n = arr.length;
  let arrayItems = "";

  for (n in arr) {
    arrayItems += "<li>" + arr[n] + "</li>";
  }

  let mailOptions = {
    from: process.env.EMAIL,
    to,
    // cc: "",
    subject,
    html: `<div style="color: black">
      <h1>Nova upisnica</h1>
      <h2 style="margin: 20px 0">Ime i prezime plesača:</h2>
      <h3 style="color: rgb(0, 0, 195); font-size: 20px; margin: 20px 0">${
        emailObject.imePrezime
      }</h3>
      <h4 style="margin: 20px 0">Ime i prezime skrbnika: ${
        emailObject.imePrezimeSkrbnika !== ""
          ? emailObject.imePrezimeSkrbnika
          : "<b>Nije unet takav podatak</b>"
      }</h4>
      <p style="margin: 20px 0">Datum rodjenja: ${emailObject.datumRodjenja}</p>
      <p style="margin: 20px 0">Broj mobitela plesača: ${
        emailObject.mobitel
      }</p>
      <p style="margin: 20px 0">Broj mobitela skrbnika: ${
        emailObject.mobitelSkrbnika !== ""
          ? emailObject.mobitelSkrbnika
          : "<b>Nije unet takav podatak</b>"
      }</p>
      <p style="margin: 20px 0">E-mail adresa: ${emailObject.email}</p>
      <p style="margin: 20px 0">E-mail adresa skrbnika: ${
        emailObject.emailSkrbnika !== ""
          ? emailObject.emailSkrbnika
          : "<b>Nije unet takav podatak</b>"
      }</p>
      <p style="margin: 20px 0">Grupa koja zanima potencijalnog člana: ${
        emailObject.grupa
      }</p>
      <p style="margin: 20px 0">Plesna tehnika koju potencijalni član želi upisati: ${
        emailObject.plesnaTehnika
      }</p>
      <p style="margin: 20px 0">Lokacija: ${emailObject.lokacija}</p>
      <p style="margin: 20px 0">Dani u tjednu koji odgovaraju potencijalnom članu:</p>
      <ul>
        ${arrayItems}
      </ul>
      <p style="margin: 20px 0">
        Plesno iskustvo (koliko godina ste trenirali, gdje i koji plesni stil):
        <span style="font-weight: bold">${
          emailObject.plesnoIskustvo !== ""
            ? emailObject.plesnoIskustvo
            : "<b>Nije unet takav podatak</b>"
        }</span>
      </p>
      <p style="margin: 20px 0">
        Smjene u školi (uvijek ujutro, uvijek popodne, svaki tjedan drugačije):
        <span style="font-weight: bold">${
          emailObject.smene !== ""
            ? emailObject.smene
            : "<b>Nije unet takav podatak</b>"
        }</span>
      </p>
      <p style="margin: 20px 0">
        Kako i gdje ste čuli za plesni studio Escape? (preporuka, plakat, letak,
        web stranica ..) <span style="font-weight: bold">${
          emailObject.gdeSamCuo !== ""
            ? emailObject.gdeSamCuo
            : "<b>Nije unet takav podatak</b>"
        }</span>
      </p>
      <p style="margin: 20px 0">
        Kako bismo mogli poboljšati kvalitetu plesnog studija, molimo Vas da
        ovdje napišete Vaše kritike, prijedloge, pohvale, ideje i slično:
        <span style="font-weight: bold">${
          emailObject.kritika !== ""
            ? emailObject.kritika
            : "<b>Nije unet takav podatak</b>"
        }</span>
      </p>
    </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  try {
    sendEmail(
      "vladimir.lazarevic@fonis.rs",
      `${applicationMail.subject} ${req.body.application.email}`,
      req.body.application
    );
    res.status(200).json({ message: "Successfully sent email" });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
