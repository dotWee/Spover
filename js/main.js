var cover = document.querySelector('canvas');
var ctx = cover.getContext('2d');

var face = new Image();
face.src = 'http://lorempixel.com/g/300/300/';

var faceLoaded = false;

face.onload = function () {
    faceLoaded = true;
    console.log('face loaded');
    URL.revokeObjectURL(face.src);
    updateCover()
};

var inputImage = document.querySelector('#selectImage');
inputImage.addEventListener('change', fileChange);

function fileChange(e) {
    face.src = URL.createObjectURL(e.target.files[0]);
}

var inputColor = document.querySelector('#selectColor');

function updateCover() {

    // clear
    ctx.clearRect(0, 0, 300, 300);

    // gradient
    var gradient = ctx.createLinearGradient(300, 0, 0, 300);

    gradient.addColorStop(0, inputColor.value);
    gradient.addColorStop(0.6, inputColor.value);
    gradient.addColorStop(1, inputColor.value);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 300);

    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.5;

    if (faceLoaded) {
        ctx.drawImage(face, 0, 0, 300, 300)
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
