let cover = document.querySelector('canvas');
let ctx = cover.getContext('2d');

let coverImage = new Image();
coverImage.src = 'http://lorempixel.com/g/300/300/';

let faceLoaded = false;

coverImage.onload = function () {
    faceLoaded = true;
    console.log('coverImage loaded');
    URL.revokeObjectURL(coverImage.src);
    updateCover()
};

let inputImage = document.querySelector('#selectImage');
inputImage.addEventListener('change', fileChange);

function fileChange(e) {
    coverImage.src = URL.createObjectURL(e.target.files[0]);
}

let inputColor = document.querySelector('#selectColor');

function updateCover() {

    // clear
    ctx.clearRect(0, 0, 300, 300);

    // gradient
    let gradient = ctx.createLinearGradient(300, 0, 0, 300);

    gradient.addColorStop(0, inputColor.value);
    gradient.addColorStop(0.6, inputColor.value);
    gradient.addColorStop(1, inputColor.value);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 300);

    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.5;

    if (faceLoaded) {
        ctx.drawImage(coverImage, 0, 0, 300, 300)
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

}

inputColor.addEventListener('input', updateCover);
inputColor.addEventListener('change', updateCover);

updateCover();

document.getElementById('downloadImage').addEventListener('click', function () {
    this.href = cover.toDataURL();
    this.download = 'Image.png';
}, false);

inputColor.value = '#dd007a';
