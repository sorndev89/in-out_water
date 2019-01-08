var urlh = window.location.href + '#';
var hash = urlh.split('#')[1];
var url = urlh.split('#')[0];
var idview = hash.split(':')[1];
var hash_new = hash.split(':')[0];

var used_data = {
    user_id: '',
    user_name: '',
    user_permission: '',
    user_profile: '',
    user_sector: '',
    user_type: '',
    year: '',
    readonly: '',
    file_type: '',
    file_size: ''
};

get_data_used();

function get_data_used() {
    $.ajax({
        url: url + 'index.php/' + 'mg_data/get_data_login',
        data: {},
        timeout: 4000, //4 secs, error method will be called if the response time is more than 5 secs
        success: function(data) {
            var new_m = data.split('|X|');
            var db_user = $.parseJSON(new_m[0]);
            $.each(db_user, function(index, value) {
                used_data.user_id = value.id;
                used_data.user_name = value.name;
                used_data.user_permission = value.permission;
                used_data.user_profile = value.profile;
                used_data.user_sector = value.sector_id;
                used_data.user_type = value.user_type;
            });
            var db_setting = $.parseJSON(new_m[1]);
            $.each(db_setting, function(index, value) {
                used_data.file_type = value.file_type_upload;
                used_data.file_size = value.maxfile_size;
            });
            var db_year = $.parseJSON(new_m[2]);
            $.each(db_year, function(index, value) {
                used_data.year = value.name;
                used_data.readonly = value.data_used;
            });
            load_page();
        },
        error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_data_used() } }
    });
}

$(window).bind('hashchange', function() { load_page() });


//user.name = "aaaaa";



