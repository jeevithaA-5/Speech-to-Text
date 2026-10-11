const textArea = document.getElementById("text");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const status = document.getElementById("status");

// Check browser support
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    status.textContent =
        "Speech recognition is not supported in this browser.";
} else {

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = function () {
        status.textContent = "🎤 Listening... Speak now!";
    };

    recognition.onresult = function (event) {

        let finalText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {

            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalText += transcript + " ";
            }
        }

        textArea.value += finalText;
    };

    recognition.onerror = function (event) {
        status.textContent = "Error: " + event.error;
    };

    recognition.onend = function () {
        status.textContent = "⏹ Speech recognition stopped.";
    };

    // Start speaking
    startBtn.addEventListener("click", function () {
        recognition.start();
    });

    // Stop speaking
    stopBtn.addEventListener("click", function () {
        recognition.stop();
    });
}

// Clear text
clearBtn.addEventListener("click", function () {
    textArea.value = "";
    status.textContent = "Text cleared.";
});

// Copy text
copyBtn.addEventListener("click", function () {

    if (textArea.value.trim() === "") {
        alert("There is no text to copy!");
        return;
    }

    navigator.clipboard.writeText(textArea.value);

    status.textContent = "✅ Text copied!";
});