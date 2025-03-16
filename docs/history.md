<div>
  <div class="parallax" :style="{ backgroundPositionY: parallaxOffset + 'px', backgroundImage: `url('${bgImageUrl}')`}"></div>

  <h1>History</h1>
  <div v-html="compiledAll"></div> <!-- Render compiled Markdown as HTML -->
</div>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { marked } from 'marked';

const parallaxOffset = ref(0);

const bgImageUrl = ref(`https://github.com/Villagecool/Tejas-QOTD/blob/main/docs/${getRandomInt(1,7)}.png?raw=true`)

const handleScroll = () => {
  parallaxOffset.value = (window.scrollY * -0.25); // Adjust scroll speed
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const AllQuotes = ref(''); // Raw Markdown data
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT_jn9zYgQ5Tc6Fj15yaW3260i7DqqTnv8_QgliGj-M61qS5pgRspYFtnAiDk7xw0xl5SBKTdoYLNKP/pub?output=csv';

// Fetch the CSV data and process it into Markdown
async function fetchAll() {
  try {
    AllQuotes.value = ''; // Reset initial value
    const response = await fetch(CSV_URL);
    const text = await response.text();
    const rows = text.split('\n'); // Split CSV into rows

    if (rows.length > 1) {
      let markdownTable = ''; // Table header
      rows.forEach(row => {
        const columns = row.split(',');
        markdownTable = marked(`## <span class="ttt">"${columns[0]}"</span> <span class="sut"> - Tejas Nyaharkar</span> <span class="VPBadge tip">${formatDate(columns[1])}</span>`)+/*`<button class="sound-button" @click="generateAudio(\`${columns[0]}\`)">🔊</button>`*/`\n${markdownTable}`; // Table rows
      });
      //AllQuotes.value = '| Quote | Date |\n|--|--|\n' + markdownTable; // Set the compiled Markdown
      AllQuotes.value = markdownTable
    } else {
      AllQuotes.value = 'Could Not Get History';
    }
  } catch (error) {
    AllQuotes.value = 'Could Not Get History';
  }
}
function formatDate(dateStr) {
  if (!dateStr) return 'Unknown Day';
  // Split the date string into day, month, and year
  const [day, month, year] = dateStr.split('/');

  if (dateStr.split('/').length != 3) return dateStr;

  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  // Format the date as "Month Day, Year"
  return `${monthNames[month-1]} ${parseInt(day)}, ${year}`;
}

// Trigger the data fetch on page load
onMounted(fetchAll);

// Compile the Markdown into HTML
const compiledAll = computed(() => AllQuotes.value);

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
      voice_settings: { stability: 0.5, similarity_boost: 0.5 },
      stream: true
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function playSound(url) {
  let audio = new Audio(url);
  audio.play().catch(error => console.error("Playback failed:", error));
}

</script>

<style>
@font-face {
  font-family: eb;
  src: url("./EBGaramond-Italic-VariableFont_wght.ttf");
}
.ttt {
  color: var( --vp-c-text-1);
  line-height: 1.5;
}
.sut {
  font-family: eb;
  color: var( --vp-c-text-2);
}

.parallax {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('/1.png');
  background-size: cover;
  opacity: 0.2;
  background-position: center;
  z-index: -1; /* Puts background behind everything */
}
.sound-button {
  position: inline;
  bottom: -10px; /* Adjust as needed */
  right: -10px; /* Adjust as needed */
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  font-size: 14px; /* Adjust size */
  padding: 2px;
  z-index: 10;
  border-radius: 8px;
  border: 2.5px solid var(--vp-c-border);
  box-shadow: 0px 0px 20px -20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out 0ms;
  user-select: none;
}

.sound-button:hover {
  transform: scale(1.1);
  color: #000000; /* Optional: Change color on hover */
}
.sound-button:active {
  transform: scale(0.8);
  color: #634F00; /* Optional: Change color on hover */
}
</style>