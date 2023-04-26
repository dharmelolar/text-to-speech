// select element from the dom

const text = document.getElementById("text");
const submitBtn = document.getElementById("submit");
const voiceSelect = document.getElementById("select");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");

//  declare empty variables

let voices = [];
let currentVoice;

// check for browser support

if ("speechSynthesis" in window) {
  console.log("Web speech API supported");
} else {
  console.log("Web speech API is not supported");
}

submitBtn.addEventListener("click", () => {
  let output = text.value;
  const utterThis = new SpeechSynthesisUtterance(output);
  utterThis.voice = currentVoice;
  
   // add piece of code here 
  
  utterThis.pitch = pitch.value;
  utterThis.rate = rate.value;
  speechSynthesis.speak(utterThis);
  speechSynthesis.speak(utterThis);
});

// add an onchnage event to change the pitch and rate based on selection

pitch.onchange = () => {
  pitchValue.textContent = pitch.value;
};

rate.onchange = ()=>{
  rateValue.textContent= rate.value
}

// declare a function that retrieves all the voices available in the API

const populateVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    let optionText = `${voice.name} (${voice.lang})`;
    if (voice.default) {
      optionText += " [default]";
    }
    option.textContent = optionText;
    option.value = voice.name;
    voiceSelect.appendChild(option);
  });
};
populateVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

voiceSelect.addEventListener("change", (event) => {
  const selectedVoice = event.target.value;
  currentVoice = voices.find((element) => {
    if (element.name === selectedVoice) {
      return element;
    }
  });
});
