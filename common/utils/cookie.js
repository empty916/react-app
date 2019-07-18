export const cookie = {
    set: function(c_name, value, mins) {
        let exdate = new Date();
        mins = mins == undefined ? 10000 : mins;
        exdate.setTime(exdate.getTime() + mins * 1000 * 60);
        document.cookie = c_name + '=' + escape(value) + ';expires=' + exdate.toGMTString() + ';path=/';
    },

    get: function(c_name) {
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(c_name + '=');
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                let c_end = document.cookie.indexOf(';', c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                let _val = unescape(document.cookie.substring(c_start, c_end));
                return _val == undefined || _val == 'undefined' ? '' : _val;
            }
        }
    },

    remove: function(c_name) {
        this.set(c_name, 1, -1);
    }
};