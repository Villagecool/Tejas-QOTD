<div>
  <h1>History</h1>
  <div v-html="compiledAll"></div> <!-- Render compiled Markdown as HTML -->
</div>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { marked } from 'marked';

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
        markdownTable = `## <span class="tt">"${columns[0]}"</span> <span class="su"> - Tejas Nyaharkar</span> <span class="VPBadge tip">${formatDate(columns[1])}</span>\n${markdownTable}`; // Table rows
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
  // Split the date string into day, month, and year
  const [month, day, year] = dateStr.split('/');

  // Create a Date object with the extracted date
  const date = new Date(`${year}-${month}-${day}`);

  // Array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Format the date as "Month Day, Year"
  return `${monthNames[date.getMonth()]} ${parseInt(day)}, ${year}`;
}

// Trigger the data fetch on page load
onMounted(fetchAll);

// Compile the Markdown into HTML
const compiledAll = computed(() => marked(AllQuotes.value));
</script>

<style>
@font-face {
  font-family: eb;
  src: url("./EBGaramond-Italic-VariableFont_wght.ttf");
}
.tt {
  color: var( --vp-c-text-1);
  line-height: 1.5;
}
.su {
  font-family: eb;
  color: var( --vp-c-text-2);
}
</style>