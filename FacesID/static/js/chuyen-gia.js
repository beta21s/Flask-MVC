// Modal thu bài thi
$('.btnThemThuBai').click(function () {
    $('#mdNopBai > div > div > div.modal-header > h4').text("Thêm đợt nộp bài mới");
    $('#mdNopBai').modal('show');
    $('.btnLuuDotThuBai').attr("type", "insert");
});

$('.btnLuuDotThuBai').click(function () {
    var id_thu_bai = $(this).attr('data');
    var type = $(this).attr('type');
    switch (type) {
        case 'insert':
            $.ajax({
                url: putNopBaiThi,
                type: "PUT",
                data: {
                    'ten_dot': $('.ten_dot').val(),
                    'tg_bat_dau': $('.tg_bat_dau').val(),
                    'tg_ket_thuc': $('.tg_ket_thuc').val(),
                    'mo_ta': tinyMCE.get('mo_ta_nop_de').getContent()
                },
                success: function (result) {
                    if (result.status === 200) {
                        toastr.success(result.message, "Thao tác thành công");
                        setTimeout(function () {
                            location.reload();
                        }, 750);
                    } else {
                        toastr.error(result.message, "Thao tác thất bại");
                    }
                },
                error: function (error) {
                    toastr.error(error, "Thao tác thất bại");
                }
            });
            break;

        case 'update':
            $.ajax({
                url: postDotNopBaiThi,
                type: "POST",
                data: {
                    'id_thu_bai': id_thu_bai,
                    'ten_dot': $('.ten_dot').val(),
                    'tg_bat_dau': $('.tg_bat_dau').val(),
                    'tg_ket_thuc': $('.tg_ket_thuc').val(),
                    'mo_ta': tinyMCE.get('mo_ta_nop_de').getContent()
                },
                success: function (result) {
                    if (result.status === 200) {
                        toastr.success(result.message, "Thao tác thành công");
                        setTimeout(function () {
                            location.reload();
                        }, 750);
                    } else {
                        toastr.error(result.message, "Thao tác thất bại");
                    }
                },
                error: function (error) {
                    toastr.error(error, "Thao tác thất bại");
                }
            });
            break;
    }
});

$('.xoaDotThuBai').click(function () {
    if (!confirm('Bạn có muốn xóa thông tin đợt thu bài thi này không')) {
        return;
    }
    var id_thu_bai = $('.xoaDotThuBai').attr('data');
    $.ajax({
        url: deleteDotNopBaiThi,
        type: "DELETE",
        data: {
            'id_thu_bai': id_thu_bai,
        },
        success: function (result) {
            if (result.status === 200) {
                toastr.success(result.message, "Thao tác thành công");
                setTimeout(function () {
                    location.reload();
                }, 750);
            } else {
                toastr.error(result.message, "Thao tác thất bại");
            }
        },
        error: function (error) {
            toastr.error(error, "Thao tác thất bại");
        }
    });
});

$('.btnCapNhatNoiBai').click(function () {
    $('#mdNopBai > div > div > div.modal-header > h4').text("Cập nhật thông tin đợt nộp bài");
    var data = JSON.parse($(this).attr('data'));
    $('.ten_dot').val(data.ten_dot);
    tinymce.get('mo_ta_nop_de').setContent(data.mo_ta);
    $('.tg_bat_dau').val(moment.utc(data.tg_bat_dau).format("YYYY-MM-DDTHH:mm:ss"));
    $('.tg_ket_thuc').val(moment.utc(data.tg_ket_thuc).format("YYYY-MM-DDTHH:mm:ss"));
    $('#mdNopBai').modal('show');
    $('.btnLuuDotThuBai').attr("type", "update").attr('data', data.id_thu_bai);
});

function renderHTMLNopBai(tv=0) {
    $.ajax({
        url: jsonDSNopBaiTheoDot,
        type: "POST",
        data: {
            'id_thu_bai': ID_THU_BAI,
        },
        success: function (result) {
            var html = "";
            var url = "#";
            result.forEach(function (item) {
                if (item.checksum !== null) {
                    url = "/static/nop-bai/" + item.folder + "/" + item.ten_file;
                    htmlTV = ""
                    if(tv === 4 || tv === 0){
                        htmlTV ="<a href='" + url + "' target='_blank'>Tải về</a>"
                    }
                    html += "<tr>" +
                        "<td>" + item.ho_ten + "</td>" +
                        "<td>" + item.ten_doan + "</td>" +
                        "<td>" + item.checksum + "</td>" +
                        "<td>" + item.size_file + "</td>" +
                        "<td>" + item.ngay_tai_len + "</td>" +
                        "<td>" + htmlTV + "</td>" +
                        "</tr>";
                } else {
                    html += "<tr>" +
                        "<td>" + item.ho_ten + "</td>" +
                        "<td>" + item.ten_doan + "</td>" +
                        "<td colspan='4'><b>Chưa nộp bài thi</b></td>" +
                        "</tr>";
                }
            });
            $('.dsnop-bai tbody').empty().append(html);
        },
        error: function (error) {
            toastr.error(error, "Thao tác thất bại");
        }
    });
}