function load_page() {
    //var url = window.location;
    var urlh = window.location.href + '#';
    var hash = urlh.split('#')[1];
    var url = urlh.split('#')[0];
    var idview = hash.split(':')[1];
    var hash_new = hash.split(':')[0];

    //console.log(used_data.year + ' - Y');
    //// check permission /////
    /*
    ປະເພດສິດ
all = ເຫັນຂໍ້ມູນທຸກ User
rs = ເຫັນຂໍ້ມູນທຸກ user ພາຍໃນຂະແໜງ
rm = ເຫັນຂໍ້ມູນຂອງຕົນເອງ ພາຍໃນຂະແໜງ
ap = ມີສິດອານຸມັດເອກະສານ
ed = ມີສິດແກ້ໄຂ, ລຶບຂໍ້ມູນ    master_menu
*/
    $(".mi-rm").hide();
    $(".mi-rs").hide();
    $(".mi-ed").hide();
    $(".mi-ap").hide();
    $(".mi-setting").hide();
    $(".mi-admin").hide();

    //var ex = "all|rs|rm|ap|ed|";
    //var ex = "rs|rm|ap|ed|";
    //var ex = "rm|ap|ed|";
    //var ex = "ap|ed|";
    // var ex = "all|";
    // console.log(used_data.user_type);
    //used_data.user_type = "user";
    /*
    if (hash == '') {
        doc_home();
    } else {}

    */

    if (used_data.user_type == "user" || used_data.user_type == "ceo") {
        //alert('User');
        var newper = used_data.user_permission.split("|");
        var new_per_menu = [];
        //var newper = ex.split("|");
        for (var i = 0; i < newper.length; i++) {
            if (newper[i] == "rm") {
                new_per_menu += "rm|";
                // console.log("RM");

            }
        }

        for (var i = 0; i < newper.length; i++) {
            if (newper[i] == "rs") {
                new_per_menu += "rs|";
                // console.log("RS");


            }
        }

        for (var i = 0; i < newper.length; i++) {
            if (newper[i] == "ed") {
                new_per_menu += "ed|";
                //  console.log("Ed");

            }
        }

        for (var i = 0; i < newper.length; i++) {
            if (newper[i] == "ap") {
                new_per_menu += "ap|";
                //  console.log("Ap");

            }
        }

        for (var i = 0; i < newper.length; i++) {
            if (newper[i] == "all") {
                new_per_menu += "all|";
                //  console.log("All");

            }
        }

        //  console.log(new_per_menu);

        if (new_per_menu == 'rm|' || new_per_menu == 'rm|all|') {
            $(".mi-rm").show();
            if (hash == '') {
                doc_home(used_data);
            } else {

                switch (hash) {
                    case "doc-home":
                        doc_home(used_data);
                        do_check();
                        break;
                    case "doc-in":
                        doc_in(used_data);
                        do_check();
                        break;
                    case "doc-out":
                        doc_out(used_data);
                        do_check();
                        break;
                    case "doc-report":
                        doc_report(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        } else if (new_per_menu == 'ap|' || new_per_menu == 'ap|all|') {
            // $(".mi-rm").show();
            $(".mi-ap").show();
            if (hash == '') {
                doc_ap(used_data);
            } else {

                switch (hash) {
                    case "doc-ap":
                        doc_ap(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        } else if (new_per_menu == 'ed|' || new_per_menu == 'ed|all|') {
            $(".mu").hide();
            $(".mi-ed").show();
            if (hash == '') {
                doc_mg(used_data);
            } else {

                switch (hash) {
                    case "doc-mg":
                        doc_mg(used_data);
                        do_check();
                        break;
                    case "doc-trash":
                        doc_trash(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        } else if (new_per_menu == 'rm|rs|' || new_per_menu == 'rm|rs|all|' || new_per_menu == 'rs|' || new_per_menu == 'rs|all|') {
            $(".mi-setting").show();
            $(".mi-rs").show();
            $(".mi-rm").show();
            if (hash == '') {
                doc_home(used_data);
            } else {
                switch (hash) {
                    case "doc-home":
                        doc_home(used_data);
                        do_check();
                        break;
                    case "doc-in":
                        doc_in(used_data);
                        do_check();
                        break;
                    case "doc-out":
                        doc_out(used_data);
                        do_check();
                        break;
                    case "doc-report":
                        doc_report(used_data);
                        do_check();
                        break;
                    case "ad-doc":
                        ad_doc(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        } else if (new_per_menu == 'rm|ed|' || new_per_menu == 'rm|ed|all|') {
            $(".mi-rm").show();
            $(".mi-ed").show();
            if (hash == '') {
                doc_home(used_data);
            } else {
                switch (hash) {
                    case "doc-home":
                        doc_home(used_data);
                        do_check();
                        break;
                    case "doc-in":
                        doc_in(used_data);
                        do_check();
                        break;
                    case "doc-out":
                        doc_out(used_data);
                        do_check();
                        break;
                    case "doc-report":
                        doc_report(used_data);
                        do_check();
                        break;
                    case "ad-doc":
                        ad_doc(used_data);
                        do_check();
                        break;
                    case "doc-mg":
                        doc_mg(used_data);
                        do_check();
                        break;
                    case "doc-trash":
                        doc_trash(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        } else if (new_per_menu == 'rm|ap|' || new_per_menu == 'rm|ap|all|') {
            $(".mi-rm").show();
            $(".mi-ap").show();
            if (hash == '') {
                doc_home(used_data);
            } else {
                switch (hash) {
                    case "doc-home":
                        doc_home(used_data);
                        do_check();
                        break;
                    case "doc-in":
                        doc_in(used_data);
                        do_check();
                        break;
                    case "doc-out":
                        doc_out(used_data);
                        do_check();
                        break;
                    case "doc-report":
                        doc_report(used_data);
                        do_check();
                        break;
                    case "ad-doc":
                        ad_doc(used_data);
                        do_check();
                        break;

                    case "doc-ap":
                        doc_ap(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        } else if (new_per_menu == 'rm|ed|ap|' || new_per_menu == 'rm|ed|ap|all|') {
            $(".mi-rm").show();
            $(".mi-ed").show();
            $(".mi-ap").show();
            if (hash == '') {
                doc_home(used_data);
            } else {
                switch (hash) {
                    case "doc-home":
                        doc_home(used_data);
                        do_check();
                        break;
                    case "doc-in":
                        doc_in(used_data);
                        do_check();
                        break;
                    case "doc-out":
                        doc_out(used_data);
                        do_check();
                        break;
                    case "doc-report":
                        doc_report(used_data);
                        do_check();
                        break;
                    case "ad-doc":
                        ad_doc(used_data);
                        do_check();
                        break;
                    case "doc-mg":
                        doc_mg(used_data);
                        do_check();
                        break;
                    case "doc-trash":
                        doc_trash(used_data);
                        do_check();
                        break;
                    case "doc-ap":
                        doc_ap(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        } else if (new_per_menu == 'rm|rs|ed|' || new_per_menu == 'rm|rs|ed|all|' || new_per_menu == 'rs|ed|' || new_per_menu == 'rs|ed|all|') {
            $(".mi-setting").show();
            $(".mi-rs").show();
            $(".mi-rm").show();
            $(".mi-ed").show();
            if (hash == '') {
                doc_home(used_data);
            } else {
                switch (hash) {
                    case "doc-home":
                        doc_home(used_data);
                        do_check();
                        break;
                    case "doc-in":
                        doc_in(used_data);
                        do_check();
                        break;
                    case "doc-out":
                        doc_out(used_data);
                        do_check();
                        break;
                    case "doc-report":
                        doc_report(used_data);
                        do_check();
                        break;
                    case "ad-doc":
                        ad_doc(used_data);
                        do_check();
                        break;
                    case "doc-mg":
                        doc_mg(used_data);
                        do_check();
                        break;
                    case "doc-trash":
                        doc_trash(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        } else if (new_per_menu == 'rm|rs|ap|' || new_per_menu == 'rm|rs|ap|all|' || new_per_menu == 'rs|ap|' || new_per_menu == 'rs|ap|all|') {
            $(".mi-rs").show();
            $(".mi-rm").show();
            $(".mi-setting").show();
            $(".mi-ap").show();
            if (hash == '') {
                doc_home(used_data);
            } else {
                switch (hash) {
                    case "doc-home":
                        doc_home(used_data);
                        do_check();
                        break;
                    case "doc-in":
                        doc_in(used_data);
                        do_check();
                        break;
                    case "doc-out":
                        doc_out(used_data);
                        do_check();
                        break;
                    case "doc-report":
                        doc_report(used_data);
                        do_check();
                        break;
                    case "ad-doc":
                        ad_doc(used_data);
                        do_check();
                        break;
                    case "doc-ap":
                        doc_ap(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        } else if (new_per_menu == 'rm|rs|ed|ap|' || new_per_menu == 'rm|rs|ed|ap|all|' || new_per_menu == 'rs|ed|ap|' || new_per_menu == 'rs|ed|ap|all|') {
            $(".mi-setting").show();
            $(".mi-rs").show();
            $(".mi-rm").show();
            $(".mi-ed").show();
            $(".mi-ap").show();
            if (hash == '') {
                doc_home(used_data);
            } else {
                switch (hash) {
                    case "doc-home":
                        doc_home(used_data);
                        do_check();
                        break;
                    case "doc-in":
                        doc_in(used_data);
                        do_check();
                        break;
                    case "doc-out":
                        doc_out(used_data);
                        do_check();
                        break;
                    case "doc-report":
                        doc_report(used_data);
                        do_check();
                        break;
                    case "ad-doc":
                        ad_doc(used_data);
                        do_check();
                        break;
                    case "doc-mg":
                        doc_mg(used_data);
                        do_check();
                        break;
                    case "doc-trash":
                        doc_trash(used_data);
                        do_check();
                        break;
                    case "doc-ap":
                        doc_ap(used_data);
                        do_check();
                        break;
                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }

        } else if (new_per_menu == 'all|') {
            //$(".mi-setting").show();
            // $(".mi-rs").show();
            $(".mi-ap").show();
            $(".mi-rm").show();
            if (hash == '') {
                doc_home(used_data);
            } else {
                switch (hash) {
                    case "doc-home":
                        doc_home(used_data);
                        do_check();
                        break;
                    case "doc-in":
                        doc_in(used_data);
                        do_check();
                        break;
                    case "doc-out":
                        doc_out(used_data);
                        do_check();
                        break;
                    case "doc-report":
                        doc_report(used_data);
                        do_check();
                        break;

                    case "doc-ap":
                        doc_ap(used_data);
                        do_check();
                        break;

                    default:
                        $("#panel_title").html('');
                        $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                        break;
                }
            }
        }

    } else if (used_data.user_type == "admin") {

        // alert("admin");

        $(".mi-rm").show();
        $(".mi-rs").show();
        $(".mi-ed").show();
        $(".mi-ap").show();
        $(".mi-setting").show();
        $(".mi-admin").show();
        if (hash == '') {
            doc_home(used_data);
        } else {
            switch (hash) {
                case "doc-home":
                    doc_home(used_data);
                    do_check();
                    break;

                case "doc-in":
                    doc_in(used_data);
                    do_check();
                    break;

                case "doc-out":
                    doc_out(used_data);
                    do_check();
                    break;

                case "doc-ap":
                    doc_ap(used_data);
                    do_check();
                    break;

                case "doc-mg":
                    doc_mg(used_data);
                    do_check();
                    break;

                case "doc-trash":
                    doc_trash(used_data);
                    do_check();
                    break;

                case "doc-report":
                    doc_report(used_data);
                    do_check();
                    break;

                case "ad-system":
                    ad_system(used_data);
                    do_check();
                    break;

                case "ad-se":
                    ad_se(used_data);
                    do_check();
                    break;

                case "ad-doc":
                    ad_doc(used_data);
                    do_check();
                    break;

                case "ad-user":

                    ad_user(used_data);
                    do_check();
                    break;
                default:
                    $("#panel_title").html('');
                    $("#panel_body").html('<div class="alert alert-danger" role="alert"> <h4 class="alert-heading font-18"><i class="ti-alert"></i> ແຈ້ງເຕືອນຈາກລະບົບ!</h4> <p> URL ຂອງທ່ານບໍ່ຖືກຕ້ອງ, ທ່ານບໍ່ມີສິດ ເຂົ້າເຖິງຂໍ້ມູນ!</p> <p class="mb-0"> ສິດເຂົ້າເຖິງຂໍ້ມູນ ແມ່ນສະເພາະ ຜູ້ໃຊ້ທີ່ໄດ້ກຳນົດສິດ ເທົ່ານັ້ນ! </p> </div>');
                    break;
            }
        }
    }


    ///-------------------------
    ///-----------------------

    /*
        
    */
    //}

    //});


}


var tim = 0;

function do_check() {
    $.post(url + 'index.php/' + 'mg_data/check_session', {}, function(data) {
        if (data != 'in') {
            alertify.alert("ໝົດເວລາເຂົ້າລະບົບ! ກະລຸນາເຂົ້າສູ່ລະບົບໃໝ່");
            $(".ok").click(function(e) {
                e.preventDefault();
                window.location = url;
            });
            if (tim == 3) {
                window.location = url;
            }
            tim++;
        }
    });
}

function do_check() {
    $.ajax({
        url: url + 'index.php/' + 'mg_data/check_session',
        data: {},
        timeout: 6000,
        success: function(data) {
            //  console.log('Time Ok!');
            if (data != 'in') {
                alertify.alert("ໝົດເວລາເຂົ້າລະບົບ! ກະລຸນາເຂົ້າສູ່ລະບົບໃໝ່");
                $(".ok").click(function(e) {
                    e.preventDefault();
                    window.location = url;
                });
                if (tim == 2) {
                    window.location = url;
                }
                tim++;
            }
        },
        error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { do_check() } }
    });
}

function check_session() {
    var intrvl = setInterval(function() {
        do_check();
        check_session();
        clearInterval(intrvl);
    }, 60000);
    //1 min = 60000
}

check_session();