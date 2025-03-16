
import { computed, ref, onMounted } from 'vue';
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

function playSound(url) {
  let audio = new Audio(url);
  audio.play().catch(error => console.error("Playback failed:", error));
}