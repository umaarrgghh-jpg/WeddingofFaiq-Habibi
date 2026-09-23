function getGuest(){
  const p = new URLSearchParams(window.location.search);
  return p.get('to')
    ? decodeURIComponent(p.get('to')).replace(/-/g,' ').replace(/\+/g,' ')
    : '';
}

(function(){
  const g = getGuest();
  if(g){
    document.getElementById('guestName').textContent = g;
  }
})();


function openInvite(){
  const cover = document.getElementById('cover');

  if(cover){
    cover.classList.add('hide');
    document.body.style.overflow = 'auto';
  }
}


/* Countdown to Akad: 26 Nov 2026 19:00 WIB */
const target = new Date('2026-11-26T19:00:00+07:00').getTime();

function tick(){
  const now = Date.now();
  let diff = target - now;

  if(diff < 0){
    diff = 0;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const pad = n => String(n).padStart(2,'0');

  const cdD = document.getElementById('cd-d');
  const cdH = document.getElementById('cd-h');
  const cdM = document.getElementById('cd-m');
  const cdS = document.getElementById('cd-s');

  if(cdD) cdD.textContent = pad(d);
  if(cdH) cdH.textContent = pad(h);
  if(cdM) cdM.textContent = pad(m);
  if(cdS) cdS.textContent = pad(s);
}

tick();
setInterval(tick, 1000);


/* Save to Calendar */
function saveCalendar(){
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'SUMMARY:Pernikahan Faaiqoh & Habibi',
    'DTSTART:20261126T120000Z',
    'DTEND:20261127T140000Z',
    'LOCATION:Kempreng No. 4 RT 22/04, Tanjungsari, Taman, Sidoarjo',
    'DESCRIPTION:Akad Nikah Kamis 26 November ba' + String.fromCharCode(39) + 'da Isya, Resepsi Jumat 27 November 09.00-21.00 WIB',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], {
    type: 'text/calendar'
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'Pernikahan-Faaiqoh-Habibi.ics';

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}


/* RSVP via WhatsApp */
function sendRSVP(){
  const name = document.getElementById('rn').value.trim();
  const err = document.getElementById('rn-err');

  if(!name){
    err.style.display = 'block';
    return;
  }

  err.style.display = 'none';

  const hadir = document.getElementById('rk').value;
  const jumlah = document.getElementById('rp').value;
  const ucapan = document.getElementById('ru').value.trim();

  const msg =
    `Assalamu'alaikum, saya ${name}. ` +
    `Konfirmasi: ${hadir} (${jumlah} orang). ` +
    `Ucapan: ${ucapan || '-'}`;

  window.open(
    'https://wa.me/6281335041761?text=' + encodeURIComponent(msg),
    '_blank'
  );
}


/* Copy invitation link */
function shareLink(){
  try{
    navigator.clipboard.writeText(window.location.href);
    alert('Tautan undangan disalin');
  }catch(e){
    alert(window.location.href);
  }
}


/* WhatsApp share */
(function(){
  const waLink = document.getElementById('waShare');

  if(!waLink) return;

  const text =
    'Undangan pernikahan Faaiqoh & Habibi, ' +
    '26-27 November 2026: ' +
    window.location.href;

  waLink.href =
    'https://wa.me/?text=' + encodeURIComponent(text);
})();
