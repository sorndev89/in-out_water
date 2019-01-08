var urlh = window.location.href + '#';
var hash = urlh.split('#')[1];
var url = urlh.split('#')[0];
var url_d = window.location;
var intrvl = setInterval(function() {
    $('#user-login:first').focus();
    clearInterval(intrvl);
}, 800);
$("#bt-user-login").attr("disabled", true);

function check() { var user = $("#user-login").val(); var pass = $("#pass-login").val(); if (user != '' && pass != '') { $("#bt-user-login").attr("disabled", false); } else { $("#bt-user-login").attr("disabled", true); } }
$("#user-login").keyup(function(e) { check() });
$("#pass-login").keyup(function(e) { check() });
$("#bt-user-login").click(function(e) {
    e.preventDefault();
    $("#bt-user-login").attr("disabled", true);
    var murl = $("#url").val();
    var user = $("#user-login").val();
    var pass = $("#pass-login").val();
    $('#processing').html('<span class="loading"><img src="' + murl + 'images/loading.svg" width="48" height="48"></span>');
    /*
    $.post(url + '/check_login', { user: user, pass: pass }, function(data) {
        //console.log(data);
        if (data == '1') {
            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
            $('.loading').fadeOut(2000);
            window.location = murl;
        } else { $('#processing').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>ບໍ່ສາມາດ ເຂົ້າສູ່ລະບົບໄດ້!</strong> <br> ຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ ຂອງທ່ານບໍ່ຖຶກຕ້ອງ!</div>'); }
    });
    */
    get_login();

    function get_login() {
        //console.log(user);
        $.ajax({
            url: url + '/check_login',
            type: "POST",
            data: { user: user, pass: pass },
            timeout: 6000, //6 secs, error method will be called if the response time is more than 5 secs
            success: function(data) {
                // console.log(data);
                if (data == '1') {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                    window.location = murl;
                } else { $('#processing').html('<div class="alert alert-danger alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><strong>ບໍ່ສາມາດ ເຂົ້າສູ່ລະບົບໄດ້!</strong> <br> ຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ ຂອງທ່ານບໍ່ຖຶກຕ້ອງ!</div>'); }

            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_login() } }
        });
    }


});
$('#user-login').keyup(function(event) { // check key enter
    if (event.keyCode == 13) {
        $('#bt-user-login').click();
    }
});
$('#pass-login').keyup(function(event) { // check key enter
    if (event.keyCode == 13) {
        $('#bt-user-login').click();
    }
});