import presenter from '/static/js/screen/presenter.js';
let is_sharering = false;
var presenterObj = new presenter({
    iceServers: [
        {urls: "stun:stun.l.google.com:19302"},
    ],
    viewID: "09121996{{ taiKhoan.id_tai_khoan }}",
    pathSocketIO: 'https://peer.vlute.edu.vn/socket.io/socket.io.js',
    serverSocket: 'https://peer.vlute.edu.vn',
});

presenterObj.onStatusChanged = function () {
    if (!this.validPresenter) {

    }
    if (this.isConnected) {

    }

    if (this.sharingStream.display) {
    }
};

function startShare() {
    if (is_sharering === false) {
        presenterObj.startSharing({
            mechanism: 'streamserver',
            maxFrameRate: '15',
            screenSize: '1360*768',
            microphone: 'muted'
        });
        is_sharering = true;
    } else {
        toastr.error('Bạn đã chia sẽ màn hình. Vui lòng không thao tác chức năng này')
    }
}

document.getElementById("startShare").addEventListener("click", startShare);

window.startPresent = (options, startEvent, stopEvent, failedEvent) => {
    presenterObj.startSharing(options, startEvent, stopEvent, failedEvent);
}

window.stopPresent = (stopEvent) => {
    presenterObj.stopSharing(stopEvent);
}