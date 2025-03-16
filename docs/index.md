---
layout: page
---

<div class="hero" :style="{ '--bg-image': `url('${bgImageUrl}')`}">
</div>

  <div class="hero-content">
    <span class="tt">"{{ lastItem }}"</span><br><br>
    <span class="su">- Tejas Nyaharkar, {{ formatDate(lastQuote) }}</span>
  </div>
  
<div v-html="compiledAll"></div>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { marked } from "marked";

const bgImageUrl = ref(`https://github.com/Villagecool/Tejas-QOTD/blob/main/docs/${getRandomInt(1,7)}.png?raw=true`)

const lastItem = ref('');
const lastQuote = ref('');
const lastAllQuotes = ref('');
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT_jn9zYgQ5Tc6Fj15yaW3260i7DqqTnv8_QgliGj-M61qS5pgRspYFtnAiDk7xw0xl5SBKTdoYLNKP/pub?output=csv';

async function fetchLastItem() {
  try {
    const response = await fetch(CSV_URL);
    const text = await response.text();
    const rows = text.split('\n'); // Split CSV into rows
    
    if (rows.length > 1) {
      lastItem.value = rows[rows.length - 1].split(',')[0]; // Last row, first column
      //generateAudio(lastItem.value) //this cost too much
    } else {
      lastItem.value = 'No quote for today';
    }
  } catch (error) {
    lastItem.value = 'someone broke the google doc';
  }
}

async function fetchLastDate() {
  try {
    const response = await fetch(CSV_URL);
    const text = await response.text();
    const rows = text.split('\n'); // Split CSV into rows
    
    if (rows.length > 1) {
      lastQuote.value = rows[rows.length - 1].split(',')[1]; // Last row, first column
    } else {
      lastQuote.value = '';
    }
  } catch (error) {
    lastQuote.value = '';
  }
}
var all = ''
async function fetchLastAll() {
  try {
    const response = await fetch(CSV_URL);
    const text = await response.text();
    const rows = text.split('\n'); // Split CSV into rows
    
    if (rows.length > 1) {
      for (const item of rows) {
        all += `|${item.split(',')[0]}|${item.split(',')[1]}|\n`
      }
      all = rows[rows.length - 1].split(',')[1]; // Last row, first column
    } else {
      all = '';
    }
  } catch (error) {
    all = '';
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

onMounted(fetchLastItem);
onMounted(fetchLastDate);
onMounted(fetchLastAll);
const compiledAll = computed(() => marked(all));

function formatDate(dateStr) {
  if (!dateStr) return 'Unknown Day';
  // Split the date string into day, month, and year
  const [day, month, year] = dateStr.split('/');
  if (dateStr.split('/').length != 3) return dateStr;

  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  // Format the date as "Month Day, Year"
  return `${monthNames[month-1]} ${parseInt(day)}, ${year}`;
}

const text = ref(""); // User input
const audioUrl = ref(""); // Stores generated audio URL

async function generateAudio(strings) {
  function _0x5647(_0x1a17cb,_0xde1254){const _0x35d5db=_0x35d5();return _0x5647=function(_0x56473a,_0xa5d357){_0x56473a=_0x56473a-0x1cf;let _0x5da7ae=_0x35d5db[_0x56473a];return _0x5da7ae;},_0x5647(_0x1a17cb,_0xde1254);}const _0x2610d9=_0x5647;(function(_0x852400,_0x3c5e2d){const _0x1ca886=_0x5647,_0x2ff4f7=_0x852400();while(!![]){try{const _0x4c2f90=parseInt(_0x1ca886(0x1d0))/0x1+parseInt(_0x1ca886(0x1d3))/0x2*(parseInt(_0x1ca886(0x1d4))/0x3)+-parseInt(_0x1ca886(0x1d7))/0x4+-parseInt(_0x1ca886(0x1d2))/0x5*(-parseInt(_0x1ca886(0x1d5))/0x6)+-parseInt(_0x1ca886(0x1d8))/0x7*(-parseInt(_0x1ca886(0x1d6))/0x8)+parseInt(_0x1ca886(0x1d1))/0x9+-parseInt(_0x1ca886(0x1da))/0xa*(parseInt(_0x1ca886(0x1cf))/0xb);if(_0x4c2f90===_0x3c5e2d)break;else _0x2ff4f7['push'](_0x2ff4f7['shift']());}catch(_0xb79f27){_0x2ff4f7['push'](_0x2ff4f7['shift']());}}}(_0x35d5,0x97386));const API_KEY=_0x2610d9(0x1d9);function _0x35d5(){const _0x3bb28c=['80946jGElYa','104tPLsvM','4360308oAaMmC','11158FQYdEn','sk_190fac21d7b32387f883feaff044abda2bfa89dc1dae7a8a','8857540UbnqjC','22qIhvLI','1015333KLrUIO','7899012fUpsFy','405KBXYyz','18LSGNwD','158163BvgijZ'];_0x35d5=function(){return _0x3bb28c;};return _0x35d5();}
  
  const VOICE_ID = "TcgD4u2kSZe8qSQAsUP8"; // Default ElevenLabs voice ID

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": API_KEY, // Authorization key
    },
    body: JSON.stringify({
      text: strings,
      voice_settings: { stability: 0.5, similarity_boost: 1 }
    })
  });

  if (!response.ok) {
    console.error("TTS API Error:", response.statusText);
    return;
  }

  // Convert response to audio blob
  const audioBlob = await response.blob();
  audioUrl.value = URL.createObjectURL(audioBlob); // Create URL for playback
  new Audio(URL.createObjectURL(audioBlob)).play()
}

function playSound(url) {
  let audio = new Audio(url);
  audio.play().catch(error => console.error("Playback failed:", error));
}

</script>

<style>
  
@font-face {
  font-family: vegan;
  src: url("./VeganStylePersonalUse-5Y58.ttf");
}
@font-face {
  font-family: eb;
  src: url("./EBGaramond-Italic-VariableFont_wght.ttf");
}
@keyframes fadeGlideIn {
  from {
    opacity: 0;
    transform: translateX(100%); /* Start slightly to the right */
  }
  to {
    opacity: 1;
    transform: translateX(-10);
  }
}
@keyframes fadeGlideIn2 {
  from {
    opacity: 0;
    transform: translateX(-100px)translateY(40vh); /* Start slightly to the right */
  }
  to {
    opacity: 1;
    transform: translateX(0)translateY(40vh);
  }
}
.hero {
  position: absolute;
  width: min(100vh, 100vw); /* Ensures a perfect square */
  height: min(100vh, 100vw); /* Ensures a perfect square */
  right: 0; /* Snaps it to the right */
  top: 0;
  background: var(--bg-image) right center/cover no-repeat; /* Background image */
  opacity: 0; /* Initially hidden */
  animation: fadeGlideIn 2s ease-out forwards;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(0, 0, 0, 0) 30%, var(--vp-c-bg) 70%);
}

.hero-content {
  position: absolute;
  left: 5%; /* Adjust as needed for left alignment */
  transform: translateY(40vh); /* Pulls it up by 50% of its own height */
  color: white; /* Text color */
  text-align: left;
  width: calc(min(100vh, 100vw) - 40px); /* Ensures text fits inside the square */
  z-index: 1; /* Ensures text is above the gradient */
  animation: fadeGlideIn2 2s ease-out forwards;
}
.tt {
  font-family: vegan;
  font-size: 5vw;
  color: var( --vp-c-text-1);
  line-height: 1.5;
}
.su {
  font-family: eb;
  color: var( --vp-c-text-2);
  font-size: 4vw;
}
</style>
