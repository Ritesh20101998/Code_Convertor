const baseUrl = "https://code-convertor-app.onrender.com";
const defaultUrl = `${baseUrl}/api`
const convert = `${defaultUrl}/convert`;
const debug = `${defaultUrl}/debug`;
const qualityCheck = `${defaultUrl}/quality`;

// Add your JavaScript code here
const convertBtn = document.getElementById("convert-btn");
const debugBtn = document.getElementById("debug-btn");
const qualityBtn = document.getElementById("quality-btn");
const codeInput = document.getElementById("code");
const languageInput = document.getElementById("language");
const outputDiv = document.getElementById("output");
const loader = document.getElementById("loader");
const copyBtn = document.getElementById("copy-btn");

async function performRequest(fetchRequest) {
  const code = codeInput.value;
  const language = languageInput.value;

  if (code === "" && language === "") {
    return (outputDiv.textContent = "First Write Code or language");
  }

  outputDiv.innerHTML = "";
  loader.style.display = "block";

  const response = await fetch(fetchRequest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: code,
      language: language,
    }),
  });

  const data = await response.json();
  const result = data.response;

  loader.style.display = "none";
  outputDiv.innerHTML = `<pre>${result}</pre>`;
}

convertBtn.addEventListener("click", () => {
  const code = codeInput.value;
  const language = languageInput.value;

  if (code === "" || language === "") {
    return (outputDiv.textContent = "First Write Code or language");
  }

  performRequest(convert);
});

debugBtn.addEventListener("click", () => {
  performRequest(debug);
});

qualityBtn.addEventListener("click", () => {
  performRequest(qualityCheck);
});

copyBtn.addEventListener("click", () => {
  copyOutput();
});

function copyOutput() {
  const output = document.getElementById("output");
  const range = document.createRange();
  range.selectNode(output);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}