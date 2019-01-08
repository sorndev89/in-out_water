(function() {

    function $(selector) {
        return document.querySelector(selector);
    }

    function reset(ev) {
        ev.preventDefault();
        alertify.reset();
    }

    function logDemo(selector) {
        (ga || function() {})("send", "event", "button", "click", "demo", selector);
    }

    function demo(selector, cb) {
        var el = $(selector);
        if (el) {
            el.addEventListener("click", function(ev) {
                ev.preventDefault();
                logDemo(selector);
                cb();
            });
        }
    }

    var ga = ga || function() {};
    // Ajax
    demo("#del", function(ev) {
        alertify.confirm("Confirm?ww22222222w", function(ev) {
            ev.preventDefault();
            alertify.alert("Successful AJAX afterddd22222222 OK");
        }, function(ev) {
            ev.preventDefault();
            alertify.alert("Successful AJAX afterff222222222f Cancel");
        });
    });
})();