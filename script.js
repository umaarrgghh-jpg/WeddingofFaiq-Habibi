/* =========================================================
   WEDDING OF FAAIQOH & HABIBI
   script.js
   ========================================================= */


/* =========================================================
   1. KONFIGURASI
   ========================================================= */

const WHATSAPP_NUMBER = "62895396028174";

const MAIN_INVITATION_URL =
  "https://weddingof-faiq-habibi.vercel.app/";

const GUESTS = [
  "Umar",
  "Amin",
  "Yakin",
  "Fathur",
  "Syafa",
  "Qoya"
];


/* =========================================================
   2. NAMA TAMU PERSONAL
   ========================================================= */

function getGuest() {

  const params = new URLSearchParams(window.location.search);

  const raw = params.get("to");

  if (!raw) {
    return "";
  }

  const decoded = decodeURIComponent(raw)
    .replace(/-/g, " ")
    .replace(/\+/g, " ")
    .trim();

  const matched = GUESTS.find(
    name => name.toLowerCase() === decoded.toLowerCase()
  );

  return matched || decoded;
}


/* Tampilkan nama tamu pada cover */

(function () {

  const guestName = document.getElementById("guestName");

  const guest = getGuest();

  if (guestName && guest) {
    guestName.textContent = guest;
  }

})();


/* =========================================================
   3. BUKA UNDANGAN
   ========================================================= */

function openInvite() {

  const cover = document.getElementById("cover");

  if (!cover) {
    return;
  }

  cover.classList.add("hide");

  document.body.classList.remove("locked");

  document.body.style.overflow = "auto";

  startMusic();

}


/* =========================================================
   4. MUSIK
   ========================================================= */

const bgMusic = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");


/* Mengubah tampilan tombol musik */

function updateMusicButton() {

  if (!musicBtn || !bgMusic) {
    return;
  }

  if (bgMusic.paused) {

    musicBtn.textContent = "♫";

    musicBtn.title = "Putar musik";

    musicBtn.setAttribute(
      "aria-label",
      "Putar musik"
    );

    musicBtn.classList.remove("playing");

  } else {

    musicBtn.textContent = "Ⅱ";

    musicBtn.title = "Jeda musik";

    musicBtn.setAttribute(
      "aria-label",
      "Jeda musik"
    );

    musicBtn.classList.add("playing");

  }

}


/* Memulai musik */

function startMusic() {

  if (!bgMusic) {
    return;
  }

  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {

    playPromise
      .then(() => {

        updateMusicButton();

      })
      .catch(() => {

        updateMusicButton();

      });

  } else {

    updateMusicButton();

  }

}


/* Play / Pause */

function toggleMusic() {

  if (!bgMusic) {
    return;
  }

  if (bgMusic.paused) {

    startMusic();

  } else {

    bgMusic.pause();

    updateMusicButton();

  }

}


/* Update tombol ketika status audio berubah */

if (bgMusic) {

  bgMusic.addEventListener(
    "play",
    updateMusicButton
  );

  bgMusic.addEventListener(
    "pause",
    updateMusicButton
  );

  bgMusic.addEventListener(
    "ended",
    updateMusicButton
  );

}

updateMusicButton();


/* =========================================================
   5. COUNTDOWN
   ========================================================= */

const target =
  new Date("2026-11-26T19:00:00+07:00").getTime();


function tick() {

  const now = Date.now();

  let diff = target - now;

  if (diff < 0) {
    diff = 0;
  }


  const days =
    Math.floor(diff / 86400000);

  const hours =
    Math.floor(
      (diff % 86400000) / 3600000
    );

  const minutes =
    Math.floor(
      (diff % 3600000) / 60000
    );

  const seconds =
    Math.floor(
      (diff % 60000) / 1000
    );


  const pad = number =>
    String(number).padStart(2, "0");


  const cdD =
    document.getElementById("cd-d");

  const cdH =
    document.getElementById("cd-h");

  const cdM =
    document.getElementById("cd-m");

  const cdS =
    document.getElementById("cd-s");


  if (cdD) {
    cdD.textContent = pad(days);
  }

  if (cdH) {
    cdH.textContent = pad(hours);
  }

  if (cdM) {
    cdM.textContent = pad(minutes);
  }

  if (cdS) {
    cdS.textContent = pad(seconds);
  }

}


tick();

setInterval(
  tick,
  1000
);


/* =========================================================
   6. SIMPAN KE KALENDER
   ========================================================= */

function saveCalendar() {

  const ics = [

    "BEGIN:VCALENDAR",

    "VERSION:2.0",

    "PRODID:-//Faaiqoh Habibi//Wedding Invitation//ID",

    "BEGIN:VEVENT",

    "UID:faaiqoh-habibi-20261126@wedding-invitation",

    "DTSTAMP:20260923T000000Z",

    "SUMMARY:Pernikahan Faaiqoh & Habibi",

    "DTSTART:20261126T120000Z",

    "DTEND:20261127T140000Z",

    "LOCATION:Kempreng No. 4 RT 22/04, Tanjungsari, Taman, Sidoarjo",

    "DESCRIPTION:Pernikahan Faaiqoh & Habibi",

    "END:VEVENT",

    "END:VCALENDAR"

  ].join("\r\n");


  const blob =
    new Blob(
      [ics],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(blob);


  const link =
    document.createElement("a");


  link.href = url;

  link.download =
    "Pernikahan-Faaiqoh-Habibi.ics";


  document.body.appendChild(link);

  link.click();

  link.remove();


  setTimeout(
    () => URL.revokeObjectURL(url),
    1000
  );

}


/* =========================================================
   7. SALIN NOMOR REKENING
   ========================================================= */

function copyBankNumber() {

  const number =
    document.getElementById(
      "bankNumber"
    );


  if (!number) {
    return;
  }


  const value =
    number.textContent.trim();


  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    navigator.clipboard
      .writeText(value)

      .then(() => {

        alert(
          "Nomor rekening berhasil disalin"
        );

      })

      .catch(() => {

        fallbackCopy(value);

      });

  } else {

    fallbackCopy(value);

  }

}


