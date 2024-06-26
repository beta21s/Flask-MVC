$(document).ready(function () {

        $('.btnThongBao').click(function () {
            var canvasImage = document.getElementById("camera");
            var form = new FormData();
            form.append('data', canvasImage.toDataURL("image/png"));
            form.append('id_nguoi_dung', ID_DINH_DANH);
            $.ajax({
                url: "https://svn.vlute.edu.vn/api/knn/dinh-danh",
                type: "POST",
                data: form,
                processData: false,
                contentType: false,
                success: function (result) {
                    setTimeout(function () {
                        window.location.href = URL_LOGIN;
                    }, 15000);
                    console.log("Upload complete!");
                },
                error: function (error) {
                    window.location.href = '/';
                    console.log("Something went wrong!");
                }
            });
        });

        navigator.getMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        navigator.getMedia({video: true}, function () {
            let stTrangThai = false;
            var update_memory = pico.instantiate_detection_memory(5);
            var facefinder_classify_region = function (r, c, s, pixels, ldim) {
                return -1.0;
            };

            var cascadeurl = 'https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder';
            fetch(cascadeurl).then(function (response) {
                response.arrayBuffer().then(function (buffer) {
                    var bytes = new Int8Array(buffer);
                    facefinder_classify_region = pico.unpack_cascade(bytes);
                    console.log('* cascade loaded');
                })
            })

            var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');

            function rgba_to_grayscale(rgba, nrows, ncols) {
                var gray = new Uint8Array(nrows * ncols);
                for (var r = 0; r < nrows; ++r)
                    for (var c = 0; c < ncols; ++c)
                        gray[r * ncols + c] = (2 * rgba[r * 4 * ncols + 4 * c + 0] + 7 * rgba[r * 4 * ncols + 4 * c + 1] + 1 * rgba[r * 4 * ncols + 4 * c + 2]) / 10;
                return gray;
            }

            var processfn = function (video, dt) {
                ctx.drawImage(video, 0, 0);
                var rgba = ctx.getImageData(0, 0, 640, 480).data;
                hinhWEBCAM = rgba;
                image = {
                    "pixels": rgba_to_grayscale(rgba, 480, 640),
                    "nrows": 480,
                    "ncols": 640,
                    "ldim": 640
                }
                params = {
                    "shiftfactor": 0.1,
                    "minsize": 100,
                    "maxsize": 1000,
                    "scalefactor": 1.1
                }
                dets = pico.run_cascade(image, facefinder_classify_region, params);
                dets = update_memory(dets);
                dets = pico.cluster_detections(dets, 0.2);
                for (i = 0; i < dets.length; ++i)
                    if (dets[i][3] > 50.0) {
                        ctx.beginPath();
                        ctx.arc(dets[i][1], dets[i][0], dets[i][2] / 2, 0, 2 * Math.PI, false);
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = 'red';
                        ctx.stroke();
                    }
            }
            new camvas(ctx, processfn);

        }, function () {
            toastr.success("Vui lòng trang bị WEBCAM để sử dụng tính năng này.");
            setTimeout(function () {
                window.location.href = URL_Redirect;
            }, 5000);
        });

        function makeID(length = 12) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return 'WEB-' + result;
        }

        client = new Paho.MQTT.Client('peer.vlute.edu.vn', 3001, makeID());
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({onSuccess: onConnect, useSSL: true});

        function onConnect() {
            console.log("onConnect");
            client.subscribe('/dinh-danh/' + ID_DINH_DANH);
        }

        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
            }
        }

        function onMessageArrived(message) {
            if (String(message.destinationName).includes('/dinh-danh/' + ID_DINH_DANH)) {
                var result = message.payloadString;
                if(ID_DINH_DANH === result){
                    capNhanFaces(result)
                    toastr.success("Định danh với mã định danh " + result, "Thao tác thành công");
                    setTimeout(function () {
                        window.location.href = URL_Redirect;
                    }, 3000);
                }else{
                    toastr.error("Khuôn mặt không khớp với tài khoản đăng nhập", "Thao tác thành công");
                }
            }
        }
    });