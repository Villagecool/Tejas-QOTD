---
layout: page
---
<div class="hero">
</div>

  <div class="hero-content">
    <span class="tt">"{{ lastItem }}"</span><br><br>
    <span class="su">- Tejas Nyaharkar, {{ lastQuote }}</span>
  </div>
  
<div v-html="compiledAll"></div>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { marked } from "marked";

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

onMounted(fetchLastItem);
onMounted(fetchLastDate);
onMounted(fetchLastAll);
const compiledAll = computed(() => marked(all));
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
  .hero {
  position: absolute;
  width: min(100vh, 100vw); /* Ensures a perfect square */
  height: min(100vh, 100vw); /* Ensures a perfect square */
  right: 0; /* Snaps it to the right */
  top: 0;
  background: url('./2.png') right center/cover no-repeat; /* Background image */
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(0, 0, 0, 0) 30%, var(--vp-c-bg) 70%);
}

.hero-content {
  position: absolute;
  top: 50%;  /* Moves the element down by 50% of its parent */
  left: 50px; /* Adjust as needed for left alignment */
  transform: translateY(40vh); /* Pulls it up by 50% of its own height */
  color: white; /* Text color */
  text-align: left;
  width: calc(min(100vh, 100vw) - 40px); /* Ensures text fits inside the square */
  z-index: 1; /* Ensures text is above the gradient */
}
.tt {
  font-family: vegan;
  font-size: 100px;
  color: var( --vp-c-text-1);
  line-height: 1.5;
}
.su {
  font-family: eb;
  color: var( --vp-c-text-2);
  font-size: 50px;
}
</style>