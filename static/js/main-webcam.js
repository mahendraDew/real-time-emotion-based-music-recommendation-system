var video = document.getElementById("vid");
var stream = null;

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (s) {
            stream = s;
            video.srcObject = stream;
            video.play();
            console.log("Accessing the camera: success")
        })
        .catch(function (error) {
            console.log("Error accessing the camera")
            console.log("Error:", error);
        });

    // Enable the predict button
    document.getElementById("predict_button").disabled = false;
}

function stopVideo() {
    if (stream != null) {
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
        video.pause();
    }
}

$('#emotion_button').click(function() {
    $('#emotion_form').submit();
}); 
