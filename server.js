const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Helper functions
function escapeHtml(text) {
  return text
    ? text.replace(/[&<>"']/g, match =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;"
        }[match])
      )
    : "";
}

function capitalizeName(name) {
  return name
    .split(" ")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function formatPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return phone;
}

// Setup nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ CONTACT FORM ENDPOINT with distinct style
app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("Missing fields");
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `💬 New Message from ${name}`,
    html: `
      <div style="
        font-family: 'Arial', sans-serif; 
        background: #e6f2ff; 
        padding: 30px; 
        border-radius: 12px; 
        border: 3px solid #3399ff; 
        max-width: 600px; 
        margin: auto; 
        box-shadow: 0 4px 12px rgba(51,153,255,0.3); 
        color: #004080;
      ">
        <div style="text-align: center; margin-bottom: 20px; font-weight: 700; font-size: 20px; letter-spacing: 1px;">
          Braiding by Mary NYC Logo
        </div>
        <div style="text-align: center;">
          <h2 style="color: #007acc; font-size: 22px; margin-bottom: 12px;">💌 New Website Message</h2>
        </div>

        <hr style="border:none; border-top:2px solid #3399ff; margin: 25px 0;" />

        <p style="font-size: 16px;"><strong>👩 Name:</strong> ${escapeHtml(name)}</p>
        <p style="font-size: 16px;"><strong>📧 Email:</strong> ${escapeHtml(email)}</p>
        <p style="font-size: 16px;"><strong>📝 Message:</strong><br/>${escapeHtml(message)}</p>

        <hr style="border:none; border-top:2px solid #3399ff; margin: 25px 0;" />

        <p style="font-size: 13px; color: #336699; text-align: center; font-style: italic;">
          This message was sent via the <strong>Braiding by Mary NYC</strong> website.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent");
  } catch (err) {
    console.error("Contact form failed:", err);
    res.status(500).send("Error sending message.");
  }
});


// ✅ BOOKING FORM ENDPOINT
app.post("/send-booking", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    notes,
    service,
    date,
    time,
    price
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !service || !date || !time) {
    return res.status(400).send("Missing booking fields");
  }

  const fullName = `${firstName} ${lastName}`;

  // Read HTML email template
  const templatePath = path.join(__dirname, "public", "booking-confirmed.html");
  let template = fs.readFileSync(templatePath, "utf8");

  // Replace placeholders
  template = template
    .replace("{{FirstName}}", escapeHtml(capitalizeName(firstName)))
    .replace("{{ServiceName}}", escapeHtml(service))
    .replace("{{Date}}", escapeHtml(date))
    .replace("{{Time}}", escapeHtml(time))
    .replace("{{FullName}}", escapeHtml(capitalizeName(fullName)))
    .replace("{{Phone}}", escapeHtml(formatPhone(phone)))
    .replace("{{Email}}", escapeHtml(email))
    .replace("{{Price}}", escapeHtml(price));

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [process.env.EMAIL_USER, email],
    subject: `📅 Booking Confirmed: ${service} on ${date}`,
    html: template
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Booking confirmation sent.");
  } catch (err) {
    console.error("Booking email failed:", err);
    res.status(500).send("Error sending confirmation.");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
