const fileInput = document.getElementById("formFileLg");

const resultimage = document.getElementById("results-image");

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = function () {
    resultimage.setAttribute("src", fileReader.result);
    extractcolors();
  };
});

function extractcolors() {
  const colorThief = new ColorThief();
  const img = document.getElementById("results-image");
  if (img.complete) {
    console.log(colorThief.getColor(img));
    console.log(colorThief.getPalette(img, 6, 10));
  } else {
    resultimage.addEventListener("load", function () {
      console.log(colorThief.getColor(img));
      console.log(colorThief.getPalette(img, 6, 10));
    });
  }
}

const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");