/* Fallback copy */

function fallbackCopy(value) {

  const textarea =
    document.createElement("textarea");


  textarea.value = value;

  textarea.style.position =
    "fixed";

  textarea.style.left =
    "-9999px";


  document.body.appendChild(
    textarea
  );


  textarea.focus();

  textarea.select();


  try {

    document.execCommand("copy");

    alert(
      "Nomor rekening berhasil disalin"
    );

  } catch (error) {

    alert(
      "Nomor rekening: " + value
    );

  }


  textarea.remove();

}


/* =========================================================
   8. RSVP VIA WHATSAPP
   ========================================================= */

function sendRSVP() {

  const nameEl =
    document.getElementById("rn");

  const attendanceEl =
    document.getElementById("rk");

  const guestCountEl =
    document.getElementById("rp");

  const wishEl =
    document.getElementById("ru");

  const errorEl =
    document.getElementById("rn-err");


  if (
    !nameEl ||
    !attendanceEl ||
    !guestCountEl ||
    !wishEl
  ) {

    return;

  }


  const name =
    nameEl.value.trim();


  if (!name) {

    if (errorEl) {

      errorEl.style.display =
        "block";

    }

    nameEl.focus();

    return;

  }


  if (errorEl) {

    errorEl.style.display =
      "none";

  }


  const attendance =
    attendanceEl.value;


  const guestCount =
    guestCountEl.value || "1";


  const wish =
    wishEl.value.trim();


  const message =

    `Assalamu'alaikum, saya ${name}.\n\n` +

    `Konfirmasi kehadiran: ${attendance}\n` +

    `Jumlah tamu: ${guestCount} orang\n\n` +

    `Ucapan:\n${wish || "-"}`;


  const whatsappURL =

    "https://wa.me/" +

    WHATSAPP_NUMBER +

    "?text=" +

    encodeURIComponent(message);


  window.open(
    whatsappURL,
    "_blank"
  );

}


/* =========================================================
   9. URL PERSONAL
   ========================================================= */

function getCurrentInvitationUrl() {

  const guest =
    getGuest();


  if (guest) {

    return (
      MAIN_INVITATION_URL +
      "?to=" +
      encodeURIComponent(
        guest.replace(/ /g, "-")
      )
    );

  }


  return MAIN_INVITATION_URL;

}


/* =========================================================
   10. SHARE UNDANGAN
   ========================================================= */

async function shareLink() {

  const url =
    getCurrentInvitationUrl();


  try {

    if (navigator.share) {

      await navigator.share({

        title:
          "The Wedding of Faaiqoh & Habibi",

        text:
          "Undangan pernikahan Faaiqoh & Habibi",

        url: url

      });

      return;

    }


    await navigator.clipboard
      .writeText(url);


    alert(
      "Tautan undangan berhasil disalin"
    );


  } catch (error) {

    if (
      error &&
      error.name === "AbortError"
    ) {

      return;

    }


    fallbackCopy(url);

  }

}


/* =========================================================
   11. TOMBOL SHARE WHATSAPP
   ========================================================= */

(function () {

  const waLink =
    document.getElementById(
      "waShare"
    );


  if (!waLink) {
    return;
  }


  const url =
    getCurrentInvitationUrl();


  const message =

    "Undangan pernikahan Faaiqoh & Habibi.\n\n" +

    "26-27 November 2026.\n\n" +

    "Kami mengundang Anda untuk hadir " +

    "dan memberikan doa restu.\n\n" +

    url;


  waLink.href =

    "https://wa.me/?text=" +

    encodeURIComponent(message);

})();


/* =========================================================
   12. UCAPAN
   ========================================================= */

/*
   Fungsi ini sementara digunakan untuk
   menampilkan data ucapan.

   Nanti pada tahap berikutnya fungsi ini
   akan dihubungkan dengan Google Apps Script
   dan Google Sheets.
*/


function renderWishes(wishes) {

  const container =
    document.getElementById(
      "wishes"
    );


  if (
    !container ||
    !Array.isArray(wishes)
  ) {

    return;

  }


  if (wishes.length === 0) {

    container.innerHTML = `

      <div class="panel">

        <p style="font-size:13px;">

          Belum ada ucapan.

          Jadilah yang pertama

          memberikan doa untuk

          kedua mempelai.

        </p>

      </div>

    `;

    return;

  }


  container.innerHTML =

    wishes.map(item => `

      <div class="wish">

        <b>
          ${escapeHtml(
            item.nama || "Tamu"
          )}
        </b>

        <span>
          ${escapeHtml(
            item.ucapan || ""
          )}
        </span>

      </div>

    `).join("");

}


/* =========================================================
   13. KEAMANAN HTML UCAPAN
   ========================================================= */

function escapeHtml(value) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}
