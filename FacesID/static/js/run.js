function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    var from = "ấầẩẫậăắằẳẵặàáảãạäâèéẻẽẹëêếềểễệìíỉĩịïîýỳỷỹỵòóỏõọöôồốổỗộơớờởỡợùúủũụüưửữứừựûñçđ·/_,:;";
    var to = "aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiiyyyyyoooooooooooooooooouuuuuuuuuuuuuncd------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-'); //
    return str;
}

function select2_to_val_json(val) {
    var arr = [];
    for (j = 0; j < val.length; j++) {
        arr.push(val[j].id);
    }
    return JSON.stringify(arr);
}

$.fn.json_beautify = function () {
    var obj = JSON.parse(this.val());
    var pretty = JSON.stringify(obj, undefined, 4);
    this.val(pretty);
};

function imgError(image, path = '/static/images/ngoai-tuyen.png') {
    image.onerror = "";
    image.src = path;
    return true;
}

function validateIP(ipAddress) {
    ipv4Re = new RegExp('^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}', 'i');
    if (ipv4Re.test(ipAddress)) {
        return true;
    } else return false;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isDate(input) {
    var reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    return input.match(reg)
}

function isNULL(data) {
    if (data !== null && data !== '') {
        return false;
    }
    return true;
}

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