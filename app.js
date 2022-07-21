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
  console.log(colorThief.getColor(img));
  let domcolor = colorThief.getColor(img);
  let hexvalue = rgbToHex(domcolor[0], domcolor[1], domcolor[2]);

  document.getElementById("dominantcolordiv").innerHTML = `<div class="row">
    <div style="background-color: ${hexvalue}; color: white" class="col-12 pt-2 pb-2">
        ${hexvalue}
    </div>
  </div>`;
  console.log(colorThief.getPalette(img, 6, 10));
  let palcolor = colorThief.getPalette(img, 6, 10);
  let paletterow = document.getElementById("paletterow");
  paletterow.innerHTML = ``;

  for (var i = 0; i < palcolor.length; i++) {
    let hexvalue = rgbToHex(palcolor[i][0], palcolor[i][1], palcolor[i][2]);
    paletterow.innerHTML += `<div  style="background-color: ${hexvalue}; color: white" class="col-4 pt-2 pb-2">
    ${hexvalue}
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