var ID_THU_BAI = null;
$('.ctNopBai').click(function () {
    $('#mdDSNopBai').modal("show");
    ID_THU_BAI = $(this).attr('data');
    var tv = parseInt($(this).attr('q'));
    renderHTMLNopBai(tv)
});


// Kết thúc modal thu bài thi

// Modal gán quyền vào máy tính ảo
$('.btnThayQuyen').click(function () {
    $('.btnLuuGanQuyen').attr('data', $(this).attr('data'));
    $('#mdPhanQuyenMayAo').modal('show');
});

$('.btnLuuGanQuyen').click(function () {
    var id_may_ao = $(this).attr('data');
    $.ajax({
        url: postGanQuyenMayAo,
        type: "POST",
        data: {
            'id_tai_khoan': $('.tkganquyen').val(),
            'id_may_ao': id_may_ao
        },
        success: function (result) {
            if (result.status === 200) {
                toastr.success(result.message, "Thao tác thành công");
                setTimeout(function () {
                    location.reload();
                }, 750);
            } else {
                toastr.error(result.message, "Thao tác thất bại");
            }
        },
        error: function (error) {
            toastr.error(error, "Thao tác thất bại");
        }
    });
});

// Modal cập nhật thông báo hội đồng thi
var id_de = 0;
$('.btnshow').click(function () {
    $('#md-tb').modal('show');
});

$('.cap-nhat').click(function () {
    id_de = $(this).attr('id_de');
    $('.cntende').val($(this).attr('tenfile'));
    var tgmo = moment.utc($(this).attr('tgmo'));
    var tgdong = moment.utc($(this).attr('tgdong'));
    $('.cntgmo').val(tgmo.format("YYYY-MM-DDTHH:mm:ss"));
    $('.cntgdong').val(tgdong.format("YYYY-MM-DDTHH:mm:ss"));
    $('.cntrangthai').val($(this).attr('show'));
    $('#mdCapNhatDeThi').modal('show');
});

$('.btnLuuTB').click(function () {
    $.ajax({
        url: capNhatThongBao,
        type: "POST",
        data: {
            'noidung': tinyMCE.get('noiDungTB').getContent()
        },
        success: function (result) {
            if (result.status === 200) {
                toastr.success(result.message, "Thao tác thành công");
                setTimeout(function () {
                    location.reload();
                }, 750);
            } else {
                toastr.error(result.message, "Thao tác thất bại");
            }
        },
        error: function (error) {
            toastr.error(error, "Thao tác thất bại");
        }
    });
});
// Kết thúc modal cập nhật thông báo hội đồng thi

// Modal quản lý đề thi
$('.btnUploadDe').click(function () {
    $('#mdUpDeThi').modal('show');
});

$('.btnLuuDe').click(function () {
    $.ajax({
        url: capNhatDe,
        type: "POST",
        data: {
            'id_de': id_de,
            'tieu_de': $('.cntende').val(),
            'thoi_gian_mo': $('.cntgmo').val(),
            'thoi_gian_dong': $('.cntgdong').val(),
            'hien_thi': $('.cntrangthai').val(),
        },
        success: function (result) {
            if (result.status === 200) {
                toastr.success(result.message, "Thao tác thành công");
                setTimeout(function () {
                    location.reload();
                }, 750);
            } else {
                toastr.error(result.message, "Thao tác thất bại");
            }
        },
        error: function (error) {
            toastr.error(error, "Thao tác thất bại");
        }
    });
});
// Kết thúc modal quản lý đề thi

$('.changeRDP').change(function () {
    var st = $(this).is(":checked");
    var hardware = $(this).attr("hardware");
    $.ajax({
        url: thayDoiRDP,
        type: "POST",
        data: {
            'hardware': hardware,
            'st': st,
        },
        success: function (result) {
            if (result.status === 200) {
                toastr.success(result.message, "Thao tác thành công");
            } else {
                toastr.error(result.message, "Thao tác thất bại");
            }
        },
        error: function (error) {
            toastr.error(error, "Thao tác thất bại");
        }
    });
});

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

client = new Paho.MQTT.Client('peer.vlute.edu.vn', 3001, makeID());
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess: onConnect, useSSL: true});

function onConnect() {
    console.log("onConnect");
    client.subscribe("/nofitication/" + TopicNghe);
    client.subscribe("/support/flag/" + TopicNghe);
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    if (String(message.destinationName).includes('/support/flag')) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "0",
            "hideDuration": "0",
            "timeOut": "0",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        var result = JSON.parse(message.payloadString)
        switch (result.co) {
            case 'codo':
                toastr.error(result.hoten + " cần hỗ trợ.", "Yêu cầu hỗ trợ");
                beep();
                break;

            case 'coxanh':
                toastr.success(result.hoten + " cần hỗ trợ.", "Yêu cầu hỗ trợ");
                beep();
                break;

            case 'covang':
                toastr.warning(result.hoten + " cần hỗ trợ.", "Yêu cầu hỗ trợ");
                beep();
                break;
        }
    }
}