const fileInput = document.getElementById("formFileLg");

const resultimage = document.getElementById("results-image");
var colorThief;

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
  colorThief = new ColorThief();
  const img = document.getElementById("results-image");
  if (img.complete) {
    createpaletteui();
  } else {
    resultimage.addEventListener("load", function () {
      createpaletteui();
    });
  }
}

function createpaletteui() {
  const img = document.getElementById("results-image");

  console.log(colorThief.getPalette(img, 6, 10));
  let palcolor = colorThief.getPalette(img, 6, 10);

  let paletterow = document.getElementById("paletterow");
  paletterow.innerHTML = ``;

  for (var i = 0; i < palcolor.length; i++) {
    let hexvalue = rgbToHex(palcolor[i][0], palcolor[i][1], palcolor[i][2]);
    paletterow.innerHTML += `<div onclick="copyhextoclip(this)"  style="background-color: ${hexvalue}; color: white" class="col-sm-12 col-md-12  col-lg-4 pt-2 pb-2">
    ${hexvalue}
    <br>
    rgb(${palcolor[i][0]},${palcolor[i][1]},${palcolor[i][2]})
</div>`;
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

function copyhextoclip(element) {
  // console.log(element.style.backgroundColor);
  // console.log(rgba2hex(element.style.backgroundColor));
  let hexclipboard = rgba2hex(element.style.backgroundColor);
  navigator.clipboard.writeText(hexclipboard);

  // display a toast to the user
  let toastLiveExample = document.getElementById("liveToast");
  document.getElementById(
    "toastmessage"
  ).innerHTML = `&#127912; ${hexclipboard} copied to clipboard`;
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
}

const rgba2hex = (rgba) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", "")
    )
    .join("")}`;

extractcolors();
