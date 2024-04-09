var OV;
var session;
var OPENVIDU_SERVER_URL = "https://13.228.52.121";
var OPENVIDU_SERVER_SECRET = "truongtpa";
var dataRecording = '';

var configShareScreen = {
    audioSource: false,
    videoSource: 'screen',
    publishAudio: false,
    publishVideo: true,
    resolution: '1366x768',
    frameRate: 15,
};

function startShareScreen(shareID) {
    OV = new OpenVidu();
    session = OV.initSession();
    getToken(shareID).then(token => {
        session.connect(token)
            .then(() => {
                var publisher = OV.initPublisher(undefined, configShareScreen);
				session.publish(publisher);
                // publisher.once('accessAllowed', (event) => {
                //     publisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
                //         toastr.error("Vui lòng vui sẽ màn hình vì đây là yêu cầu bắt buộc");
                //         stopRecording(dataRecording.id);
                //         session.disconnect();
                //     });
                //      session.publish(publisher).then(function (){
                //          dataRecording = startRecording(shareID, "aaaaaaaa");
                //      });
                // });
                //
                // publisher.once('accessDenied', (event) => {
                //     toastr.error("Vui lòng vui sẽ màn hình vì đây là yêu cầu bắt buộc");
                // });

            })
            .catch(error => {
                toastr.error(error.message);
                console.log("There was an error connecting to the session:", error.code, error.message);
            });
    });
}

function viewShareScreen(shareID, element) {

    getToken(shareID).then(token => {
        session.connect(token)
            .then(() => {
                var publisher = OV.initPublisher(undefined, configShareScreen);
                publisher.once('accessAllowed', (event) => {
                    publisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
                        toastr.error("Vui lòng vui sẽ màn hình vì đây là yêu cầu bắt buộc");
                        stopRecording(dataRecording.id);
                        session.disconnect();
                    });
                     session.publish(publisher).then(function (){
                         dataRecording = startRecording(shareID, "aaaaaaaa");
                     });
                });

                publisher.once('accessDenied', (event) => {
                    toastr.error("Vui lòng vui sẽ màn hình vì đây là yêu cầu bắt buộc");
                });

            })
            .catch(error => {
                toastr.error(error.message);
                console.log("There was an error connecting to the session:", error.code, error.message);
            });
    });
}

function getToken(SessionID) {
    return createSession(SessionID).then(ID => createToken(ID));
}

function createSession(SessionID) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: OPENVIDU_SERVER_URL + "/openvidu/api/sessions",
            data: JSON.stringify({'customSessionId': SessionID, "recording": true,}),
            headers: {
                "Authorization": "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
                "Content-Type": "application/json"
            },
            success: response => resolve(response.id),
            error: (error) => {
                if (error.status === 409) {
                    resolve(SessionID);
                } else {
                    console.warn('No connection to OpenVidu Server.');
                }
            }
        });
    });
}

function createToken(SessionID) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + SessionID + '/connection',
            data: JSON.stringify({}),
            headers: {
                'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            },
            success: (response) => resolve(response.token),
            error: (error) => reject(error)
        });
    });
}

function startRecording(sessionID, name) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: OPENVIDU_SERVER_URL + '/openvidu/api/recordings/start',
            headers: {
                'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "session": sessionID,
                "name": name,
                "hasAudio": false,
                "hasVideo": true,
            }),
            success: function (data) {
                return data
            },
            error: (error) => reject(error)
        });
    });
}

function stopRecording(shareID) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: OPENVIDU_SERVER_URL + '/openvidu/api/recordings/stop/' + shareID,
            headers: {
                'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            },
            success: function (data) {
                console.log(data)
            },
            error: (error) => reject(error)
        });
    });
}