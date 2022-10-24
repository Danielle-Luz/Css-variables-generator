function setInputColors () {
  const inputsColor = [...document.querySelectorAll("input[type=color]")];

  const colors = getLocalStorageColors();

  colors.forEach((style, index) => {
    inputsColor[index].value = style;
  });
}

function getLocalStorageColors () {
  while (true) {
    const colors = JSON.parse(localStorage.getItem("colors"));

    if (colors == null) {
      const defaultColors = [
        "#5f3dc4",
        "#7048e8",
        "#7950f2",
        "#845ef7",
        "#212529",
        "#495057",
        "#ced4da",
        "#f1f3f5",
        "#c92a2a",
        "#087f5b",
        "#f08c00",
        "#c6c7cd",
      ];

      localStorage.setItem("colors", JSON.stringify(defaultColors));

      continue;
    }

    return colors;
  }
}

function setFontScale () {
  const fontScaleInput = document.getElementById("fontScale");

  const fontScaleArray = 
  JSON.parse(localStorage.getItem("fontScale"))
  .filter(size => size != null)
  .map( size => size * 16);

  const fontScaleString = fontScaleArray.join(", ");

  fontScaleInput.value = fontScaleString;
}

function addEventToButtons () {
  const saveButton = document.querySelector(".button-save-colors");
  const copyButton = document.querySelector(".button-copy-colors");

  saveButton.addEventListener("click", event => {
    event.preventDefault();

    storeInputsColors();
    storeFontScale();
    changeButtonText(saveButton, "Saved");
  });
  copyButton.addEventListener("click", event => {
    event.preventDefault();

    copySettings();
    changeButtonText(copyButton, "Copied");
  });
}

function storeInputsColors () {
  const colors = getInputColors();

  localStorage.setItem("colors", JSON.stringify(colors));
}

function getInputColors () {
  const inputsColor = [...document.querySelectorAll("input[type=color]")];

  const colors = inputsColor.map(({value}) => value);

  return colors;
}

function storeFontScale () {
  const scaleSizes = getFontScale();

  localStorage.setItem("fontScale", JSON.stringify(scaleSizes));
}

function getFontScale () {
  const fontScaleInput = document.getElementById("fontScale").value;

  const scaleSizes = 
  fontScaleInput
  .split(/[,\s*]/g)
  .filter( size => size != "")
  .map( size => size / 16);

  return scaleSizes;
}

function copySettings () {
  const inputsColor = [...document.querySelectorAll("input[type=color]")];

  const colors = getInputColors();
  const fontScale = getFontScale();

  let colorVariables = "";
  let fontVariables = "";
  let rootVariables = "";

  inputsColor.forEach(
    (input, index) => {
      colorVariables += `--color-${input.id}: ${colors[index]};\n`;
    }
  );

  fontScale.forEach(
    (size, index) => {
      fontVariables += `--font-size-${index + 1}: ${size}rem;\n`;
    }
  );

  rootVariables = `${colorVariables}\n${fontVariables}`;
  
  navigator.clipboard.writeText(rootVariables);
}

function changeButtonText (button, text) {
  const buttonTextBefore = button.innerText;

  button.innerText = text;

  setTimeout(
    () => {
      button.innerText = buttonTextBefore;
    }, 3000
  );
}

setInputColors();

setFontScale();

addEventToButtons();