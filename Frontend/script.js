document.addEventListener("DOMContentLoaded", () => {
    const codeForm = document.getElementById("codeForm");
    const codeTextarea = document.getElementById("codeTextarea");
    const languageSelect = document.getElementById("languageSelect");
    const convertBtn = document.getElementById("convertBtn");
    const debugBtn = document.getElementById("debugBtn");
    const qualityBtn = document.getElementById("qualityBtn");
    const responseContainer = document.getElementById("responseContainer");

    codeForm.addEventListener("submit", async(e) => {
        e.preventDefault();

        const prompt = codeTextarea.value;
        const language = languageSelect.value;

        const response = await fetch("http://code-convertor-app.onrender.com/convert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt, language }),
        });

        const responseData = await response.json();
        displayResponse(responseData.response);
    });

    debugBtn.addEventListener("click", async(e) => {
        e.preventDefault();

        const prompt = codeTextarea.value;

        const response = await fetch("http://code-convertor-app.onrender.com/debug", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        const responseData = await response.json();
        displayResponse(responseData.response);
    });

    qualityBtn.addEventListener("click", async(e) => {
        e.preventDefault();

        const prompt = codeTextarea.value;

        const response = await fetch("http://code-convertor-app.onrender.com/quality", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        const responseData = await response.json();
        displayResponse(responseData.response);
    });

    function displayResponse(response) {
        responseContainer.innerHTML = `<p>${response}</p>`;
        responseContainer.style.display = "block";
    }
});