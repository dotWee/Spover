let canvas = document.querySelector('canvas'), context = canvas.getContext('2d'), canvasImage = new Image(), faceLoaded = false;
canvasImage.src = 'http://lorempixel.com/g/300/300/';
canvasImage.onload = function () {
    faceLoaded = true;
    console.log('canvasImage loaded');
    URL.revokeObjectURL(canvasImage.src);
    updateOverlay()
};

let inputImage = document.querySelector('#selectImage');
inputImage.addEventListener('change', function (e) {
    fileChange(e);
});

function fileChange(e) {
    canvasImage.src = URL.createObjectURL(e.target.files[0]);
    console.log("url=" + URL.createObjectURL(e.target.files[0]));
}

let inputColor = document.querySelector('#selectColor');
inputColor.addEventListener('input', function () {
    updateOverlay();
});
inputColor.addEventListener('change', function () {
    updateOverlay();
});

function updateOverlay() {

    // clear
    context.clearRect(0, 0, 300, 300);

    // gradient
    let gradient = context.createLinearGradient(300, 0, 0, 300);

    gradient.addColorStop(0, inputColor.value);
    gradient.addColorStop(0.6, inputColor.value);
    gradient.addColorStop(1, inputColor.value);

    context.fillStyle = gradient;
    context.fillRect(0, 0, 300, 300);

    context.globalCompositeOperation = 'multiply';
    context.globalAlpha = 0.5;

    if (faceLoaded) {
        context.drawImage(canvasImage, 0, 0, 300, 300)
    }

    context.globalCompositeOperation = 'source-over';
    context.globalAlpha = 1;

}

updateOverlay();

document.getElementById('downloadImage').addEventListener('click', function () {
    this.href = canvas.toDataURL();
    this.download = 'Image.png';
}, false);

inputColor.value = '#dd007a';
