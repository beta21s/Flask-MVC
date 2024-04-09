(function ($) {
    $.fn.atUploads = function( options ) {
        var version = "?v=" + Math.floor(Math.random() * 10000000000)
        var url_host = "https://svn.vlute.edu.vn/";
        var url_delete = url_host + "api/knn/images/removes/";
        var url_put = url_host + "api/knn/uploads/";
        var id_parent = "#" + $(this).attr('id');
        var id_choose_file = id_parent + "-choose-file";
        var settings = $.extend({
            folder: "",
            filename: "",
            checkface: 0,
            text: "Không có tiêu đề",
            url: url_host + "static/knn/" + options.folder + "/" + options.filename + version,
            isavatar: 0,
            is_upload: 0,
            is_delete: 0,
            dropedge: 0,
            event_upload_error: null
        }, options );

        $(this).attr('data', JSON.stringify(settings));
        const template_file = "<input type='file' class='hide' id='" + id_choose_file.replace("#", '') + "' accept='image/png, image/gif, image/jpeg'/>";
        const template_upload = template_file + "</div><div class='text-center at-item-uploads'><img src='data:image/png;base64,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'></div><p class='text-bold'>{title}</p>";
        const template_image = "<div><div class='div-upload-image'><img class='at-img-del' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO4SURBVFiFvZdLTFxlFMd/594LOMwAjS/AtEVNN5poiQYM6WYEFcpjIYsubOLKaNImfSVSNbEaF6alESxJXdi13ZjYBcXSSUA0gaYPom2qG1EibVJpFVs7U2Dm3u+4GB4zMJ17Qeh/de/Muef3/17n+z4hoG5t21YSKkq1qlAvsBXlSYQNACi3ERlX5TLC4MyM0/fY8PDdIHnFLyDR+GKl8exDorwJFAf0e0/hpPHsI2VD58ZWZUDr6kLxYvO+oAeAcEDwUqUQusIFUx/JmbHZwAbuROu22Lb7DchzqwRnSWFEkPbIwPlJXwPxV2uqMXIWeHwt4Bm6prZpLoldunpfA+mWe8PrAJ/XBEhtZk9Y8w8ajT5k297X6wgH2KzoKd2+pWiZgbg9/QFQvY5wAATqErOPfJzxnl5q6tq/svrZvlIlXfWe3TA4+psFYDz7kC+84glkY5VvZtlUBeWVfmGFNs5BAPl7+0ulRUm9Qb4iU15J4YmvwHFwj3Vizp7OGWY1tuLs7YCUS/LtnTB5I5+JxD2vuMIqmtWWvHBACgrBcUAsnL0dWE1ty+FNbWm4WOA4SEFBvpQA4ZCTaLZUqPeL1Ot/4H5+BNSkTezpwG5tX4S/1oKz5900XBXvi270+oRfWlAaHIGt/pFgYn24gLPvIIiFvWt/OkdyduE3VPGOd+H1nQqSEpDnJd5Qewt4NOAX6a5eaK2Zy5N+dnuOYvp7g6YCuGkBpSv5wvT3Zg3HYsu7VwoHKLP8YwJKfHf2nLKAf1f0QVNbxpibuZ4Q7F37cq4OH92xgPHA8KWz/Xj38tXR8npgusLvjqr8JKI1geD3me1Zq2P3AYCgK+GyhTDoFyWbqrK63e3pzAKYWB9uz9HF4di9P1DZRhmwpr3QaYF43rhkElIuGJMuxTlmu+nvxT3WmTaRctFUzhNYphLTpviMANxtqD0h8Fbe8PIKpKDQt8LJxs1oKgmTf+aNU/TLkoGL7wgsnIR+AXwL+Bpp1rZ5JhS7MG4BlA2dG0PoekBwFD4LxS6MQ8aJKPyP9yHwwwOAj0QKpz6Zf18wIKOjKZAdwLV15E8I0p55R8gqxZGB85Nqm+Z1MjGhRpuX3g2W7QUlsUtXjee9gPL9WpEVRkBqS767+PPS/3JuRqVDo3+Fi6YaUTkMJP8HO6nwaeThxMu5bkUQ4HI680rN0yljvSeibxDw1CwQN+hJx5bD87M9T2ww3YxGIyEn0YxKvQjVKE/B3PUcbiOMK/yIYTDizHwrsSuJIHn/A/NYeWJNjN7eAAAAAElFTkSuQmCC'><img class='img-anh' src='{url}'></div></div><p class='text-bold'>{title}</p>";

        // Sự kiện chọn file
        function suKienChonFile(){
            $(id_parent + " > .at-item-uploads").on('click', function (){
                $(id_choose_file).trigger('click');
            });
        }

        // Sự kiện tải ảnh lên
        function suKienTaiLenAnh(){
            $(id_choose_file).change(function () {
                formData = new FormData();
                formData.append("images", this.files[0]);
                formData.append("filename", settings.filename);
                formData.append("isavatar", settings.isavatar);
                formData.append("checkfaces", settings.checkface);
                formData.append("dropedge", settings.dropedge);
                $.ajax({
                    url: url_put + settings.folder,
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        if (result.status === 200) {
                            settings.url = url_host + result.message + version;
                            settings.is_upload = 1;
                            renderUI();
                        }else{
                            settings.event_upload_error(result.message)
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            });
        }

        // Sự kiện xóa ảnh
        function xoaAnh(){

            var r = confirm("Hình ảnh sẽ không thể phục hồi lại được?\nBạn vẫn muốn xóa? ");
            if (r !== true) {
                return;
            }

            var st = false;
            $.ajax({
                url: url_delete + settings.folder,
                type: "POST",
                async: false,
                data: {
                    'images': settings.filename,
                },
                success: function (result) {
                    if (result.status === 200) {
                        st = true;
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
            return st;
        }

        // Tạo giao diện upload ảnh
        function UIUpload(){
            $(id_parent).empty();
            $(id_parent).append(template_upload.replace('{title}', settings.text));
            suKienChonFile();
            suKienTaiLenAnh();
        }

        // Tạo giao diện hiển thị ảnh
        function UITonTaiAnh(){
            $(id_parent).empty();
            tmp = template_image.replace('{url}', settings.url);
            tmp = tmp.replace('{title}', settings.text);
            $(id_parent).append(tmp);
            if(settings.is_delete){
                $(id_parent).find("img.at-img-del").remove();
            }
            $(id_parent).find("img.at-img-del").on('click', function (){
                if(xoaAnh()){
                    $(id_parent).empty().append(template_upload.replace('{title}', settings.text));
                    suKienChonFile();
                    suKienTaiLenAnh();
                }
            });
        }

        // Tạo giao diện
        function renderUI(){
            const img = new Image();
            img.src = settings.url;
            if (img.complete) {
                UITonTaiAnh();
                settings.is_upload = 1;
            }else{
                img.onload = () => {
                    UITonTaiAnh();
                    settings.is_upload = 1;
                };
                img.onerror = () => {
                    UIUpload();
                    settings.is_upload = 0;
                };
            }
        }

        renderUI();

        return {
            isUpload: function (){
                return settings.is_upload;
            }
        }

    };
}( jQuery ));
