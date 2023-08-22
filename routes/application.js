const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.API_KEY);

const sendEmailContactForm = async (emailObject) => {
  console.log(emailObject);
  const msg = {
    to: "upisi.escape@gmail.com",
    from: process.env.EMAIL,
    subject: `[Escape] - upisnica`,
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
    <p style="margin: 20px 0">Dob plesača: ${emailObject.dobPlesaca}</p>
    <p style="margin: 20px 0">Broj mobitela plesača: ${emailObject.mobitel}</p>
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
    <p style="margin: 20px 0">Level na kom se nalazi potencijalni član: ${
      emailObject.level !== ""
        ? emailObject.level
        : "<b>Nije unet takav podatak</b>"
    }</p>
    <p style="margin: 20px 0">Plesni stil koju potencijalni član želi upisati: ${
      emailObject.plesniStil !== ""
        ? emailObject.plesniStil
        : "<b>Nije unet takav podatak</b>"
    }</p>
    <p style="margin: 20px 0">Lokacija: ${
      emailObject.lokacija !== ""
        ? emailObject.lokacija
        : "<b>Nije unet takav podatak</b>"
    }</p>
  </div>`,
  };
  await sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

router.post("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );

  try {
    await sendEmailContactForm(req.body.application);
    res.status(200).json({ message: "Successfully sent email" });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
