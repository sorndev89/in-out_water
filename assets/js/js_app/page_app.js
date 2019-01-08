var urlh = window.location.href + '#';
var hash = urlh.split('#')[1];
var url = urlh.split('#')[0];
var url_d = window.location;
/// Home page ---------------------------
function doc_home(used_data) {

    var title = '<div class="header-top" style="margin-bottom: 15px;"> <span class="pull-left"> <h4 class="mt-0 m-b-15 header-title"> <h5> <i class="ti-menu-alt"></i> ລາຍການ ເອກະສານປະຈຳເດືອນ </h5></h4> </span> <span class="pull-right col-md-4"> <div class="input-group"> <span class="input-group-addon " > <i class="fa fa-search "></i></span> <input type="text" class="form-control " id="search_document" placeholder="ຄົ້ນຫາເອກະສານ..."> <div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;" id="processing"> </div> </div> </span> <div class="clearfix"></div>';
    var body = ' <div class="table-responsive" id="show-data-list"> <p> <nav aria-label="Page navigation"> <ul class="pagination justify-content-end" id="user-pagination"> </ul> </nav> </p> <table class="table table-hover mb-0"> <thead> <tr> <th width="140" class="text-center">ເລກທີ່ບັນທຶກ</th> <th>ຊື່ເອກະສານ</th> <th width="120" class="text-center">ລາຍລະອຽດ</th> </tr> </thead> <tbody id="list-file-doc"> </tbody> </table> </div><div class="modal fade bs-example-modal-lg" id="preview_doc" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="title-doc-detail"> </h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body" id="data-doc"> </div> </div> </div> </div> </div>';

    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = body;


    var doc_data = {
        user: '',
        sector: '',
        grono: '',
        doc: '',
        re_doc: '',
        doc_search: '',
        doc_user: '',
        renew_data: function() {
            if (used_data.user_type == 'admin' || used_data.user_type == 'ceo') {
                this.re_doc = this.doc;
                this.pagination();
            } else if (used_data.user_type == 'user') {

                var newper = used_data.user_permission.split('|');
                var new_per = [];

                for (var i = 0; i < newper.length; i++) {
                    if (newper[i] == "rm") {
                        new_per += "rm|";
                    }
                }

                for (var i = 0; i < newper.length; i++) {
                    if (newper[i] == "rs") {
                        new_per += "rs|";
                    }
                }

                for (var i = 0; i < newper.length; i++) {
                    if (newper[i] == "all") {
                        new_per += "all|";
                    }
                }

                if (new_per == 'rm|') {
                    var renew = [];
                    var new_data = JSON.parse(this.doc);
                    $.each(new_data, function(index, value) {
                        if (used_data.user_id == value.user_id) {

                            var doc_add = {
                                "id": value.id,
                                "user_id": value.user_id,
                                "num_in": value.num_in,
                                "docex": value.docex,
                                "doc_in_out": value.doc_in_out,
                                "name": value.name,
                                "detail": value.detail,
                                "file_scan": value.file_scan,
                                "doc_type": value.doc_type,
                                "doc_from": value.doc_from,
                                "doc_to": value.doc_to,
                                "doc_from_type": value.doc_from_type,
                                "sector_type": value.sector_type,
                                "doc_approve": value.doc_approve,
                                "doc_view": value.doc_view,
                                "status": value.status,
                                "date": value.date
                            };
                            renew.push(doc_add);

                        }
                    });

                    var newa = JSON.stringify(renew);
                    this.re_doc = newa;
                    // console.log(newa);
                    this.pagination();

                } else if (new_per == 'rs|' || new_per == 'rm|rs|') {
                    var renew = [];
                    var new_data = JSON.parse(this.doc);
                    $.each(new_data, function(index, value) {
                        if (used_data.user_sector == value.sector_type) {

                            var doc_add = {
                                "id": value.id,
                                "user_id": value.user_id,
                                "num_in": value.num_in,
                                "docex": value.docex,
                                "doc_in_out": value.doc_in_out,
                                "name": value.name,
                                "detail": value.detail,
                                "file_scan": value.file_scan,
                                "doc_type": value.doc_type,
                                "doc_from": value.doc_from,
                                "doc_to": value.doc_to,
                                "doc_from_type": value.doc_from_type,
                                "sector_type": value.sector_type,
                                "doc_approve": value.doc_approve,
                                "doc_view": value.doc_view,
                                "status": value.status,
                                "date": value.date
                            };
                            renew.push(doc_add);

                        }
                    });

                    var newa = JSON.stringify(renew);
                    this.re_doc = newa;
                    //console.log(newa);
                    this.pagination();
                } else if (new_per == 'all|' || new_per == 'rm|all|' || new_per == 'rs|all|' || new_per == 'rm|rs|all|') {
                    this.re_doc = this.doc;
                    this.pagination();
                }


            }
        },
        fdate: function(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [day, month, year].join('/');
        },
        pagi_page: '20',
        pagination: function(page) {

            if (this.doc != '') {
                if (page == null) { page = 1; }
                var new_data = JSON.parse(this.re_doc);
                //var permission = JSON.parse(this.permission_data);
                var stop = page * this.pagi_page;
                var start = stop - this.pagi_page;
                var page_per = Math.ceil(new_data.length / this.pagi_page);
                var act = '';
                $('#list-file-doc').html('');
                for (var i = 0; i < new_data.length; i++) {
                    if (i >= start) {
                        if (i < stop) {
                            $('#list-file-doc').append('<tr> <td class="text-center"> ' + new_data[i].num_in + ' </td> <td> ' + new_data[i].name + ' </td> <td class="text-center"> <a style="font-size:20px;" class="pre-doc-detail" data="' + new_data[i].id + '"><i class="ti-wallet"></i></a></td> </tr>');
                        }
                    }
                }
                $("#user-pagination").html('');
                for (var j = 1; j < page_per + 1; j++) {
                    if (page == j) {
                        $("#user-pagination").append('<li  class="page-item active go-doc-page" data="' + j + '" > <a class="page-link" >' + j + ' </a></li>');
                    } else {
                        $("#user-pagination").append('<li  class="page-item  go-doc-page" data="' + j + '" > <a class="page-link" >' + j + ' </a></li>');
                    }
                }
            } //// end if data = ''

            $(".go-doc-page").click(function(e) {
                e.preventDefault();
                var page = $(this).attr("data");
                doc_data.pagination(page);
            });

            $(".pre-doc-detail").click(function(e) {
                e.preventDefault();
                var data = $(this).attr("data");
                $("#preview_doc").modal('show');
                var data_doc = JSON.parse(doc_data.re_doc);
                var sector = JSON.parse(doc_data.sector);
                var grono = JSON.parse(doc_data.grono);
                var user = JSON.parse(doc_data.user);
                var grono_d = '';
                var sector_form = '';
                var sector_to = '';
                var doc_sector = '';
                var title_icon = '';
                // var newdate = ''; doc_data.user
                var byuser = '';
                $.each(data_doc, function(index, value) {
                    if (data == value.id) {
                        if (value.doc_from_type == 'inside') { var side = "ພາຍໃນ"; } else { var side = "ພາຍນອກ"; }
                        $.each(grono, function(index, gno) {
                            if (value.doc_type == gno.id) { grono_d = gno.name; }
                        });
                        $.each(sector, function(index, st) {
                            if (value.doc_from == st.id) { sector_form = st.name; }
                            if (value.doc_to == st.id) { sector_to = st.name; }
                        });
                        $.each(user, function(index, nuser) {
                            if (value.user_id == nuser.id) { byuser = nuser.name; }
                        });

                        if (value.doc_in_out == 'in') { title_icon = ' <i class="ti-angle-double-right"></i> ຂາເຂົ້າ: '; } else { title_icon = ' <i class="ti-angle-double-left"></i> ຂາອອກ: '; }
                        $.each(sector, function(index, dsec) {
                            if (value.sector_type == dsec.id) { doc_sector = dsec.name; }
                        });
                        $("#title-doc-detail").html(title_icon + doc_sector);

                        // console.log(doc_data.fdate(value.date));
                        // console.log(grono_d);

                        // console.log(value.date);
                        if (value.docex == '') {
                            if (value.detail == '') {
                                $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_in + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table>  <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + byuser + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                            } else {
                                $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_in + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table>  <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + byuser + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> <div style="padding: 10px;"> <strong>ລາຍລະອຽດ:</strong> ' + value.detail + ' </div> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                            }
                        } else {
                            if (value.detail == '') {
                                $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_in + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ເອກະສານ:</strong></td> <td class="mbody">' + value.docex + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + byuser + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + doc_data.fdate(value.date) + ' </td> </tr> </table> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                            } else {
                                $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_in + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ເອກະສານ:</strong></td> <td class="mbody">' + value.docex + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + byuser + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + doc_data.fdate(value.date) + ' </td> </tr> </table> <div style="padding: 10px;"> <strong>ລາຍລະອຽດ:</strong> ' + value.detail + ' </div> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                            }
                        }
                        // console.log(value.file_scan);
                        if (value.file_scan != null && value.file_scan != '') {
                            var file = [];
                            var file_db = value.file_scan.split("||");
                            // console.log(file_db);
                            for (let i = 0; i < file_db.length; i++) {
                                if (file_db[i] != '') {
                                    // console.log(file_db[i]);

                                    var fm = file_db[i].split('.');
                                    if (fm[1] == 'pdf' || fm[1] == 'PDF') {
                                        file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-pdf.png" width="64"> </a>';
                                    } else if (fm[1] == 'jpg' || fm[1] == 'JPG') {
                                        file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-jpg.png" width="64"> </a>';
                                    } else if (fm[1] == 'jpeg' || fm[1] == 'JPEG') {
                                        file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-jpg.png" width="64"> </a>';
                                    } else if (fm[1] == 'png' || fm[1] == 'PNG') {
                                        file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-png.png" width="64"> </a>';
                                    }
                                }

                            }
                        }
                        //console.log(file);
                        $("#file-at").html(file);
                        $(".pwfile").click(function(e) {
                            e.preventDefault();
                            var dt = $(this).attr("data");
                            //console.log(dt);
                            var sfile = dt.split('.');
                            if (sfile[1] == 'pdf') {
                                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                                    //alert('m');
                                    $('#sh-file').html('<form method="get" action="' + url + 'file_upload/' + dt + '"><center><button type="submit" class="btn btn-default" ><i class="fa fa-file-pdf-o"></i> ດາວໂຫລດເອກະສານ PDF</button></center></form>');

                                } else {
                                    $('#sh-file').html('<object data="' + url + 'file_upload/' + dt + '" type="application/pdf" width="100%" height="500"></object>');
                                }
                            } else {
                                $('#sh-file').html('<image src="' + url + 'file_upload/' + dt + '" width="100%" >');
                            }
                        });
                    }
                });


            });

        }
    };




    var dt = new Date();
    var month = dt.getMonth() + 1;
    var year = used_data.year;

    get_db_list_doc();

    function get_db_list_doc() {
        $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_doc_sector_grono', month: month, year: year },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                var new_m = data.split('|X|');
                doc_data.grono = new_m[0];
                doc_data.sector = new_m[1];
                doc_data.user = new_m[2];
                doc_data.doc = new_m[3];

                //console.log(doc_data.doc);
                doc_data.renew_data();
                //doc_data.pagination();
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_db_list_doc() } }
        });
    }




    $("#search_document").click(function(e) {
        e.preventDefault();
        //alert("Search");
        var year = used_data.year;
        if (doc_data.doc_search == '') {
            get_search();
        }

        function get_search() {
            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
            $.ajax({
                url: url + 'index.php/' + 'mg_data/get_data',
                type: "POST",
                data: { get_db: 'db_doc_search', year: year },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                    doc_data.doc_search = data;
                    //console.log(data);
                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_search() } }
            });
        }
    });

    $("#search_document").keyup(function(e) {
        var db_data = JSON.parse(doc_data.doc_search);
        var key = $(this).val();
        if (key == '') {
            doc_data.renew_data();
        } else {
            var renew = [];
            $.each(db_data, function(index, value) {
                if (value.name.search(new RegExp(key, 'i')) != -1 || value.docex.search(new RegExp(key, 'i')) != -1 || value.num_in.search(new RegExp(key, 'i')) != -1) {
                    var doc_add = {
                        "id": value.id,
                        "user_id": value.user_id,
                        "num_in": value.num_in,
                        "docex": value.docex,
                        "doc_in_out": value.doc_in_out,
                        "name": value.name,
                        "detail": value.detail,
                        "file_scan": value.file_scan,
                        "doc_type": value.doc_type,
                        "doc_from": value.doc_from,
                        "doc_to": value.doc_to,
                        "doc_from_type": value.doc_from_type,
                        "sector_type": value.sector_type,
                        "doc_approve": value.doc_approve,
                        "doc_view": value.doc_view,
                        "status": value.status,
                        "date": value.date
                    };
                    renew.push(doc_add);
                    return;
                }
            });
            var newa = JSON.stringify(renew);
            doc_data.re_doc = newa;
            doc_data.pagination();
        }
    });



}
//// end hone page -----------------------



/// Doc-in page ---------------------------
function doc_in(used_data) {


    var title = '<div class="header-top"><span class="pull-left"><h4 class="mt-0 m-b-15 header-title"> <h5> <i class="ti-angle-double-right"></i> ບັນທຶກເອກະສານ ຂາເຂົ້າ </h5></h4></span> <span class="pull-right text-right"> <button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-save-docin"> <i class="ti-save"></i> ບັນທຶກ </button> <button type="button" class="btn btn-outline-danger waves-effect waves-light" id="bt-cancel-docin"> <i class="ti-close"></i> ລ້າງຂໍ້ມູນ</button> <div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;" id="processing"></div></span><div class="clearfix"></div></div>';
    var body = ' <div class="row"> <div class="col-sm-6 col-md-6 col-lg-6"><strong>  <h5><i class="ti-file"></i> ຂໍ້ມູນເອກະສານ</h5> </strong> <div class="progress progress-striped"> <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="process-bar-doc" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> <form class="form"> <div class="form-group"></div> <div class="form-group" style="width: 180px;"> <div class="input-group"> <div class="input-group-addon"> ເລກທີ່ ຂາເຂົ້າ: </div><input type="text" id="num-docin" class="form-control" value="" data=""></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຊື່ເອກະສານ: </div><input type="text" id="name-docin" class="form-control" placeholder=" ຊື່ເອກະສານ.... "></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ເລກທີ່ເອກະສານ: </div><input type="text" id="ndoc-docin" class="form-control" placeholder="ເລຫທີ່ ສະຖານທີ່, ວວ ດດ ປປປປ"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ທີ່ມາຂອງເອກະສານ: <input type="radio" name="dc-t" checked id="docin-type-select-in" data="inside"> ພາຍໃນ <input type="radio" name="dc-t" id="docin-type-select-out" data="outside"> ພາຍນອກ </div> </div> </div> <p> <div class="form-inline num_manual"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ໝວດເອກະສານ: </div><select class="form-control" id="doc-type-docin"></select></div> </div> </div> </p> <p> <div class="form-inlines"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon "> ຈາກພາກສ່ວນ: </div><select class="form-control" id="form-sector-docin"></select></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ເຖິງພາກສ່ວນ: </div><select class="form-control" id="to-sector-docin"></select></div> </div> </div> </p> <div class="form-group" style="width: 200px;"> <div class="input-group"> <div class="input-group-addon"> ວັນທີ່ບັນທຶກ: </div><input type="text" class="form-control" id="docin-date" readonly value="23/12/2018"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຜູ້ບັນທຶກ: </div><input type="text" class="form-control" id="save-docin-by" readonly value="admin"></div> </div>ລາຍລະອຽດເພີ່ມເຕີມ:<textarea name="" id="docin-detail" class="form-control" rows="5" required="required"></textarea></form> </div> <div class="col-sm-6 col-md-6 col-lg-6" id="upload-file"> <input type="hidden" class="file_upload" value=""><strong> <h5> <i class="ti-clip"></i> ໄຟລ໌ເອກະສານອັບໂຫລດ</h5>  </strong> <ul class="list-group list_file"> </ul> <p><span id="output"></span><span class="sh_img"></span></p> <div class="progress progress-striped upload-bar" style="display: none;"> <p> <div class="progress-bar progress-bar-striped progress-bar-animated up-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> </p> <form id="form_upload"><input type="file" name="file_upload" style="display: none;" id="f_upload"></form> <P class="text-center"><button type="button" class="btn btn-success waves-effect waves-light" onclick="$(\'#f_upload\').click()"> <i class="ti-export"></i> ເລືອກໄຟລ໌ເອກະສານ</button></P> </div> <div class="col-sm-12" id="last-docin" style="display:none;"> <strong> <h5> <i class="ti-list"></i> ລາຍການບັນທຶກ ລ່າສຸດ</h5>  </strong> <div class="table-responsive" id="show-data-list"> <table class="table table-hover mb-0"> <thead> <tr> <th width="140" class="text-center">ເລກທີ່ບັນທຶກ</th> <th>ຊື່ເອກະສານ</th> <th width="120" class="text-center">ລາຍລະອຽດ</th> </tr> </thead> <tbody id="list-file-doc"> </tbody> </table> </div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_file" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="myLargeModalLabel"><i class="ti-export"></i> ໄຟລ໌ທີ່ທ່ານອັບໂຫລດ</h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body sh_file"></div> </div> <div class="modal-footer"><button type="button" class="btn btn-default btn_print" data=""> <span class="glyphicon glyphicon-print" aria-hidden="true"></span> ສັ່ງພິມ</button></div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_doc" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="title-doc-detail"> </h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body" id="data-doc"> </div> </div> </div> </div> </div>';


    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = body;

    var dt = new Date();
    var d = dt.getDate();
    var m = dt.getMonth() + 1;
    var y = dt.getFullYear();
    var fdt = d + "/" + m + "/" + y;

    $("#bt-save-docin").attr("disabled", true);
    $("#save-docin-by").val(used_data.user_name);
    $("#docin-date").val(fdt);


    var t = false;
    var uper = used_data.user_permission.split("|");

    for (let i = 0; i < uper.length; i++) {
        if (uper[i] == 'all' || uper[i] == 'rs' || uper[i] == 'rm' || uper[i] == 'ed') {
            t = true;
        }

    }

    // console.log(t);
    // console.log(used_data.user_sector);

    var docin_form = {
        sector: "",
        grono: "",
        num_doc: "",
        file_upload: "",
        side: "inside",
        doc_last_add: []
    }

    ///// get data /////----------------------------



    get_sector_db_docin();

    function get_sector_db_docin() {
        $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_sector' },
            timeout: 6000,
            success: function(data) {
                // $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                // $('.loading').fadeOut(2000);
                docin_form.sector = data;
                get_grono_db_docin();

                function get_grono_db_docin() {
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
                    $.ajax({
                        url: url + 'index.php/' + 'mg_data/get_data',
                        type: "POST",
                        data: { get_db: 'db_grono_doc' },
                        timeout: 6000,
                        success: function(data) {
                            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                            $('.loading').fadeOut(2000);
                            docin_form.grono = data;
                            get_sector_docin();
                        },
                        error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_grono_db_docin() } }
                    });
                }
                //get_sector_docin();
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_sector_db_docin() } }
        });
    }



    //  var sector_db = {
    //      data: ""
    // }

    function check_docin() {
        if (docin_form.num_doc == '') {
            var num_docin = $("#num-docin").val();
        } else {
            var num_docin = docin_form.num_doc;
        }
        var name_docin = $("#name-docin").val();
        var ndoc_docin = $("#ndoc-docin").val();
        var doc_type_docin = $("#doc-type-docin").val();
        var form_sector_docin = $("#form-sector-docin").val();
        var to_sector_docin = $("#to-sector-docin").val();
        var docin_date = $("#docin-date").val();
        var save_docin_by = $("#save-docin-by").val();
        var docin_detail = $("#docin-detail").val();
        var file_upliad = docin_form.file_upload;
        // console.log(num_docin);
        var a = 0,
            b = 0,
            c = 0,
            d = 0,
            e = 0,
            f = 0,
            g = 0,
            h = 0,
            i = 0,
            k = 0;

        if (num_docin == '') { a = 0; } else { a = 11.2; }
        if (name_docin == '') { b = 0; } else { b = 11.2; }
        if (ndoc_docin == '') { c = 0; } else { c = 11.2; }
        if (doc_type_docin == '') { e = 0; } else { e = 11.2; }
        if (form_sector_docin == '') { f = 0; } else { f = 11.2; }
        if (to_sector_docin == '') { g = 0; } else { g = 11.2; }
        if (docin_date == '') { h = 0; } else { h = 11.2; }
        if (save_docin_by == '') { i = 0; } else { i = 11.2; }
        if (file_upliad == '') { k = 0; } else { k = 11.2; }

        process_percen = a + b + c + d + e + f + g + h + i + k;
        $("#process-bar-doc").attr('style', 'width: ' + process_percen + '%;');
        if (process_percen < 99) {
            $("#bt-save-docin").attr("disabled", true);
        } else { $("#bt-save-docin").attr("disabled", false); }
        check_num_doc();
    }

    function get_sector_docin() {
        if ($('#docin-type-select-in').is(':checked')) {
            $("#form-sector-docin").html('');
            var sector = JSON.parse(docin_form.sector);
            $.each(sector, function(index, value) {
                if (value.sector_type != "ou" && value.id != used_data.user_sector) {
                    $("#form-sector-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                }
            });
        } else if ($('#docin-type-select-out').is(':checked')) {
            $("#form-sector-docin").html('');
            var sector = JSON.parse(docin_form.sector);
            $.each(sector, function(index, value) {
                if (value.sector_type == "ou" && value.id != used_data.user_sector) {
                    $("#form-sector-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                }
            });
        }



        if (used_data.user_type == 'admin') {
            $("#to-sector-docin").html('');
            var sector = JSON.parse(docin_form.sector);
            $.each(sector, function(index, value) {
                if (value.sector_type != "ou") {
                    $("#to-sector-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                }
            });
            get_docin_grono();
            check_docin();
        } else {
            $("#to-sector-docin").html('');
            var sector = JSON.parse(docin_form.sector);
            $.each(sector, function(index, value) {
                if (used_data.user_sector == value.id) {
                    if (value.sector_type != "ou") {
                        $("#to-sector-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                    }
                }
            });
            get_docin_grono();
            check_docin();
        }
    }

    function get_docin_grono() {
        $("#doc-type-docin").html('');
        var sector_id = $("#to-sector-docin").val();
        var grono = JSON.parse(docin_form.grono);
        $.each(grono, function(index, value) {
            if (sector_id == value.sector_id) {
                if (value.grono_type == "in") {
                    $("#doc-type-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                }
            }
        });
    }


    $("#bt-cancel-docin").click(function(e) {
        e.preventDefault();
        clear_form();
    });

    function clear_form() {
        docin_form.file_upload = '';
        $("#name-docin").val('');
        $("#ndoc-docin").val('');
        $("#docin-detail").val('');
        check_docin();
        $(".flit").remove();
    }

    function check_num_doc() {
        var grono = $("#doc-type-docin").val();
        var year = used_data.year;
        var sector = $("#to-sector-docin").val();

        check_num_doc_db();

        function check_num_doc_db() {
            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
            $.ajax({
                url: url + 'index.php/' + 'mg_data/get_data',
                type: "POST",
                data: { get_db: 'db_check_doc_num', year: year, sector: sector, grono: grono, doc_in_out: 'in' },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);

                    var get_num = JSON.parse(data);
                    if (get_num == 0) {
                        if ($("#num-docin").val() == null) {
                            $("#num-docin").val('');
                            var intrvl = setInterval(function() {
                                $('#num-docin:first').focus();
                                clearInterval(intrvl);
                            }, 800);
                        }
                        $("#num-docin").attr("disabled", false);
                        docin_form.num_doc = 0;

                    } else {
                        $.each(get_num, function(index, value) {
                            var nnum = parseInt(value.num_in) + 1;
                            $("#num-docin").attr("disabled", true);
                            $("#num-docin").val(nnum);
                            docin_form.num_doc = nnum;
                            var intrvl = setInterval(function() {
                                if ($('#name-docin').val() == '') {
                                    $('#name-docin:first').focus();
                                }
                                clearInterval(intrvl);
                            }, 800);
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { check_num_doc_db() } }
            });
        }

    }

    $("#to-sector-docin").change(function(e) {
        e.preventDefault();
        get_docin_grono();
        check_docin();
    });

    $("#doc-type-docin").change(function(e) {
        e.preventDefault();
        check_num_doc();
        check_docin();
    });

    $("#form-sector-docin").change(function(e) {
        e.preventDefault();
        check_docin();
        get_docin_grono();
    });


    $('#num-docin').on("keypress keyup blur paste drop", function(event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });


    $("#name-docin").keyup(function(e) { check_docin(); });
    $("#ndoc-docin").keyup(function(e) { check_docin(); });
    $("#num-docin").keyup(function(e) {
        docin_form.num_doc = $("#num-docin").val();
        check_docin();
    });

    $('#docin-type-select-in').click(function(e) {
        docin_form.side = "inside";
        get_sector_docin();
        check_docin();
    });
    $('#docin-type-select-out').click(function(e) {

        docin_form.side = "outside";
        get_sector_docin();
        check_docin();
    });

    //// save data -------------------- $("#bt-save-docin").

    $("#bt-save-docin").click(function(e) {
        e.preventDefault();
        if (docin_form.num_doc == '') {
            var num_docin = $("#num-docin").val();
        } else {
            var num_docin = docin_form.num_doc;
        }

        var side = docin_form.side;
        var name_docin = $("#name-docin").val();
        var ndoc_docin = $("#ndoc-docin").val();
        var docin_detail = $("#docin-detail").val();
        var doc_type_docin = $("#doc-type-docin").val();
        var form_sector_docin = $("#form-sector-docin").val();
        var to_sector_docin = $("#to-sector-docin").val();
        var docin_detail = $("#docin-detail").val();
        var file_upload = docin_form.file_upload;
        var user = used_data.user_id;
        var sector_type = to_sector_docin;
        save_docin_db();
        //console.log(doc_type_docin);

        function save_docin_db() {
            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
            $.ajax({
                url: url + 'index.php/' + 'mg_data/add',
                type: "POST",
                data: { post_type: 'add_doc', doc: 'in', num_doc: num_docin, name_doc: name_docin, ndoc_doc: ndoc_docin, doc_type_doc: doc_type_docin, form_sector_doc: form_sector_docin, to_sector_doc: to_sector_docin, file_upload: file_upload, user: user, doc_detail: docin_detail, side: side, sector_type: sector_type },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                    $("#last-docin").slideDown("slow");
                    if (docin_form.doc_last_add == '') {
                        var renew = [];
                    } else {
                        var renew = JSON.parse(docin_form.doc_last_add);
                    }

                    var dt = new Date();
                    var d = dt.getDate();
                    var m = dt.getMonth() + 1;
                    var y = dt.getFullYear();
                    var fdt = d + "/" + m + "/" + y;
                    var user_add = used_data.user_id;
                    var user_name = used_data.user_name;
                    var doc_add = {
                        "id": data,
                        "user_id": user_add,
                        "num_id": num_docin,
                        "docex": ndoc_docin,
                        "doc_in_out": "in",
                        "name": name_docin,
                        "detail": docin_detail,
                        "file_scan": file_upload,
                        "doc_type": doc_type_docin,
                        "doc_from": form_sector_docin,
                        "doc_from_type": side,
                        "doc_to": to_sector_docin,
                        "sector_type": sector_type,
                        "doc_approve": "",
                        "doc_view": "",
                        "user_name": user_name,
                        "status": "show",
                        "date": fdt
                    };
                    renew.unshift(doc_add);
                    var newa = JSON.stringify(renew);
                    docin_form.doc_last_add = newa;
                    get_last_doc();
                    clear_form();
                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { save_docin_db() } }
            });
        }

    });

    /// end save data ----------------

    function get_last_doc() {
        var data = JSON.parse(docin_form.doc_last_add);
        //var sector = JSON.parse(docin_form.sector);
        //var grono = JSON.parse(docin_form.grono);
        $("#list-file-doc").html('');
        $.each(data, function(index, value) {
            $("#list-file-doc").append('<tr> <td class="text-center">' + value.num_id + '</td> <td>' + value.name + '</td> <td class="text-center"> <a style="font-size:20px;" class="pre-doc-last" data="' + value.id + '"><i class="ti-wallet"></i></a></td> </tr>');
        });

        $(".pre-doc-last").click(function(e) {
            e.preventDefault();
            var data = $(this).attr("data");
            $("#preview_doc").modal('show');
            var data_doc = JSON.parse(docin_form.doc_last_add);
            var sector = JSON.parse(docin_form.sector);
            var grono = JSON.parse(docin_form.grono);
            var grono_d = '';
            var sector_form = '';
            var sector_to = '';
            var title_icon = '';
            var doc_sector = '';
            $.each(data_doc, function(index, value) {
                if (data == value.id) {
                    if (value.doc_from_type == 'inside') { var side = "ພາຍໃນ"; } else { var side = "ພາຍນອກ"; }
                    $.each(grono, function(index, gno) {
                        if (value.doc_type == gno.id) { grono_d = gno.name; }
                    });
                    $.each(sector, function(index, st) {
                        if (value.doc_from == st.id) { sector_form = st.name; }
                        if (value.doc_to == st.id) { sector_to = st.name; }
                    });
                    if (value.doc_in_out == 'in') { title_icon = ' <i class="ti-angle-double-right"></i> ຂາເຂົ້າ: '; } else { title_icon = ' <i class="ti-angle-double-left"></i> ຂາອອກ: '; }
                    $.each(sector, function(index, dsec) {
                        if (value.sector_type == dsec.id) { doc_sector = dsec.name; }
                    });
                    $("#title-doc-detail").html(title_icon + doc_sector);
                    // console.log(grono_d);
                    if (value.docex == '') {
                        if (value.detail == '') {
                            $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_id + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table>  <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + value.user_name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                        } else {
                            $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_id + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table>  <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + value.user_name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> <div style="padding: 10px;"> <strong>ລາຍລະອຽດ:</strong> ' + value.detail + ' </div> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                        }
                    } else {
                        if (value.detail == '') {
                            $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_id + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ເອກະສານ:</strong></td> <td class="mbody">' + value.docex + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + value.user_name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                        } else {
                            $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_id + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ເອກະສານ:</strong></td> <td class="mbody">' + value.docex + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + value.user_name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> <div style="padding: 10px;"> <strong>ລາຍລະອຽດ:</strong> ' + value.detail + ' </div> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                        }
                    }

                    if (value.file_scan != null && value.file_scan != '') {
                        var file = [];
                        var file_db = value.file_scan.split("||");
                        // console.log(file_db);
                        for (let i = 0; i < file_db.length; i++) {
                            if (file_db[i] != '') {
                                // console.log(file_db[i]);

                                var fm = file_db[i].split('.');
                                if (fm[1] == 'pdf' || fm[1] == 'PDF') {
                                    file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-pdf.png" width="64"> </a>';
                                } else if (fm[1] == 'jpg' || fm[1] == 'JPG') {
                                    file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-jpg.png" width="64"> </a>';
                                } else if (fm[1] == 'jpeg' || fm[1] == 'JPEG') {
                                    file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-jpg.png" width="64"> </a>';
                                } else if (fm[1] == 'png' || fm[1] == 'PNG') {
                                    file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-png.png" width="64"> </a>';
                                }
                            }

                        }
                    }
                    //console.log(file);
                    $("#file-at").html(file);
                    $(".pwfile").click(function(e) {
                        e.preventDefault();
                        var dt = $(this).attr("data");
                        //console.log(dt);
                        var sfile = dt.split('.');
                        if (sfile[1] == 'pdf') {
                            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                                //alert('m');
                                $('#sh-file').html('<form method="get" action="' + url + 'file_upload/' + dt + '"><center><button type="submit" class="btn btn-default" ><i class="fa fa-file-pdf-o"></i> ດາວໂຫລດເອກະສານ PDF</button></center></form>');

                            } else {
                                $('#sh-file').html('<object data="' + url + 'file_upload/' + dt + '" type="application/pdf" width="100%" height="500"></object>');
                            }
                        } else {
                            $('#sh-file').html('<image src="' + url + 'file_upload/' + dt + '" width="100%" >');
                        }
                    });
                }
            });


        });
    }



    /// form upload file ------------------------------
    $('#f_upload').change(function(event) {
        $('#form_upload').submit();
    });
    $('#form_upload').on("submit", function(event) { //af++;
        //if(af==1){
        //alert('Go');
        //alert(apic);

        var ftype = used_data.file_type;
        // console.log(used_data.file_size);
        event.preventDefault();
        var proceed = true;
        var max_file_size = used_data.file_size * 1024; //allowed file size. (1 MB = 1048576)
        var result_output = '#output'; //ID of an element for response output
        var shimg = '.sh_img';
        var form = '#form_upload';
        var proceed = true;
        var allowed_file_types = ftype;
        var error = [];
        //alert(allowed_file_types);
        ///console.log(allowed_file_types);
        //  var maxp = $('.sh_img'+id).attr('maxp');
        $(result_output).html('');
        // alert(max_file_size);

        $(this.elements['file_upload'].files).each(function(i, ifile) {
            if (ifile.value !== "") { //continue only if file(s) are selected
                // console.log(ifile.type + ' | ' + allowed_file_types.indexOf(ifile.type));
                if (allowed_file_types.indexOf(ifile.type) === -1) { //check unsupported file
                    //error.push("<div style=\"margin-top:10px;\"><font color=\"#E7AE33\"  ><strong>ຂໍ້ຜິດຜາດ!</strong> ໄຟລ໌ທີ່ທ່ານເລືອກ \""+ ifile.name +"\" ບໍ່ແມ່ນໄຟລ໌ຮູບ!</font></div>");
                    // alert('No');
                    error.push("<div class=\"alert alert-warning alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>ຂໍ້ຜິດຜາດ!</strong>  ໄຟລ໌ທີ່ທ່ານເລືອກ \"" + ifile.name + "\" ບໍ່ແມ່ນໄຟລ໌ອະນຸຍາດໃຫ້ອັບໂຫລດ!</div>");
                    // $('.upload-bar').slideUp('slow');
                    proceed = false; //set proceed flag to false
                } //else { ftype = 'yes'; }
                total_files_size = ifile.size; //add file size to total size
            }
        });
        //alert(formatSizeUnits(max_file_size));
        //if total file size is greater than max file size
        if (total_files_size > max_file_size) {
            //error.push("<div style=\"margin-top:10px;\"><font color=\"#E7AE33\"  ><strong>ຂໍ້ຜິດຜາດ!</strong> ໄຟລ໌ທີ່ທ່ານເລືອກມີຂະໜາດ "+formatSizeUnits(total_files_size)+", ລະບົບອະນຸຍາດໃຫ້ອັບໂຫລດ " + formatSizeUnits(max_file_size) +"</font></div>"); 

            error.push("<div class='alert alert-warning alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>ຂໍ້ຜິດຜາດ!</strong>  ໄຟລ໌ທີ່ທ່ານເລືອກມີຂະໜາດ " + formatSizeUnits(total_files_size) + ", ລະບົບອະນຸຍາດໃຫ້ອັບໂຫລດ " + formatSizeUnits(max_file_size) + "</div>");
            //$('.upload-bar').slideUp('slow');
            proceed = false; //set proceed flag to false
        } //else { fsize = 'yes'; }

        if (proceed) {
            $(".upload-bar").css("width 0%");
            $('.upload-bar').slideDown('slow');
            $(this.elements['file_upload'].files).each(function(i, ifile) {});
            //var url = $('#base_url').val(); 
            // post_img();

            // function post_img() {

            $.ajax({
                url: url + 'index.php/' + 'mg_data/upload_file',
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                xhr: function() {
                    //upload Progress
                    var xhr = $.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener('progress', function(event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            $(".up-bar").css("width", +percent + "%");
                        }, true);
                    }
                    return xhr;
                },
                mimeType: "multipart/form-data"

            }).done(function(res) { //
                $(form)[0].reset();
                $('.upload-bar').slideUp('slow');
                $(".upload-bar").css("width 0%");
                //alert(res);
                if (res == 'no_upload') {
                    $('#output').html("<div class=\"alert alert-warning alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>ຂໍ້ຜິດຜາດ!</strong>  ການອັບໂຫລດຂໍໍ້ມູນບໍ່ສຳເລັດ! <br> - ຖານຂໍ້ມູນຜິດຜາດ. <br> - ບໍ່ມີ Folder ອັບໂຫລດ. </div>");
                } else {
                    /// yes good
                    var fup = $('.file_upload').val();
                    $('.file_upload').val(fup + res + '||');
                    docin_form.file_upload = docin_form.file_upload + res + '||';
                    // check_data();
                    check_docin();
                    var fupn = $('.file_upload').val();
                    var sfile = res.split(".");
                    $('.list_file').append('<li class="list-group-item f_' + sfile[0] + ' flit"> <i class="fa fa-file-pdf-o"></i> ໄຟລ໌ອັບໂຫລດ <span class="pull-right"><a class="prev_img" data="' + res + '" onclick="preview(\'' + res + '\')" > <i class="ti-export"></i> ເບີ່ງໄຟລ໌ ອັບໂຫລດ</a>  <i class="ti-split-v-alt"></i>  <a data="' + res + '" class="delfile"><i class="ti-close"></i> </a> </span> <br> <small>ຂະໜາດໄຟລ໌: ' + formatSizeUnits(total_files_size) + '</small></li>');


                    $(".delfile").click(function(e) {
                        e.preventDefault();
                        var file = $(this).attr("data");

                        var sfile = file.split(".");
                        var fup = docin_form.file_upload;
                        var ud_file = fup.replace(file + "||", "");
                        docin_form.file_upload = ud_file;

                        delfile_up();

                        function delfile_up() {
                            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
                            $.ajax({
                                url: url + 'index.php/' + 'mg_data/del_file',
                                type: "POST",
                                data: { file: file },
                                timeout: 6000,
                                success: function(data) {
                                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                    $('.loading').fadeOut(2000);
                                    $('.f_' + sfile[0]).slideUp('slow');
                                },
                                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { post_img() } }
                            });
                        }
                        check_docin();
                        // console.log(docin_form.file_upload);
                    });

                }

            });

            //  } /// end function


        } else {} /// if no up

        $(error).each(function(i) { //output any error to output element
            $(result_output).append('<div class="error">' + error[i] + "</div>");
        });

        //} // end af
        //}
    });
    ///// end upload ---------------------

    function formatSizeUnits(bytes) {
        if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + ' GB'; } else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + ' MB'; } else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + ' KB'; } else if (bytes > 1) { bytes = bytes + ' bytes'; } else if (bytes == 1) { bytes = bytes + ' byte'; } else { bytes = '0 byte'; }
        return bytes;
    }




    $('.btn_print').click(function(event) {
        var file = $('.btn_print').attr('data');
        var w = window.open(url + 'file_upload/' + file);
        $(w).ready(function() {
            w.print();
        });
        //window.close();
    });


}

//// function 
function preview(file) {
    //alert(file);
    var sfile = file.split(".");

    if (sfile[1] == 'pdf') {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //alert('m');
            $('.sh_file').html('<form method="get" action="' + url + 'file_upload/' + file + '"><center><button type="submit" class="btn btn-default" ><i class="fa fa-file-pdf-o"></i> ດາວໂຫລດເອກະສານ PDF</button></center></form>');

        } else {
            $('.sh_file').html('<object data="' + url + 'file_upload/' + file + '" type="application/pdf" width="100%" height="500"></object>');
        }
    } else {
        $('.sh_file').html('<image src="' + url + 'file_upload/' + file + '" width="100%" >');
    }
    $('.btn_print').attr('data', file);
    $('#preview_file').modal('show');
    // console.log(file);
}




//// end doc-in page -----------------------


/// Doc-out page ---------------------------
function doc_out(used_data) {
    // document.getElementById("main_center").innerHTML = "Doc-Out";
    var title = '<div class="header-top"><span class="pull-left"><h4 class="mt-0 m-b-15 header-title"> <h5> <i class="ti-angle-double-left"></i> ບັນທຶກເອກະສານ ຂາອອກ </h5></h4></span> <span class="pull-right text-right"> <button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-save-docin"> <i class="ti-save"></i> ບັນທຶກ </button> <button type="button" class="btn btn-outline-danger waves-effect waves-light" id="bt-cancel-docin"> <i class="ti-close"></i> ລ້າງຂໍ້ມູນ</button> <div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;" id="processing"></div></span><div class="clearfix"></div></div>';
    // var body = ' <div class="row"> <div class="col-sm-6 col-md-6 col-lg-6"><strong>  <h5><i class="ti-file"></i> ຂໍ້ມູນເອກະສານ</h5> </strong> <div class="progress progress-striped"> <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="process-bar-doc" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> <form class="form"> <div class="form-group"></div> <div class="form-group" style="width: 180px;"> <div class="input-group"> <div class="input-group-addon"> ເລກທີ່ ຂາອອກ: </div><input type="text" id="num-docin" class="form-control" value="" data=""></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຊື່ເອກະສານ: </div><input type="text" id="name-docin" class="form-control" placeholder=" ຊື່ເອກະສານ.... "></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ເລກທີ່ເອກະສານ: </div><input type="text" id="ndoc-docin" class="form-control" placeholder="ເລຫທີ່ ສະຖານທີ່, ວວ ດດ ປປປປ"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ທີ່ມາຂອງເອກະສານ: <input type="radio" name="dc-t" checked id="docin-type-select-in" data="inside"> ພາຍໃນ <input type="radio" name="dc-t" id="docin-type-select-out" data="outside"> ພາຍນອກ </div> </div> </div> <p> <div class="form-inline num_manual"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ໝວດເອກະສານ: </div><select class="form-control" id="doc-type-docin"></select></div> </div> </div> </p> <p> <div class="form-inlines"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon "> ຈາກພາກສ່ວນ: </div><select class="form-control" id="form-sector-docin"></select></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ເຖິງພາກສ່ວນ: </div><select class="form-control" id="to-sector-docin"></select></div> </div> </div> </p> <div class="form-group" style="width: 200px;"> <div class="input-group"> <div class="input-group-addon"> ວັນທີ່ບັນທຶກ: </div><input type="text" class="form-control" id="docin-date" readonly value="23/12/2018"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຜູ້ບັນທຶກ: </div><input type="text" class="form-control" id="save-docin-by" readonly value="admin"></div> </div>ລາຍລະອຽດເພີ່ມເຕີມ:<textarea name="" id="docin-detail" class="form-control" rows="5" required="required"></textarea></form> </div> <div class="col-sm-6 col-md-6 col-lg-6" id="upload-file"> <input type="hidden" class="file_upload" value=""><strong> <h5> <i class="ti-clip"></i> ໄຟລ໌ເອກະສານອັບໂຫລດ</h5>  </strong> <ul class="list-group list_file"> </ul> <p><span id="output"></span><span class="sh_img"></span></p> <div class="progress progress-striped upload-bar" style="display: none;"> <p> <div class="progress-bar progress-bar-striped progress-bar-animated up-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> </p> <form id="form_upload"><input type="file" name="file_upload" style="display: none;" id="f_upload"></form> <P class="text-center"><button type="button" class="btn btn-success waves-effect waves-light" onclick="$(\'#f_upload\').click()"> <i class="ti-export"></i> ເລືອກໄຟລ໌ເອກະສານ</button></P> </div> <div class="col-sm-12" id="last-docin" style="display:none;"> <strong> <h5> <i class="ti-list"></i> ລາຍການບັນທຶກ ລ່າສຸດ</h5>  </strong> <div class="table-responsive" id="show-data-list"> <table class="table table-hover mb-0"> <thead> <tr> <th width="140" class="text-center">ເລກທີ່ບັນທຶກ</th> <th>ຊື່ເອກະສານ</th> <th width="120" class="text-center">ລາຍລະອຽດ</th> </tr> </thead> <tbody id="list-file-doc"> </tbody> </table> </div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_file" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="myLargeModalLabel"><i class="ti-export"></i> ໄຟລ໌ທີ່ທ່ານອັບໂຫລດ</h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body sh_file"></div> </div> <div class="modal-footer"><button type="button" class="btn btn-default btn_print" data=""> <span class="glyphicon glyphicon-print" aria-hidden="true"></span> ສັ່ງພິມ</button></div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_doc" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="title-doc-detail"> </h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body" id="data-doc"> </div> </div> </div> </div> </div>';
    var body = ' <div class="row"> <div class="col-sm-6 col-md-6 col-lg-6"><strong>  <h5><i class="ti-file"></i> ຂໍ້ມູນເອກະສານ</h5> </strong> <div class="progress progress-striped"> <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="process-bar-doc" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> <form class="form"> <div class="form-group"></div> <div class="form-group" style="width: 180px;"> <div class="input-group"> <div class="input-group-addon"> ເລກທີ່ ຂາອອກ: </div><input type="text" id="num-docin" class="form-control" value="" data=""></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຊື່ເອກະສານ: </div><input type="text" id="name-docin" class="form-control" placeholder=" ຊື່ເອກະສານ.... "></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ທີ່ມາຂອງເອກະສານ: <input type="radio" name="dc-t" checked id="docin-type-select-in" data="inside"> ພາຍໃນ <input type="radio" name="dc-t" id="docin-type-select-out" data="outside"> ພາຍນອກ </div> </div> </div> <p> <div class="form-inline num_manual"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ໝວດເອກະສານ: </div><select class="form-control" id="doc-type-docin"></select></div> </div> </div> </p> <p> <div class="form-inlines"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon "> ຈາກພາກສ່ວນ: </div><select class="form-control" id="form-sector-docin"></select></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ເຖິງພາກສ່ວນ: </div><select class="form-control" id="to-sector-docin"></select></div> </div> </div> </p> <div class="form-group" style="width: 200px;"> <div class="input-group"> <div class="input-group-addon"> ວັນທີ່ບັນທຶກ: </div><input type="text" class="form-control" id="docin-date" readonly value="23/12/2018"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຜູ້ບັນທຶກ: </div><input type="text" class="form-control" id="save-docin-by" readonly value="admin"></div> </div>ລາຍລະອຽດເພີ່ມເຕີມ:<textarea name="" id="docin-detail" class="form-control" rows="5" required="required"></textarea></form> </div> <div class="col-sm-6 col-md-6 col-lg-6" id="upload-file"> <input type="hidden" class="file_upload" value=""><strong> <h5> <i class="ti-clip"></i> ໄຟລ໌ເອກະສານອັບໂຫລດ</h5>  </strong> <ul class="list-group list_file"> </ul> <p><span id="output"></span><span class="sh_img"></span></p> <div class="progress progress-striped upload-bar" style="display: none;"> <p> <div class="progress-bar progress-bar-striped progress-bar-animated up-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> </p> <form id="form_upload"><input type="file" name="file_upload" style="display: none;" id="f_upload"></form> <P class="text-center"><button type="button" class="btn btn-success waves-effect waves-light" onclick="$(\'#f_upload\').click()"> <i class="ti-export"></i> ເລືອກໄຟລ໌ເອກະສານ</button></P> </div> <div class="col-sm-12" id="last-docin" style="display:none;"> <strong> <h5> <i class="ti-list"></i> ລາຍການບັນທຶກ ລ່າສຸດ</h5>  </strong> <div class="table-responsive" id="show-data-list"> <table class="table table-hover mb-0"> <thead> <tr> <th width="140" class="text-center">ເລກທີ່ບັນທຶກ</th> <th>ຊື່ເອກະສານ</th> <th width="120" class="text-center">ລາຍລະອຽດ</th> </tr> </thead> <tbody id="list-file-doc"> </tbody> </table> </div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_file" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="myLargeModalLabel"><i class="ti-export"></i> ໄຟລ໌ທີ່ທ່ານອັບໂຫລດ</h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body sh_file"></div> </div> <div class="modal-footer"><button type="button" class="btn btn-default btn_print" data=""> <span class="glyphicon glyphicon-print" aria-hidden="true"></span> ສັ່ງພິມ</button></div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_doc" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="title-doc-detail"> </h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body" id="data-doc"> </div> </div> </div> </div> </div>';

    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = body;

    var dt = new Date();
    var d = dt.getDate();
    var m = dt.getMonth() + 1;
    var y = dt.getFullYear();
    var fdt = d + "/" + m + "/" + y;

    $("#bt-save-docin").attr("disabled", true);
    $("#save-docin-by").val(used_data.user_name);
    $("#docin-date").val(fdt);


    var t = false;
    var uper = used_data.user_permission.split("|");

    for (let i = 0; i < uper.length; i++) {
        if (uper[i] == 'all' || uper[i] == 'rs' || uper[i] == 'rm' || uper[i] == 'ed') {
            t = true;
        }

    }

    // console.log(t);
    // console.log(used_data.user_sector);

    var docin_form = {
        sector: "",
        grono: "",
        num_doc: "",
        file_upload: "",
        side: "inside",
        doc_last_add: []
    }

    ///// get data /////----------------------------



    get_sector_db_docout();

    function get_sector_db_docout() {
        $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_sector' },
            timeout: 6000,
            success: function(data) {
                docin_form.sector = data;
                get_grono_db_docout();

                function get_grono_db_docout() {
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
                    $.ajax({
                        url: url + 'index.php/' + 'mg_data/get_data',
                        type: "POST",
                        data: { get_db: 'db_grono_doc' },
                        timeout: 6000,
                        success: function(data) {
                            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                            $('.loading').fadeOut(2000);
                            docin_form.grono = data;
                            get_sector_docin();
                        },
                        error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_grono_db_docout() } }
                    });
                }
                //get_sector_docin();
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_sector_db_docout() } }
        });
    }



    //  var sector_db = {
    //      data: ""
    // }

    function check_docin() {
        if (docin_form.num_doc == '') {
            var num_docin = $("#num-docin").val();
        } else {
            var num_docin = docin_form.num_doc;
        }
        var name_docin = $("#name-docin").val();
        var ndoc_docin = $("#ndoc-docin").val();
        var doc_type_docin = $("#doc-type-docin").val();
        var form_sector_docin = $("#form-sector-docin").val();
        var to_sector_docin = $("#to-sector-docin").val();
        var docin_date = $("#docin-date").val();
        var save_docin_by = $("#save-docin-by").val();
        var docin_detail = $("#docin-detail").val();
        var file_upliad = docin_form.file_upload;
        // console.log(num_docin);
        var a = 0,
            b = 0,
            c = 0,
            d = 0,
            e = 0,
            f = 0,
            g = 0,
            h = 0,
            i = 0,
            k = 0;

        if (num_docin == '') { a = 0; } else { a = 11.2; }
        if (name_docin == '') { b = 0; } else { b = 11.2; }
        if (ndoc_docin == '') { c = 0; } else { c = 11.2; }
        if (doc_type_docin == '') { e = 0; } else { e = 11.2; }
        if (form_sector_docin == '') { f = 0; } else { f = 11.2; }
        if (to_sector_docin == '') { g = 0; } else { g = 11.2; }
        if (docin_date == '') { h = 0; } else { h = 11.2; }
        if (save_docin_by == '') { i = 0; } else { i = 11.2; }
        if (file_upliad == '') { k = 0; } else { k = 11.2; }
        c = 11.2;
        process_percen = a + b + c + d + e + f + g + h + i + k;
        $("#process-bar-doc").attr('style', 'width: ' + process_percen + '%;');
        if (process_percen < 99) {
            $("#bt-save-docin").attr("disabled", true);
        } else { $("#bt-save-docin").attr("disabled", false); }
        check_num_doc();
    }

    function get_sector_docin() {
        if ($('#docin-type-select-in').is(':checked')) {
            $("#to-sector-docin").html('');
            var sector = JSON.parse(docin_form.sector);
            $.each(sector, function(index, value) {
                if (value.sector_type != "ou" && value.id != used_data.user_sector) {
                    $("#to-sector-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                }
            });
        } else if ($('#docin-type-select-out').is(':checked')) {
            $("#to-sector-docin").html('');
            var sector = JSON.parse(docin_form.sector);
            $.each(sector, function(index, value) {
                if (value.sector_type == "ou" && value.id != used_data.user_sector) {
                    $("#to-sector-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                }
            });
        }



        if (used_data.user_type == 'admin') {
            $("#form-sector-docin").html('');
            var sector = JSON.parse(docin_form.sector);
            $.each(sector, function(index, value) {
                if (value.sector_type != "ou") {
                    $("#form-sector-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                }
            });
            get_docin_grono();
            check_docin();
        } else {
            $("#form-sector-docin").html('');
            var sector = JSON.parse(docin_form.sector);
            $.each(sector, function(index, value) {
                if (used_data.user_sector == value.id) {
                    if (value.sector_type != "ou") {
                        $("#form-sector-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                    }
                }
            });
            get_docin_grono();
            check_docin();
        }
    }

    function get_docin_grono() {
        $("#doc-type-docin").html('');
        var sector_id = $("#form-sector-docin").val();
        var grono = JSON.parse(docin_form.grono);
        $.each(grono, function(index, value) {
            if (sector_id == value.sector_id) {
                if (value.grono_type == "out") {
                    $("#doc-type-docin").append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                }
            }
        });
    }


    $("#bt-cancel-docin").click(function(e) {
        e.preventDefault();
        clear_form();
    });

    function clear_form() {
        docin_form.file_upload = '';
        $("#name-docin").val('');
        $("#ndoc-docin").val('');
        $("#docin-detail").val('');
        check_docin();
        $(".flit").remove();
    }

    function check_num_doc() {
        var grono = $("#doc-type-docin").val();
        var year = used_data.year;
        var sector = $("#form-sector-docin").val();

        check_num_doc_db();

        function check_num_doc_db() {
            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
            $.ajax({
                url: url + 'index.php/' + 'mg_data/get_data',
                type: "POST",
                data: { get_db: 'db_check_doc_num', year: year, sector: sector, grono: grono, doc_in_out: 'out' },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);

                    var get_num = JSON.parse(data);
                    if (get_num == 0) {
                        if ($("#num-docin").val() == null) {
                            $("#num-docin").val('');
                            var intrvl = setInterval(function() {
                                $('#num-docin:first').focus();
                                clearInterval(intrvl);
                            }, 800);
                        }
                        $("#num-docin").attr("disabled", false);
                        docin_form.num_doc = 0;

                    } else {
                        $.each(get_num, function(index, value) {
                            var nnum = parseInt(value.num_in) + 1;
                            $("#num-docin").attr("disabled", true);
                            $("#num-docin").val(nnum);
                            docin_form.num_doc = nnum;
                            var intrvl = setInterval(function() {
                                if ($('#name-docin').val() == '') {
                                    $('#name-docin:first').focus();
                                }
                                clearInterval(intrvl);
                            }, 800);
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { check_num_doc_db() } }
            });
        }

    }

    $("#to-sector-docin").change(function(e) {
        e.preventDefault();
        get_docin_grono();
        check_docin();
    });

    $("#doc-type-docin").change(function(e) {
        e.preventDefault();
        check_num_doc();
        check_docin();
    });

    $("#form-sector-docin").change(function(e) {
        e.preventDefault();
        get_docin_grono();
        check_docin();
    });


    $('#num-docin').on("keypress keyup blur paste drop", function(event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });


    $("#name-docin").keyup(function(e) { check_docin(); });
    $("#ndoc-docin").keyup(function(e) { check_docin(); });
    $("#num-docin").keyup(function(e) {
        docin_form.num_doc = $("#num-docin").val();
        check_docin();
    });

    $('#docin-type-select-in').click(function(e) {
        docin_form.side = "inside";
        get_sector_docin();
        check_docin();
    });
    $('#docin-type-select-out').click(function(e) {

        docin_form.side = "outside";
        get_sector_docin();
        check_docin();
    });

    //// save data -------------------- $("#bt-save-docin").

    $("#bt-save-docin").click(function(e) {
        e.preventDefault();
        if (docin_form.num_doc == '') {
            var num_docin = $("#num-docin").val();
        } else {
            var num_docin = docin_form.num_doc;
        }

        var side = docin_form.side;
        var name_docin = $("#name-docin").val();
        //var ndoc_docin = $("#ndoc-docin").val();
        var docin_detail = $("#docin-detail").val();
        var doc_type_docin = $("#doc-type-docin").val();
        var form_sector_docin = $("#form-sector-docin").val();
        var to_sector_docin = $("#to-sector-docin").val();
        var docin_detail = $("#docin-detail").val();
        var file_upload = docin_form.file_upload;
        var user = used_data.user_id;
        var sector_type = form_sector_docin;

        var ndoc_docin = '';

        save_docin_db();

        function save_docin_db() {
            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
            $.ajax({
                url: url + 'index.php/' + 'mg_data/add',
                type: "POST",
                data: { post_type: 'add_doc', doc: 'out', num_doc: num_docin, name_doc: name_docin, ndoc_doc: ndoc_docin, doc_type_doc: doc_type_docin, form_sector_doc: form_sector_docin, to_sector_doc: to_sector_docin, file_upload: file_upload, user: user, doc_detail: docin_detail, side: side, sector_type: sector_type },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                    $("#last-docin").slideDown("slow");
                    if (docin_form.doc_last_add == '') {
                        var renew = [];
                    } else {
                        var renew = JSON.parse(docin_form.doc_last_add);
                    }

                    var dt = new Date();
                    var d = dt.getDate();
                    var m = dt.getMonth() + 1;
                    var y = dt.getFullYear();
                    var fdt = d + "/" + m + "/" + y;
                    var user_add = used_data.user_id;
                    var user_name = used_data.user_name;
                    var doc_add = {
                        "id": data,
                        "user_id": user_add,
                        "num_id": num_docin,
                        "docex": ndoc_docin,
                        "doc_in_out": "out",
                        "name": name_docin,
                        "detail": docin_detail,
                        "file_scan": file_upload,
                        "doc_type": doc_type_docin,
                        "doc_from": form_sector_docin,
                        "doc_to": to_sector_docin,
                        "doc_from_type": side,
                        "sector_type": sector_type,
                        "doc_approve": "",
                        "doc_view": "",
                        "user_name": user_name,
                        "status": "show",
                        "date": fdt
                    };
                    renew.unshift(doc_add);
                    var newa = JSON.stringify(renew);
                    docin_form.doc_last_add = newa;


                    get_last_doc();
                    clear_form();


                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { save_docin_db() } }
            });
        }

    });

    /// end save data ----------------

    function get_last_doc() {
        var data = JSON.parse(docin_form.doc_last_add);
        $("#list-file-doc").html('');
        $.each(data, function(index, value) {
            $("#list-file-doc").append('<tr> <td class="text-center">' + value.num_id + '</td> <td>' + value.name + '</td> <td class="text-center"> <a style="font-size:20px;" class="pre-doc-last" data="' + value.id + '"><i class="ti-wallet"></i></a></td> </tr>');
        });

        $(".pre-doc-last").click(function(e) {
            e.preventDefault();
            var data = $(this).attr("data");
            $("#preview_doc").modal('show');
            var data_doc = JSON.parse(docin_form.doc_last_add);
            var sector = JSON.parse(docin_form.sector);
            var grono = JSON.parse(docin_form.grono);
            var grono_d = '';
            var sector_form = '';
            var sector_to = '';
            var title_icon = '';
            var doc_sector = '';
            $.each(data_doc, function(index, value) {
                if (data == value.id) {
                    if (value.doc_from_type == 'inside') { var side = "ພາຍໃນ"; } else { var side = "ພາຍນອກ"; }
                    $.each(grono, function(index, gno) {
                        if (value.doc_type == gno.id) { grono_d = gno.name; }
                    });
                    $.each(sector, function(index, st) {
                        if (value.doc_from == st.id) { sector_form = st.name; }
                        if (value.doc_to == st.id) { sector_to = st.name; }
                    });
                    if (value.doc_in_out == 'in') { title_icon = ' <i class="ti-angle-double-right"></i> ຂາເຂົ້າ: '; } else { title_icon = ' <i class="ti-angle-double-left"></i> ຂາອອກ: '; }
                    $.each(sector, function(index, dsec) {
                        if (value.sector_type == dsec.id) { doc_sector = dsec.name; }
                    });
                    $("#title-doc-detail").html(title_icon + doc_sector);
                    // console.log(grono_d);
                    // $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_id + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ເອກະສານ:</strong></td> <td class="mbody">' + value.docex + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + value.user_name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table>  <div style="padding: 10px;"> <strong>ລາຍລະອຽດ:</strong> ' + value.detail + ' </div></div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');

                    if (value.docex == '') {
                        if (value.detail == '') {
                            $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_id + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table>  <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + value.user_name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                        } else {
                            $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_id + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table>  <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + value.user_name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> <div style="padding: 10px;"> <strong>ລາຍລະອຽດ:</strong> ' + value.detail + ' </div> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                        }
                    } else {

                        if (value.detail == '') {
                            $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_id + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ເອກະສານ:</strong></td> <td class="mbody">' + value.docex + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + value.user_name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                        } else {
                            $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_id + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ເອກະສານ:</strong></td> <td class="mbody">' + value.docex + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + value.user_name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> <div style="padding: 10px;"> <strong>ລາຍລະອຽດ:</strong> ' + value.detail + ' </div> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                        }

                    }

                    if (value.file_scan != null && value.file_scan != '') {
                        var file = [];
                        var file_db = value.file_scan.split("||");
                        // console.log(file_db);
                        for (let i = 0; i < file_db.length; i++) {
                            if (file_db[i] != '') {
                                // console.log(file_db[i]);

                                var fm = file_db[i].split('.');
                                if (fm[1] == 'pdf' || fm[1] == 'PDF') {
                                    file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-pdf.png" width="64"> </a>';
                                } else if (fm[1] == 'jpg' || fm[1] == 'JPG') {
                                    file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-jpg.png" width="64"> </a>';
                                } else if (fm[1] == 'jpeg' || fm[1] == 'JPEG') {
                                    file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-jpg.png" width="64"> </a>';
                                } else if (fm[1] == 'png' || fm[1] == 'PNG') {
                                    file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-png.png" width="64"> </a>';
                                }
                            }

                        }
                    }
                    //console.log(file);
                    $("#file-at").html(file);
                    $(".pwfile").click(function(e) {
                        e.preventDefault();
                        var dt = $(this).attr("data");
                        //console.log(dt);
                        var sfile = dt.split('.');
                        if (sfile[1] == 'pdf') {
                            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                                //alert('m');
                                $('#sh-file').html('<form method="get" action="' + url + 'file_upload/' + dt + '"><center><button type="submit" class="btn btn-default" ><i class="fa fa-file-pdf-o"></i> ດາວໂຫລດເອກະສານ PDF</button></center></form>');

                            } else {
                                $('#sh-file').html('<object data="' + url + 'file_upload/' + dt + '" type="application/pdf" width="100%" height="500"></object>');
                            }
                        } else {
                            $('#sh-file').html('<image src="' + url + 'file_upload/' + dt + '" width="100%" >');
                        }
                    });
                }
            });


        });
    }



    /// form upload file ------------------------------
    $('#f_upload').change(function(event) {
        $('#form_upload').submit();
    });
    $('#form_upload').on("submit", function(event) { //af++;
        //if(af==1){
        //alert('Go');
        //alert(apic);

        var ftype = used_data.file_type;
        // console.log(used_data.file_size);
        event.preventDefault();
        var proceed = true;
        var max_file_size = used_data.file_size * 1024; //allowed file size. (1 MB = 1048576)
        var result_output = '#output'; //ID of an element for response output
        var shimg = '.sh_img';
        var form = '#form_upload';
        var proceed = true;
        var allowed_file_types = ftype;
        var error = [];
        //alert(allowed_file_types);
        ///console.log(allowed_file_types);
        //  var maxp = $('.sh_img'+id).attr('maxp');
        $(result_output).html('');
        // alert(max_file_size);

        $(this.elements['file_upload'].files).each(function(i, ifile) {
            if (ifile.value !== "") { //continue only if file(s) are selected
                // console.log(ifile.type + ' | ' + allowed_file_types.indexOf(ifile.type));
                if (allowed_file_types.indexOf(ifile.type) === -1) { //check unsupported file
                    //error.push("<div style=\"margin-top:10px;\"><font color=\"#E7AE33\"  ><strong>ຂໍ້ຜິດຜາດ!</strong> ໄຟລ໌ທີ່ທ່ານເລືອກ \""+ ifile.name +"\" ບໍ່ແມ່ນໄຟລ໌ຮູບ!</font></div>");
                    // alert('No');
                    error.push("<div class=\"alert alert-warning alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>ຂໍ້ຜິດຜາດ!</strong>  ໄຟລ໌ທີ່ທ່ານເລືອກ \"" + ifile.name + "\" ບໍ່ແມ່ນໄຟລ໌ອະນຸຍາດໃຫ້ອັບໂຫລດ!</div>");
                    // $('.upload-bar').slideUp('slow');
                    proceed = false; //set proceed flag to false
                } //else { ftype = 'yes'; }
                total_files_size = ifile.size; //add file size to total size
            }
        });
        //alert(formatSizeUnits(max_file_size));
        //if total file size is greater than max file size
        if (total_files_size > max_file_size) {
            //error.push("<div style=\"margin-top:10px;\"><font color=\"#E7AE33\"  ><strong>ຂໍ້ຜິດຜາດ!</strong> ໄຟລ໌ທີ່ທ່ານເລືອກມີຂະໜາດ "+formatSizeUnits(total_files_size)+", ລະບົບອະນຸຍາດໃຫ້ອັບໂຫລດ " + formatSizeUnits(max_file_size) +"</font></div>"); 

            error.push("<div class='alert alert-warning alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>ຂໍ້ຜິດຜາດ!</strong>  ໄຟລ໌ທີ່ທ່ານເລືອກມີຂະໜາດ " + formatSizeUnits(total_files_size) + ", ລະບົບອະນຸຍາດໃຫ້ອັບໂຫລດ " + formatSizeUnits(max_file_size) + "</div>");
            //$('.upload-bar').slideUp('slow');
            proceed = false; //set proceed flag to false
        } //else { fsize = 'yes'; }

        if (proceed) {
            $(".upload-bar").css("width 0%");
            $('.upload-bar').slideDown('slow');
            $(this.elements['file_upload'].files).each(function(i, ifile) {});
            //var url = $('#base_url').val(); 
            // post_img();

            // function post_img() {

            $.ajax({
                url: url + 'index.php/' + 'mg_data/upload_file',
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                xhr: function() {
                    //upload Progress
                    var xhr = $.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener('progress', function(event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            $(".up-bar").css("width", +percent + "%");
                        }, true);
                    }
                    return xhr;
                },
                mimeType: "multipart/form-data"

            }).done(function(res) { //
                $(form)[0].reset();
                $('.upload-bar').slideUp('slow');
                $(".upload-bar").css("width 0%");
                //alert(res);
                if (res == 'no_upload') {
                    $('#output').html("<div class=\"alert alert-warning alert-dismissible\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>ຂໍ້ຜິດຜາດ!</strong>  ການອັບໂຫລດຂໍໍ້ມູນບໍ່ສຳເລັດ! <br> - ຖານຂໍ້ມູນຜິດຜາດ. <br> - ບໍ່ມີ Folder ອັບໂຫລດ. </div>");
                } else {
                    /// yes good
                    var fup = $('.file_upload').val();
                    $('.file_upload').val(fup + res + '||');
                    docin_form.file_upload = docin_form.file_upload + res + '||';
                    // check_data();
                    check_docin();
                    var fupn = $('.file_upload').val();
                    var sfile = res.split(".");
                    $('.list_file').append('<li class="list-group-item f_' + sfile[0] + ' flit"> <i class="fa fa-file-pdf-o"></i> ໄຟລ໌ອັບໂຫລດ <span class="pull-right"><a class="prev_img" data="' + res + '" onclick="preview(\'' + res + '\')" > <i class="ti-export"></i> ເບີ່ງໄຟລ໌ ອັບໂຫລດ</a>  <i class="ti-split-v-alt"></i>  <a data="' + res + '" class="delfile"><i class="ti-close"></i> </a> </span> <br> <small>ຂະໜາດໄຟລ໌: ' + formatSizeUnits(total_files_size) + '</small></li>');


                    $(".delfile").click(function(e) {
                        e.preventDefault();
                        var file = $(this).attr("data");

                        var sfile = file.split(".");
                        var fup = docin_form.file_upload;
                        var ud_file = fup.replace(file + "||", "");
                        docin_form.file_upload = ud_file;

                        delfile_up();

                        function delfile_up() {
                            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
                            $.ajax({
                                url: url + 'index.php/' + 'mg_data/del_file',
                                type: "POST",
                                data: { file: file },
                                timeout: 6000,
                                success: function(data) {
                                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                    $('.loading').fadeOut(2000);
                                    $('.f_' + sfile[0]).slideUp('slow');
                                },
                                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { post_img() } }
                            });
                        }
                        check_docin();
                        // console.log(docin_form.file_upload);
                    });

                }

            });

            //  } /// end function


        } else {} /// if no up

        $(error).each(function(i) { //output any error to output element
            $(result_output).append('<div class="error">' + error[i] + "</div>");
        });

        //} // end af
        //}
    });
    ///// end upload ---------------------

    function formatSizeUnits(bytes) {
        if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + ' GB'; } else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + ' MB'; } else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + ' KB'; } else if (bytes > 1) { bytes = bytes + ' bytes'; } else if (bytes == 1) { bytes = bytes + ' byte'; } else { bytes = '0 byte'; }
        return bytes;
    }




    $('.btn_print').click(function(event) {
        var file = $('.btn_print').attr('data');
        var w = window.open(url + 'file_upload/' + file);
        $(w).ready(function() {
            w.print();
        });
        //window.close();
    });



}
//// end doc-out page -----------------------

/// Doc-ap page ---------------------------
function doc_ap(used_data) {
    //document.getElementById("main_center").innerHTML = "Doc-Ap";
    var title = '<div class="header-top"> <span class="pull-left"> <h4 class="mt-0 m-b-15 header-title"> <h5> <i class="ti-layout-list-thumb"></i> ຕິດຕາມ / ອານຸມັດ ເອກະສານ </h5></h4> </span> <span class="pull-right col-md-4"> <div class="input-group"> <span class="input-group-addon " > <i class="fa fa-search "></i></span> <input type="text" class="form-control " id="search_document" placeholder="ຄົ້ນຫາເອກະສານ..."> <div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;" id="processing"> </div> </div> </span> <div class="clearfix"></div>';

    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = "ລະບົບອານຸມັດເອກະສານ ກຳລັງປັບປຸງ...";
    // console.log(user.name);
}
//// end doc-ap page -----------------------

/// Doc-mg page ---------------------------
function doc_mg(used_data) {
    // document.getElementById("main_center").innerHTML = "Doc-Mg";
    var title = ' <div class="header-top" style="margin-bottom: 15px;"> <span class="pull-left"> <h4 class="mt-0 m-b-15 header-title"> <h5><i class="ti-pencil-alt"></i> ແກ້ໄຂ/ລຶບ ເອກະສານ </h5></h4> </span> <span class="pull-right col-md-4"> <div class="input-group"> <span class="input-group-addon " > <i class="fa fa-search "></i></span>    <input type="text" class="form-control " id="search_document" placeholder="ຄົ້ນຫາເອກະສານ..."> <div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;" id="processing"> </div> </div> </span> <div class="clearfix"></div>';
    var body = ' <div class="table-responsive" id="show-data-list"> <p> <nav aria-label="Page navigation"> <ul class="pagination justify-content-end" id="user-pagination"> </ul> </nav> </p> <table class="table table-hover mb-0"> <thead> <tr> <th width="140" class="text-center">ເລກທີ່ບັນທຶກ</th> <th>ຊື່ເອກະສານ</th> <th width="120" class="text-center">ລາຍລະອຽດ</th> <th width="180" class="text-center">ຈັດການ</th> </tr> </thead> <tbody id="list-file-doc"> </tbody> </table> </div> <div id="form-edit"></div> <div class="modal fade bs-example-modal-lg" id="preview_doc" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="title-doc-detail"> </h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body" id="data-doc"> </div> </div> </div> </div> </div>';

    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = body;


    var doc_data = {
        user: '',
        sector: '',
        grono: '',
        doc: '',
        re_doc: '',
        doc_search: '',
        doc_user: '',
        file_scan: '',
        renew_data: function() {
            if (used_data.user_type == 'admin' || used_data.user_type == 'ceo') {
                this.re_doc = this.doc;
                this.pagination();
            } else if (used_data.user_type == 'user') {

                var newper = used_data.user_permission.split('|');
                var new_per = [];

                for (var i = 0; i < newper.length; i++) {
                    if (newper[i] == "rm") {
                        new_per += "rm|";
                    }
                }

                for (var i = 0; i < newper.length; i++) {
                    if (newper[i] == "rs") {
                        new_per += "rs|";
                    }
                }

                for (var i = 0; i < newper.length; i++) {
                    if (newper[i] == "all") {
                        new_per += "all|";
                    }
                }

                if (new_per == 'rm|') {
                    var renew = [];
                    var new_data = JSON.parse(this.doc);
                    $.each(new_data, function(index, value) {
                        if (used_data.user_id == value.user_id) {

                            var doc_add = {
                                "id": value.id,
                                "user_id": value.user_id,
                                "num_in": value.num_in,
                                "docex": value.docex,
                                "doc_in_out": value.doc_in_out,
                                "name": value.name,
                                "detail": value.detail,
                                "file_scan": value.file_scan,
                                "doc_type": value.doc_type,
                                "doc_from": value.doc_from,
                                "doc_to": value.doc_to,
                                "doc_from_type": value.doc_from_type,
                                "sector_type": value.sector_type,
                                "doc_approve": value.doc_approve,
                                "doc_view": value.doc_view,
                                "status": value.status,
                                "date": value.date
                            };
                            renew.push(doc_add);

                        }
                    });

                    var newa = JSON.stringify(renew);
                    this.re_doc = newa;
                    // console.log(newa);
                    this.pagination();

                } else if (new_per == 'rs|' || new_per == 'rm|rs|') {
                    var renew = [];
                    var new_data = JSON.parse(this.doc);
                    $.each(new_data, function(index, value) {
                        if (used_data.user_sector == value.sector_type) {

                            var doc_add = {
                                "id": value.id,
                                "user_id": value.user_id,
                                "num_in": value.num_in,
                                "docex": value.docex,
                                "doc_in_out": value.doc_in_out,
                                "name": value.name,
                                "detail": value.detail,
                                "file_scan": value.file_scan,
                                "doc_type": value.doc_type,
                                "doc_from": value.doc_from,
                                "doc_to": value.doc_to,
                                "doc_from_type": value.doc_from_type,
                                "sector_type": value.sector_type,
                                "doc_approve": value.doc_approve,
                                "doc_view": value.doc_view,
                                "status": value.status,
                                "date": value.date
                            };
                            renew.push(doc_add);

                        }
                    });

                    var newa = JSON.stringify(renew);
                    this.re_doc = newa;
                    //console.log(newa);
                    this.pagination();
                } else if (new_per == 'all|' || new_per == 'rm|all|' || new_per == 'rs|all|' || new_per == 'rm|rs|all|') {
                    this.re_doc = this.doc;
                    this.pagination();
                }


            }
        },
        fdate: function(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [day, month, year].join('/');
        },
        pagi_page: '20',
        pagination: function(page) {

            if (this.doc != '') {
                if (page == null) { page = 1; }
                var new_data = JSON.parse(this.re_doc);
                //var permission = JSON.parse(this.permission_data);
                var stop = page * this.pagi_page;
                var start = stop - this.pagi_page;
                var page_per = Math.ceil(new_data.length / this.pagi_page);
                var act = '';
                $('#list-file-doc').html('');
                for (var i = 0; i < new_data.length; i++) {
                    if (i >= start) {
                        if (i < stop) {
                            $('#list-file-doc').append('<tr> <td class="text-center"> ' + new_data[i].num_in + ' </td> <td> <span id="mg-name' + new_data[i].num_in + '">' + new_data[i].name + '</span> </td> <td class="text-center"> <a style="font-size:20px;" class="pre-doc-detail" data="' + new_data[i].id + '"><i class="ti-wallet"></i></a></td> <td class="text-right"> <button type="button" class="btn btn-outline-primary waves-effect waves-light mg-edit-doc" data="' + new_data[i].id + '"> <i class="ti-pencil-alt"></i> ແກ້ໄຂ</button> <button type="button" data="' + new_data[i].id + '" class="btn btn-outline-danger waves-effect waves-light mg-del-doc"> <i class="ti-trash"></i> ລຶບ</button> </td></tr>');
                        }
                    }
                }
                $("#user-pagination").html('');
                for (var j = 1; j < page_per + 1; j++) {
                    if (page == j) {
                        $("#user-pagination").append('<li  class="page-item active go-doc-page" data="' + j + '" > <a class="page-link" >' + j + ' </a></li>');
                    } else {
                        $("#user-pagination").append('<li  class="page-item  go-doc-page" data="' + j + '" > <a class="page-link" >' + j + ' </a></li>');
                    }
                }
            } //// end if data = ''

            $(".go-doc-page").click(function(e) {
                e.preventDefault();
                var page = $(this).attr("data");
                doc_data.pagination(page);
            });

            $(".pre-doc-detail").click(function(e) {
                e.preventDefault();
                var data = $(this).attr("data");
                $("#preview_doc").modal('show');
                var data_doc = JSON.parse(doc_data.re_doc);
                var sector = JSON.parse(doc_data.sector);
                var grono = JSON.parse(doc_data.grono);
                var user = JSON.parse(doc_data.user);
                var grono_d = '';
                var sector_form = '';
                var sector_to = '';
                var doc_sector = '';
                var title_icon = '';
                // var newdate = ''; doc_data.user
                var byuser = '';
                $.each(data_doc, function(index, value) {
                    if (data == value.id) {
                        if (value.doc_from_type == 'inside') { var side = "ພາຍໃນ"; } else { var side = "ພາຍນອກ"; }
                        $.each(grono, function(index, gno) {
                            if (value.doc_type == gno.id) { grono_d = gno.name; }
                        });
                        $.each(sector, function(index, st) {
                            if (value.doc_from == st.id) { sector_form = st.name; }
                            if (value.doc_to == st.id) { sector_to = st.name; }
                        });
                        $.each(user, function(index, nuser) {
                            if (value.user_id == nuser.id) { byuser = nuser.name; }
                        });

                        if (value.doc_in_out == 'in') { title_icon = ' <i class="ti-angle-double-right"></i> ຂາເຂົ້າ: '; } else { title_icon = ' <i class="ti-angle-double-left"></i> ຂາອອກ: '; }
                        $.each(sector, function(index, dsec) {
                            if (value.sector_type == dsec.id) { doc_sector = dsec.name; }
                        });
                        $("#title-doc-detail").html(title_icon + doc_sector);

                        // console.log(doc_data.fdate(value.date));
                        // console.log(grono_d);

                        // console.log(value.date);
                        if (value.docex == '') {
                            if (value.detail == '') {
                                $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_in + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table>  <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + byuser + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                            } else {
                                $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_in + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table>  <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + byuser + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + value.date + ' </td> </tr> </table> <div style="padding: 10px;"> <strong>ລາຍລະອຽດ:</strong> ' + value.detail + ' </div> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                            }
                        } else {
                            if (value.detail == '') {
                                $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_in + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ເອກະສານ:</strong></td> <td class="mbody">' + value.docex + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + byuser + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + doc_data.fdate(value.date) + ' </td> </tr> </table> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                            } else {
                                $("#data-doc").html('<div id="doc-detail" class="row"> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ບັນທຶກ:</strong></td> <td class="mbody">' + value.num_in + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຊື່ເອກະສານ:</strong></td> <td class="mbody">' + value.name + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເລກທີ່ເອກະສານ:</strong></td> <td class="mbody">' + value.docex + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ໝວດເອກະສານ:</strong></td> <td class="mbody">' + grono_d + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ທີ່ມາ:</strong></td> <td class="mbody">' + side + '</td> </tr> </table>  </div> <div class="col-lg-6"> <table class="box-n"> <tr> <td class="man"> <strong>ຈາກ:</strong></td> <td class="mbody"> ' + sector_form + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ເຖິງ:</strong></td> <td class="mbody"> ' + sector_to + ' </td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ຜູ້ບັນທຶກ:</strong></td> <td class="mbody">' + byuser + '</td> </tr> </table> <table class="box-n"> <tr> <td class="man"> <strong>ວັນທີ່ບັນທຶກ:</strong></td> <td class="mbody"> ' + doc_data.fdate(value.date) + ' </td> </tr> </table> <div style="padding: 10px;"> <strong>ລາຍລະອຽດ:</strong> ' + value.detail + ' </div> </div> </div> <div class="row" id="file-scan-doc"> <div class="col-md-12"> <table class="box-n"> <tr> <td class="man"> <strong>ໄຟລ໌ທີ່ແນບມາ:</strong></td> </table> <div id="file-at"></div> <div id="sh-file"></div> </div> </div>');
                            }
                        }
                        // console.log(value.file_scan);
                        if (value.file_scan != null && value.file_scan != '') {
                            var file = [];
                            var file_db = value.file_scan.split("||");
                            // console.log(file_db);
                            for (let i = 0; i < file_db.length; i++) {
                                if (file_db[i] != '') {
                                    // console.log(file_db[i]);

                                    var fm = file_db[i].split('.');
                                    if (fm[1] == 'pdf' || fm[1] == 'PDF') {
                                        file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-pdf.png" width="64"> </a>';
                                    } else if (fm[1] == 'jpg' || fm[1] == 'JPG') {
                                        file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-jpg.png" width="64"> </a>';
                                    } else if (fm[1] == 'jpeg' || fm[1] == 'JPEG') {
                                        file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-jpg.png" width="64"> </a>';
                                    } else if (fm[1] == 'png' || fm[1] == 'PNG') {
                                        file += '<a data="' + file_db[i] + '" class="pwfile"> <img src="' + url + 'images/file-png.png" width="64"> </a>';
                                    }
                                }

                            }
                        }
                        //console.log(file);
                        $("#file-at").html(file);
                        $(".pwfile").click(function(e) {
                            e.preventDefault();
                            var dt = $(this).attr("data");
                            //console.log(dt);
                            var sfile = dt.split('.');
                            if (sfile[1] == 'pdf') {
                                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                                    //alert('m');
                                    $('#sh-file').html('<form method="get" action="' + url + 'file_upload/' + dt + '"><center><button type="submit" class="btn btn-default" ><i class="fa fa-file-pdf-o"></i> ດາວໂຫລດເອກະສານ PDF</button></center></form>');

                                } else {
                                    $('#sh-file').html('<object data="' + url + 'file_upload/' + dt + '" type="application/pdf" width="100%" height="500"></object>');
                                }
                            } else {
                                $('#sh-file').html('<image src="' + url + 'file_upload/' + dt + '" width="100%" >');
                            }
                        });
                    }
                });


            });

            ////// =========================================== edit data ==========================================================
            $("#form-edit").html('');
            $(".mg-edit-doc").click(function(e) {
                e.preventDefault();
                var id = $(this).attr("data");
                var data_doc = JSON.parse(doc_data.re_doc);
                var sector = JSON.parse(doc_data.sector);
                var grono = JSON.parse(doc_data.grono);
                var user = JSON.parse(doc_data.user);
                $("#search_document").attr("disabled", true);
                $("#show-data-list").hide();

                $.each(data_doc, function(index, value) {
                    if (value.id == id) {
                        if (value.doc_in_out == 'in') {
                            $("#form-edit").html('<button type="button" class="close mg-form-close"> <span aria-hidden="true">×</span> </button> <div class="row"> <div class="col-sm-6 col-md-6 col-lg-6"><strong>  <h5><i class="ti-angle-double-right"></i> ຂໍ້ມູນເອກະສານ ຂາເຂົ້າ</h5> </strong> <div class="progress progress-striped"> <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="process-bar-doc" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> <form class="form"> <div class="form-group"></div> <div class="form-group" style="width: 180px;"> <div class="input-group"> <div class="input-group-addon"> ເລກທີ່ ຂາເຂົ້າ: </div><input type="text" id="num-doc" readonly class="form-control" value="" data=""></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຊື່ເອກະສານ: </div><input type="text" id="name-doc" class="form-control" placeholder=" ຊື່ເອກະສານ.... "></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ເລກທີ່ເອກະສານ: </div><input type="text" id="ndoc-doc" class="form-control" placeholder="ເລຫທີ່ ສະຖານທີ່, ວວ ດດ ປປປປ"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ທີ່ມາຂອງເອກະສານ: </div><input type="text" readonly id="doc-type-seclect" class="form-control"> </div> </div> <p> <div class="form-inline num_manual"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ໝວດເອກະສານ: </div><input type="text" readonly id="doc-type-doc" class="form-control"></div> </div> </div> </p> <p> <div class="form-inlines"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon "> ຈາກພາກສ່ວນ: </div><input type="text" readonly id="form-sector-doc" class="form-control"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ເຖິງພາກສ່ວນ: </div><input type="text" readonly id="to-sector-doc" class="form-control"></div> </div> </div> </p> <div class="form-group" style="width: 200px;"> <div class="input-group"> <div class="input-group-addon"> ວັນທີ່ບັນທຶກ: </div><input type="text" class="form-control" id="doc-date" readonly value="00/00/0000"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຜູ້ບັນທຶກ: </div><input type="text" class="form-control" id="save-doc-by" readonly value=""></div> </div>ລາຍລະອຽດເພີ່ມເຕີມ:<textarea name="" id="doc-detail" class="form-control" rows="5" required="required"></textarea></form> </div> <div class="col-sm-6 col-md-6 col-lg-6" id="upload-file"> <input type="hidden" class="file_upload" value=""><strong> <h5> <i class="ti-clip"></i> ໄຟລ໌ເອກະສານອັບໂຫລດ</h5>  </strong> <ul class="list-group list_file"> </ul> <p><span id="output"></span><span class="sh_img"></span></p> <div class="progress progress-striped upload-bar" style="display: none;"> <p> <div class="progress-bar progress-bar-striped progress-bar-animated up-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> </p> <input type="hidden" value="" id="file-edit-up"> <form id="form_upload"><input type="file" name="file_upload" style="display: none;" id="f_upload"></form> <P class="text-center"><button type="button" class="btn btn-success waves-effect waves-light" onclick="$(\'#f_upload\').click()"> <i class="ti-export"></i> ເລືອກໄຟລ໌ເອກະສານ</button></P> </div> <div class="col-sm-12" id="last-docin" style="display:none;"> <strong> <h5> <i class="ti-list"></i> ລາຍການບັນທຶກ ລ່າສຸດ</h5>  </strong> <div class="table-responsive" id="show-data-list"> <table class="table table-hover mb-0"> <thead> <tr> <th width="140" class="text-center">ເລກທີ່ບັນທຶກ</th> <th>ຊື່ເອກະສານ</th> <th width="120" class="text-center">ລາຍລະອຽດ</th> </tr> </thead> <tbody id="list-file-doc"> </tbody> </table> </div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_file" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="myLargeModalLabel"><i class="ti-export"></i> ໄຟລ໌ທີ່ທ່ານອັບໂຫລດ</h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body sh_file"></div> </div> <div class="modal-footer"><button type="button" class="btn btn-default btn_print" data=""> <span class="glyphicon glyphicon-print" aria-hidden="true"></span> ສັ່ງພິມ</button></div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_doc" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="title-doc-detail"> </h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body" id="data-doc"> </div> </div> </div> </div> </div>');
                            $("#num-doc").val(value.num_in);
                            $("#name-doc").val(value.name);
                            $("#ndoc-doc").val(value.docex);
                            //doc_data.file_scan = value.file_scan;
                            $("#file-edit-up").val(value.file_scan);
                            if (value.doc_in_out == 'in') {
                                $("#doc-type-seclect").val('ພາຍໃນ');
                            } else {
                                $("#doc-type-seclect").val('ພາຍນອກ');
                            }

                            $("#doc-date").val(redate(value.date));
                            $("#doc-detail").val(value.detail);
                            $.each(sector, function(index, sform) {
                                if (value.doc_from == sform.id) {
                                    $("#form-sector-doc").val(sform.name)
                                }
                            });

                            $.each(sector, function(index, sto) {
                                if (value.doc_to == sto.id) {
                                    $("#to-sector-doc").val(sto.name);
                                }
                            });

                            $.each(grono, function(index, gno) {

                                if (value.doc_type == gno.id) {
                                    $("#doc-type-doc").val(gno.name);
                                }

                            });

                            $.each(user, function(index, us) {
                                if (value.user_id == us.id) {
                                    $("#save-doc-by").val(us.name);
                                }
                            });

                            var fupn = value.file_scan;
                            var file = fupn.split("||");
                            for (var i = 0; i <= file.length; i++) {
                                var filep = file[i];
                                if (filep != null) {
                                    var sfile = filep.split(".");
                                    var nn = 1;
                                    if (filep != '') {
                                        var ttsize = '';

                                        get_file_size(url + 'file_upload/' + filep, sfile[0], filep);

                                    }
                                }
                            }


                        } else if (value.doc_in_out == 'out') {
                            console.log('doc-out');
                            $("#form-edit").html('<button type="button" class="close mg-form-close"> <span aria-hidden="true">×</span> </button> <div class="row"> <div class="col-sm-6 col-md-6 col-lg-6"><strong>  <h5><i class="ti-file"></i> ຂໍ້ມູນເອກະສານ</h5> </strong> <div class="progress progress-striped"> <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="process-bar-doc" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> <form class="form"> <div class="form-group"></div> <div class="form-group" style="width: 180px;"> <div class="input-group"> <div class="input-group-addon"> ເລກທີ່ ຂາເຂົ້າ: </div><input type="text" id="num-doc" class="form-control" value="" data=""></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຊື່ເອກະສານ: </div><input type="text" id="name-doc" class="form-control" placeholder=" ຊື່ເອກະສານ.... "></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ເລກທີ່ເອກະສານ: </div><input type="text" id="ndoc-doc" class="form-control" placeholder="ເລຫທີ່ ສະຖານທີ່, ວວ ດດ ປປປປ"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ທີ່ມາຂອງເອກະສານ: <input type="radio" name="dc-t" checked id="docin-type-select-in" data="inside"> ພາຍໃນ <input type="radio" name="dc-t" id="docin-type-select-out" data="outside"> ພາຍນອກ </div> </div> </div> <p> <div class="form-inline num_manual"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ໝວດເອກະສານ: </div><select class="form-control" id="doc-type-doc"></select></div> </div> </div> </p> <p> <div class="form-inlines"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon "> ຈາກພາກສ່ວນ: </div><select class="form-control" id="form-sector-doc"></select></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ເຖິງພາກສ່ວນ: </div><select class="form-control" id="to-sector-doc"></select></div> </div> </div> </p> <div class="form-group" style="width: 200px;"> <div class="input-group"> <div class="input-group-addon"> ວັນທີ່ບັນທຶກ: </div><input type="text" class="form-control" id="doc-date" readonly value="23/12/2018"></div> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"> ຜູ້ບັນທຶກ: </div><input type="text" class="form-control" id="save-doc-by" readonly value="admin"></div> </div>ລາຍລະອຽດເພີ່ມເຕີມ:<textarea name="" id="doc-detail" class="form-control" rows="5" required="required"></textarea></form> </div> <div class="col-sm-6 col-md-6 col-lg-6" id="upload-file"> <input type="hidden" class="file_upload" value=""><strong> <h5> <i class="ti-clip"></i> ໄຟລ໌ເອກະສານອັບໂຫລດ</h5>  </strong> <ul class="list-group list_file"> </ul> <p><span id="output"></span><span class="sh_img"></span></p> <div class="progress progress-striped upload-bar" style="display: none;"> <p> <div class="progress-bar progress-bar-striped progress-bar-animated up-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only">60% Complete</span></div> </div> </p> <form id="form_upload"><input type="file" name="file_upload" style="display: none;" id="f_upload"></form> <P class="text-center"><button type="button" class="btn btn-success waves-effect waves-light" onclick="$(\'#f_upload\').click()"> <i class="ti-export"></i> ເລືອກໄຟລ໌ເອກະສານ</button></P> </div> <div class="col-sm-12" id="last-docin" style="display:none;"> <strong> <h5> <i class="ti-list"></i> ລາຍການບັນທຶກ ລ່າສຸດ</h5>  </strong> <div class="table-responsive" id="show-data-list"> <table class="table table-hover mb-0"> <thead> <tr> <th width="140" class="text-center">ເລກທີ່ບັນທຶກ</th> <th>ຊື່ເອກະສານ</th> <th width="120" class="text-center">ລາຍລະອຽດ</th> </tr> </thead> <tbody id="list-file-doc"> </tbody> </table> </div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_file" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="myLargeModalLabel"><i class="ti-export"></i> ໄຟລ໌ທີ່ທ່ານອັບໂຫລດ</h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body sh_file"></div> </div> <div class="modal-footer"><button type="button" class="btn btn-default btn_print" data=""> <span class="glyphicon glyphicon-print" aria-hidden="true"></span> ສັ່ງພິມ</button></div> </div> </div> </div> <div class="modal fade bs-example-modal-lg" id="preview_doc" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style="display: none;" aria-hidden="true"> <div class="modal-dialog modal-lg"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title mt-0" id="title-doc-detail"> </h5> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> </div> <div class="modal-body"> <div class="modal-body" id="data-doc"> </div> </div> </div> </div> </div>');
                            $("#num-doc").val(value.num_in);
                            $("#name-doc").val(value.name);
                            $("#ndoc-doc").val(value.docex);
                        }


                    }
                });


                $(".mg-form-close").click(function(e) {
                    e.preventDefault();
                    $("#form-edit").html('');
                    $("#show-data-list").slideDown('slow');
                    $("#search_document").attr("disabled", false);
                });

                //get_sector_docin();




            });



            /// function  




            function redate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [day, month, year].join('/');
            }





            function get_file_size(url, fid, file) /// function read file size back
            {
                var filesize = '';
                var http = new XMLHttpRequest();
                http.open('HEAD', url, true);
                http.onreadystatechange = function() {
                    if (this.readyState == this.DONE) {
                        if (this.status === 200) {
                            filesize = this.getResponseHeader('Content-Length');
                            //$('.list_file').append('<li class="list-group-item f_' + fid + '"> <i class="fa fa-file-pdf-o"></i> ໄຟລ໌ອັບໂຫລດ <span class="pull-right"><a onclick="preview(\'' + file + '\')" ><span class="glyphicon glyphicon-book" aria-hidden="true"></span> ເບີ່ງໄຟລ໌ ອັບໂຫລດ</a><span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span><a onclick="delfile(\'' + file + '\')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </a> </span> <br> <small>ຂະໜາດໄຟລ໌: ' + formatSizeUnits(filesize) + '</small >  </li>');
                            $('.list_file').append('<li class="list-group-item f_' + fid + ' flit"> <i class="fa fa-file-pdf-o"></i> ໄຟລ໌ອັບໂຫລດ <span class="pull-right"><a class="prev_img" data="' + file + '" onclick="preview(\'' + file + '\')" > <i class="ti-export"></i> ເບີ່ງໄຟລ໌ ອັບໂຫລດ</a>  <i class="ti-split-v-alt"></i>  <a onclick="mgdelfile(\'' + file + '\')" data="' + file + '" class="mg-delfile"><i class="ti-close"></i> </a> </span> <br> <small>ຂະໜາດໄຟລ໌: ' + formatSizeUnits(filesize) + '</small></li>');

                        }
                    }
                };
                http.send();
            }

            function formatSizeUnits(bytes) {
                if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + ' GB'; } else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + ' MB'; } else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + ' KB'; } else if (bytes > 1) { bytes = bytes + ' bytes'; } else if (bytes == 1) { bytes = bytes + ' byte'; } else { bytes = '0 byte'; }
                return bytes;
            }



            ////// =========================================== end edit data ==========================================================


            $(".mg-del-doc").click(function(e) {
                e.preventDefault();
                var id = $(this).attr("data");
                console.log(id);
            });

        }
    };




    var dt = new Date();
    var month = dt.getMonth() + 1;
    var year = used_data.year;

    get_db_list_doc();

    function get_db_list_doc() {
        $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_doc_sector_grono', month: month, year: year },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                var new_m = data.split('|X|');
                doc_data.grono = new_m[0];
                doc_data.sector = new_m[1];
                doc_data.user = new_m[2];
                doc_data.doc = new_m[3];

                //console.log(doc_data.doc);
                doc_data.renew_data();
                //doc_data.pagination();
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_db_list_doc() } }
        });
    }




    $("#search_document").click(function(e) {
        e.preventDefault();
        //alert("Search");

        var year = used_data.year;
        if (doc_data.doc_search == '') {
            get_search();
        }

        function get_search() {
            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
            $.ajax({
                url: url + 'index.php/' + 'mg_data/get_data',
                type: "POST",
                data: { get_db: 'db_doc_search', year: year },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                    doc_data.doc_search = data;
                    //console.log(data);
                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_search() } }
            });
        }
    });

    $("#search_document").keyup(function(e) {
        var db_data = JSON.parse(doc_data.doc_search);
        var key = $(this).val();
        if (key == '') {
            doc_data.renew_data();
        } else {
            var renew = [];
            $.each(db_data, function(index, value) {
                if (value.name.search(new RegExp(key, 'i')) != -1 || value.docex.search(new RegExp(key, 'i')) != -1 || value.num_in.search(new RegExp(key, 'i')) != -1) {
                    var doc_add = {
                        "id": value.id,
                        "user_id": value.user_id,
                        "num_in": value.num_in,
                        "docex": value.docex,
                        "doc_in_out": value.doc_in_out,
                        "name": value.name,
                        "detail": value.detail,
                        "file_scan": value.file_scan,
                        "doc_type": value.doc_type,
                        "doc_from": value.doc_from,
                        "doc_to": value.doc_to,
                        "doc_from_type": value.doc_from_type,
                        "sector_type": value.sector_type,
                        "doc_approve": value.doc_approve,
                        "doc_view": value.doc_view,
                        "status": value.status,
                        "date": value.date
                    };
                    renew.push(doc_add);
                    return;
                }
            });
            var newa = JSON.stringify(renew);
            doc_data.re_doc = newa;
            doc_data.pagination();
        }
    });




}
///// function  file-edit-up

function mgdelfile(file) {
    var sfile = file.split(".");
    var fup = $("#file-edit-up").val();
    var ud_file = fup.replace(file + "||", "");
    //doc_data.file_scan = ud_file;
    $("#file-edit-up").val(ud_file);
    console.log(file);
    delfile_up();

    function delfile_up() {
        $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
        $.ajax({
            url: url + 'index.php/' + 'mg_data/del_file',
            type: "POST",
            data: { file: file },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                $('.f_' + sfile[0]).slideUp('slow');
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { post_img() } }
        });
    }
}

//// end doc-mg page -----------------------

/// Doc-trash page ---------------------------
function doc_trash(used_data) {
    // document.getElementById("main_center").innerHTML = "Doc-Trash";
    var title = '<div class="header-top"><span class="pull-left"><h4 class="mt-0 m-b-15 header-title"> <h5><i class="ti-trash"></i> ຖັງຂີ້ເຫຍື້ອ ລະບົບ </h5></h4></span><span class="pull-right text-right"><button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-save"> <i class="ti-save"></i> ບັນທຶກ </button> <i class="ti-split-v-alt"></i> <button type="button" class="btn btn-outline-danger waves-effect waves-light" id="bt-cancel"> <i class="ti-close"></i> ລ້າງຂໍ້ມູນ </button><div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;"></div></span><div class="clearfix"></div></div>';

    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = "ລະບົບຖັງຂີ້ເຫຍື້ອລະບົບ ກຳລັງປັບປຸງ...";

}
//// end doc-trash page -----------------------

/// Doc-report page ---------------------------
function doc_report(used_data) {
    //document.getElementById("main_center").innerHTML = "Doc-Report";
    var title = '<div class="header-top"><span class="pull-left"><h4 class="mt-0 m-b-15 header-title"> <h5><i class="ti-layers-alt"></i> ລາຍງານ ເອກະສານ </h5></h4></span><span class="pull-right text-right"><button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-save"> <i class="ti-save"></i> ບັນທຶກ </button> <i class="ti-split-v-alt"></i> <button type="button" class="btn btn-outline-danger waves-effect waves-light" id="bt-cancel"> <i class="ti-close"></i> ລ້າງຂໍ້ມູນ </button><div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;"></div></span><div class="clearfix"></div></div>';

    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = "ລະບົບລາຍງານ ກຳລັງປັບປຸງ...";
}
//// end doc-report page -----------------------

/// Ad-system page ---------------------------
function ad_system(used_data) {
    // document.getElementById("main_center").innerHTML = "Ad-System";
    var title = '<div class="header-top"><span class="pull-left"><h4 class="mt-0 m-b-15 header-title"> <h5><i class="ti-settings"></i> ຕັ້ງຄ່າລະບົບ </h5></h4></span><span class="pull-right text-right"><div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;" id="processing"></div></span><div class="clearfix"></div></div>';
    var body = ' <div class="row"> <div class="col-sm-6 col-md-6 col-lg-6"> <strong>  <h5><i class="ti-reload"></i> ຂໍ້ມູນ ການອັບໂຫລດ</h5> </strong> <p><strong>ຂະໜາດຂອງໄຟລ໌ ອັບໂຫລດ:</strong> </p> <input type="text" id="st-data-file-type" style="display:none;"> <p> <div class="input-group"> <input type="text" class="form-control" id="st-file-size" placeholder="ຂະໜາດໄຟລ໌ ອັບໂຫລດ"> <span class="input-group-addon" id="sizing-addon2">Kb</span> </div> ຂະໜາດໄຟລ໌: 1024 Kb = 1Mb </p> <P> <ul class="list-group"> <li class="list-group-item active"> <strong>ປະເພດໄຟລ໌ ອາຍຸຍາດໃຫ້ ອັບໂຫລດ:</strong> </li> <li class="list-group-item"> <input type="checkbox" id="st-pdf"> <i class="mdi mdi-file-pdf" style="font-size:25px;"></i> ໄຟລ໌ປະເພດ ເອກະສານ PDF</li> <li class="list-group-item"> <input type="checkbox" id="st-jpg"> <i class="mdi mdi-file-image" style="font-size:25px;"></i> ໄຟລ໌ປະເພດ ຮູບພາບ JPG</li> <li class="list-group-item"> <input type="checkbox" id="st-png"> <i class="mdi mdi-file-image" style="font-size:25px;"></i> ໄຟລ໌ປະເພດ ຮູບພາບ PNG</li> </ul> </P> </div> <div class="col-sm-6 col-md-6 col-lg-6"> <strong>  <h5><i class="ti-server"></i> ລະບົບ ຖານຂໍ້ມູນ </h5> </strong> <div> <div class="pull-right"> <button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-st-add-db"> <i class="ti-plus"></i> ເພີ່ມຖານຂໍ້ມູນ</button> <button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-st-save-db" style="display:none;"> <i class="ti-save"></i> ບັນທຶກ</button> <button type="button" class="btn btn-outline-danger waves-effect waves-light" id="bt-st-cancel" style="display:none;"> <i class="ti-close"></i> ຍົກເລິກ</button> </div> <div class="clearfix"></div> </div> <P> <P > <div id="st-form-db" style="display:none;" class="input-group"> <span class="input-group-addon">ກຳນົດປີ ຂອງຖານຂໍ້ມູນ</span> <input type="text" class="form-control" id="st-input-year" placeholder="ປ້ອນປີ 2xxx....."> </div> </P> <ul class="list-group" id="st-list-db"> </ul> </P> </div> </div>';
    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = body;

    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');


    get_db_ad();

    function get_db_ad() {
        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_setting_one', id: '1' },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                var db_data = $.parseJSON(data);
                $.each(db_data, function(index, value) {
                    $("#st-file-size").val(value.maxfile_size);

                    var file_type = value.file_type_upload;
                    $('#st-data-file-type').val(file_type);
                    if (file_type != null) {
                        var sp = file_type.split(",");

                        for (var i = 0; i < sp.length; i++) {
                            if (sp[i] != '') {

                                if (sp[i] == "'image/jpeg'") { $('#st-jpg').attr('checked', true); }
                                if (sp[i] == "'image/png'") { $('#st-png').attr('checked', true); }
                                if (sp[i] == "'application/pdf'") { $('#st-pdf').attr('checked', true); }
                            }
                        }
                    }

                });
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_db_ad() } }
        });
    }

    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');


    get_db_ad_y();

    function get_db_ad_y() {
        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'get_db_year' },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                var db_data = $.parseJSON(data);
                $.each(db_data, function(index, value) {

                    $("#st-list-db").append('<li class="list-group-item" id="ls-db-year' + value.id + '"> <i class="ti-view-list"></i> <strong>ຖານຂໍ້ມູນປີ ' + value.name + '</strong> <a href="' + url_d + '" onclick="del_db_y(\'' + value.id + '\')" class="pull-right"><i class="ti-trash" style="font-size:20px;"></i></a> <hr> <input type="checkbox" id="st-read' + value.id + '" onclick="ch_read(\'' + value.id + '\')"> ອ່ານຢ່າງດຽວ <input type="radio" id="st-use' + value.id + '" onclick="ch_use(\'' + value.id + '\')" name="us"> ນຳໃຊ້ຂໍ້ມູນ </li>');

                    if (value.data_readonly == '1') { $("#st-read" + value.id).attr("checked", true); } else { $("#st-read" + value.id).attr("checked", false); }
                    if (value.data_used == '1') { $("#st-use" + value.id).attr("checked", true); } else { $("#st-use" + value.id).attr("checked", false); }
                });

            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { get_db_ad_y() } }
        });
    }

    //// check check file

    $('#st-jpg').click(function(event) {
        if ($('#st-jpg').is(':checked')) {
            var file_type = $('#st-data-file-type').val();
            $('#st-data-file-type').val(file_type + "'image/jpeg',");
        } else if ($('#st-jpg').is(':not(:checked)')) {
            var file_type = $('#st-data-file-type').val();
            var nfile_type = file_type.replace("'image/jpeg',", '');
            $('#st-data-file-type').val(nfile_type);
        }
        save_stting_file();
    });

    $('#st-pdf').click(function(event) {
        if ($('#st-pdf').is(':checked')) {
            var file_type = $('#st-data-file-type').val();
            $('#st-data-file-type').val(file_type + "'application/pdf',");
        } else if ($('#st-pdf').is(':not(:checked)')) {
            var file_type = $('#st-data-file-type').val();
            var nfile_type = file_type.replace("'application/pdf',", '');
            $('#st-data-file-type').val(nfile_type);
        }
        save_stting_file();
    });

    $('#st-png').click(function(event) {
        if ($('#st-png').is(':checked')) {
            var file_type = $('#st-data-file-type').val();
            $('#st-data-file-type').val(file_type + "'image/png',");
        } else if ($('#st-png').is(':not(:checked)')) {
            var file_type = $('#st-data-file-type').val();
            var nfile_type = file_type.replace("'image/png',", '');
            $('#st-data-file-type').val(nfile_type);
        }
        save_stting_file();
    });


    /// key number only
    $('#st-file-size').on("keypress keyup blur paste drop", function(event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $("#st-input-year").on("keypress keyup blur paste drop", function(event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $('#st-file-size').keyup(function(e) {
        save_stting_file();
    });


    ///// DB ////

    $("#bt-st-add-db").click(function(e) {
        e.preventDefault();
        $("#bt-st-add-db").hide();
        $("#st-form-db").show();
        $("#bt-st-save-db").show();
        $("#bt-st-save-db").attr("disabled", true);
        $("#bt-st-cancel").show();
        $("#st-input-year").val('');
        var intrvl = setInterval(function() {
            $('#st-input-year:first').focus();
            clearInterval(intrvl);
        }, 800);
    });

    $("#bt-st-cancel").click(function(e) {
        e.preventDefault();
        $("#st-form-db").hide();
        $("#bt-st-save-db").hide();
        $("#bt-st-cancel").hide();
        $("#bt-st-add-db").show();

    });

    $("#st-input-year").keyup(function(e) {
        var year = $("#st-input-year").val();
        if (year != '') {
            $("#bt-st-save-db").attr("disabled", false);
        }
    });

    $("#bt-st-save-db").click(function(e) {
        e.preventDefault();
        $("#bt-st-save-db").attr("disabled", true);
        var year = $("#st-input-year").val();
        if (year != '') {
            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');


            st_save_db();

            function st_save_db() {

                $.ajax({
                    url: url + 'index.php/' + 'mg_data/add',
                    type: "POST",
                    data: { post_type: 'add_year', year: year },
                    timeout: 6000,
                    success: function(data) {
                        $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                        $('.loading').fadeOut(2000);
                        $("#st-input-year").val('');
                        $("#st-form-db").hide();
                        $("#bt-st-save-db").hide();
                        $("#bt-st-cancel").hide();
                        $("#bt-st-add-db").show();
                        $("#st-list-db").prepend('<li class="list-group-item" id="ls-db-year' + data + '"> <i class="ti-view-list"></i> <strong>ຖານຂໍ້ມູນປີ ' + year + '</strong> <a href="' + url_d + '" onclick="del_db_y(\'' + data + '\')" class="pull-right"><i class="ti-trash" style="font-size:20px;"></i></a> <hr> <input type="checkbox"  id="st-read' + data + '" onclick="ch_read(\'' + data + '\')"> ອ່ານຢ່າງດຽວ <input type="radio"  id="st-use' + data + '" onclick="ch_use(\'' + data + '\')" name="us"> ນຳໃຊ້ຂໍ້ມູນ </li>');

                    },
                    error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { st_save_db() } }
                });
            }
        }
    });

    $('#st-input-year').keyup(function(event) { // check key enter
        if (event.keyCode == 13) {
            $('#bt-st-save-db').click();
        }
    });


}

/////// function Ad-System
function save_stting_file() {
    var file_size = $('#st-file-size').val();
    var file_type = $('#st-data-file-type').val();
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

    st_save_db_file();

    function st_save_db_file() {
        $.ajax({
            url: url + 'index.php/' + 'mg_data/update',
            type: "POST",
            data: { post_type: 'update_setting_file', id: '1', file_size: file_size, file_type: file_type },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { st_save_db_file() } }
        });
    }

}

function ch_use(id) {
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

    st_save_db_use();

    function st_save_db_use() {
        $.ajax({
            url: url + 'index.php/' + 'mg_data/update',
            type: "POST",
            data: { post_type: 'update_setting_use', id: id, use: '1' },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { st_save_db_use() } }
        });
    }
}

function ch_read(id) {
    if ($('#st-read' + id).is(':checked')) {
        //alert('check');
        $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

        st_save_db_read();

        function st_save_db_read() {
            $.ajax({
                url: url + 'index.php/' + 'mg_data/update',
                type: "POST",
                data: { post_type: 'update_setting_readonly', id: id, read: '1' },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { st_save_db_read() } }
            });
        }

    } else if ($('#st-read' + id).is(':not(:checked)')) {
        //alert('do not check');
        $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
        st_save_db_read_no();

        function st_save_db_read_no() {
            $.ajax({
                url: url + 'index.php/' + 'mg_data/update',
                type: "POST",
                data: { post_type: 'update_setting_readonly', id: id, read: '0' },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { st_save_db_read_no() } }
            });
        }


    }
}

function del_db_y(id) {
    alert('del ' + id);
}


//// end ad_system page -----------------------

/// Ad-se page ---------------------------
function ad_se(used_data) {
    //console.log(used_data.user_name);
    //document.getElementById("main_center").innerHTML = "Ad-se";
    var title = '<div class="header-top"><span class="pull-left"><h4 class="mt-0 m-b-15 header-title"> <h5><i class="ti-panel"></i> ສຳນັກງານ </h5></h4></span><span class="pull-right text-right" ><span id="btn-right"><button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-back"  style="display:none;"> <i class="ti-angle-left"></i> ກັບ</button> <button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-save" bt_data="add" id_data=""> <i class="ti-save"></i> ບັນທຶກ</button> <button type="button" class="btn btn-outline-danger waves-effect waves-light" id="bt-cancel"> <i class="ti-close"></i> ຍົກເລີກ</button> <button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-add"> <i class="ti-plus"></i> ເພີ່ມໃໝ່</button></span><div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;" id="processing"></div></span><div class="clearfix"></div></div>';
    var body = '<div class="col-md-6" id="view-sector" style="display:none;"><table class="table" style="font-size:18px;"><thead><tr><th width="140"> <strong> ຊື່ພາກສ່ວນ: </strong></th><th id="v-name"></th></tr></thead><tbody><tr><td> <strong> ພາກສ່ວນ:</strong></td><td id="v-type"></td></tr><tr><td> <strong> ທີ່ຕັ້ງ:</strong></td><td><P id="v-village"></P><P id="v-city"></P><P id="v-province"></P></td></tr><tr><td> <strong> ເບີໂທ:</strong></td><td><P id="v-tel"></P></td></tr></tbody></table></div> <div class="col-md-6" id="add-sector" style="display:none;"> <table class="table" style="font-size:18px;"> <thead> <tr> <th width="140"> <strong> ຊື່ພາກສ່ວນ: </strong></th> <th> <input type="text" class="form-control" name="" id="add-name" placeholder=" ປ້ອນຊື່ຂອງພາກສ່ວນທີ່ຕ້ອງການ... "> </th> </tr> </thead> <tbody> <tr> <td> <strong> ພາກສ່ວນ:</strong></td> <td> <select id="add-type" class="form-control"> <option value=""> = ເລືອກພາກສ່ວນ =</option> <option value="ho"> ສຳນັກງານໃຫຍ່ </option> <option value="se"> ຂະແໜງ </option> <option value="bc"> ສາຂາ </option> <option value="ou"> ພາກສວ່ນພາຍນອກ </option> </select> </td> </tr> <tr> <td> <strong> ທີ່ຕັ້ງ:</strong></td> <td> <P><input type="text" class="form-control" name="" id="add-village" placeholder="ທີ່ຕັ້ງ ບ້ານ..."></P> <P><input type="text" class="form-control" name="" id="add-city" placeholder="ທີ່ຕັ້ງ ເມືອງ..."></P> <P><input type="text" class="form-control" name="" id="add-province" placeholder="ທີ່ຕັ້ງ ແຂວງ...."></P> </td> </tr> <tr> <td> <strong> ເບີໂທ:</strong></td> <td> <P><input type="text" class="form-control" name="" id="add-tel" placeholder=" ເບີໂທລະສັບ..."></P> </td> </tr> </tbody> </table> </div><div class="col-md12" id="list_sector"> <div class="table-responsive"> <table class="table table-hover mb-0"> <thead> <tr> <th>ຊື່ພາກສ່ວນ</th> <th class="text-center" width="120">ລາຍລະອຽດ</th> <th class="text-center" width="180">ຈັດການ ຂໍ້ມູນ</th> </tr> </thead> <tbody id="list_item_sector"> </tbody> </table> </div> </div>';

    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = body;


    /// get data ------------
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

    ad_get_sector();

    function ad_get_sector() {
        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_sector' },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                var db_data = $.parseJSON(data);
                $.each(db_data, function(index, value) {
                    $('#list_item_sector').append('<tr id="del_se' + value.id + '"><td id="sl_name-' + value.id + '"> <strong>' + value.name + '</strong></td><td class="text-center"><a href="' + url_d + '" Onclick="shdata(\'' + value.id + '\');" style="font-size:20px;"><i class="ti-wallet"></i></a></td><td class="text-right"><button type="button" class="btn btn-outline-primary waves-effect waves-light" Onclick="edit_se(\'' + value.id + '\')"> <i class="ti-pencil-alt"></i> ແກ້ໄຂ</button> <button type="button" class="btn btn-outline-danger waves-effect waves-light" Onclick="del_se(\'' + value.id + '\')"> <i class="ti-trash"></i> ລຶບ</button></td></tr>');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ad_get_sector() } }
        });
    }

    $('#bt-save').hide();
    $('#bt-cancel').hide();

    $('#bt-add').click(function() {
        $('#bt-add').hide();
        $('#bt-save').show();
        $('#bt-cancel').show();
        $('#add-sector').show();
        $('#list_sector').hide();

        $('#add-name').val('');
        $('#add-village').val('');
        $('#add-city').val('');
        $('#add-province').val('');
        $('#add-tel').val('');
        $('#add-type').val('');
        $('#bt-cancel').attr("disabled", false);
        $('#bt-save').attr("disabled", false);
        var intrvl = setInterval(function() {
            $('#add-name:first').focus();
            clearInterval(intrvl);
        }, 800);
        check_data();
    });

    $('#bt-cancel').click(function() {
        $('#bt-save').hide();
        $('#bt-cancel').hide();
        $('#bt-add').show();
        $('#add-sector').hide();
        $('#list_sector').show();
    });

    function check_data() {
        var name = $('#add-name').val();
        var village = $('#add-village').val();
        var city = $('#add-city').val();
        var province = $('#add-province').val();
        var tel = $('#add-tel').val();
        var type = $('#add-type').val();

        if (name == '') { $('#bt-save').attr("disabled", true); } else {
            if (village == '') { $('#bt-save').attr("disabled", true); } else {
                if (city == '') { $('#bt-save').attr("disabled", true); } else {
                    if (province == '') { $('#bt-save').attr("disabled", true); } else {
                        if (tel == '') { $('#bt-save').attr("disabled", true); } else {
                            if (type == '') { $('#bt-save').attr("disabled", true); } else {
                                $('#bt-save').attr("disabled", false);
                            }

                        }
                    }
                }
            }
        }
    }

    $('#add-name').keyup(function() { check_data(); });
    $('#add-village').keyup(function() { check_data(); });
    $('#add-city').keyup(function() { check_data(); });
    $('#add-province').keyup(function() { check_data(); });
    $('#add-tel').keyup(function() { check_data(); });
    $('#add-type').change(function() { check_data(); });



    $('#bt-save').click(function(e) {
        e.preventDefault();
        var name = $('#add-name').val();
        var village = $('#add-village').val();
        var city = $('#add-city').val();
        var province = $('#add-province').val();
        var tel = $('#add-tel').val();
        var type = $('#add-type').val();
        var bt_data = $('#bt-save').attr('bt_data');

        $('#bt-cancel').attr("disabled", true);
        $('#bt-save').attr("disabled", true);

        switch (bt_data) {
            case 'add':
                if (name != '' && village != '' && city != '' && province != '' && tel != '' && type != '') {
                    $('#add-sector').hide();
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    ad_save_sector();

                    function ad_save_sector() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/add',
                            type: "POST",
                            data: { post_type: 'add_sector', name: name, village: village, city: city, province: province, tel: tel, type: type },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-save').hide();
                                $('#bt-cancel').hide();
                                $('#bt-add').show();
                                $('#list_sector').slideDown("slow");
                                $('#list_item_sector').append('<tr id="del_se' + data + '"><td id="sl_name-' + data + '"> <strong>' + name + '</strong></td><td class="text-center"><a href="' + url_d + '" Onclick="shdata(\'' + data + '\');" style="font-size:20px;"><i class="ti-wallet"></i></a></td><td class="text-right"><button type="button" class="btn btn-outline-primary waves-effect waves-light" Onclick="edit_se(\'' + data + '\')"> <i class="ti-pencil-alt"></i> ແກ້ໄຂ</button> <button type="button" class="btn btn-outline-danger waves-effect waves-light" Onclick="del_se(\'' + data + '\')"> <i class="ti-trash"></i> ລຶບ</button></td></tr>');

                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ad_save_sector() } }
                        });
                    }
                }
                break;
            case 'update':
                var id = $('#bt-save').attr('id_data');
                var name = $('#add-name').val();
                var village = $('#add-village').val();
                var city = $('#add-city').val();
                var province = $('#add-province').val();
                var tel = $('#add-tel').val();
                var type = $('#add-type').val();
                var bt_data = $('#bt-save').attr('bt_data');

                if (name != '' && village != '' && city != '' && province != '' && tel != '' && type != '') {
                    $('#add-sector').hide();
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    ad_update_sector();

                    function ad_update_sector() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/update',
                            type: "POST",
                            data: { post_type: 'update_sector', id: id, name: name, village: village, city: city, province: province, tel: tel, type: type },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-save').attr('bt_data', 'add');
                                $('#bt-save').attr('id_data', '');
                                $('#bt-save').hide();
                                $('#bt-cancel').hide();
                                $('#bt-add').show();
                                $('#list_sector').slideDown("slow");
                                $('#sl_name-' + id).html("<strong>" + name + "</strong>");
                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ad_update_sector() } }
                        });
                    }
                }

                break;

        }




    });



} //// end function Ad-se

function shdata(id) {
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');


    ad_sh_sector();

    function ad_sh_sector() {
        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_sector_one', id: id },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                $('#list_sector').hide();
                $('#view-sector').show();
                var db_data = $.parseJSON(data);
                var type = '';
                $.each(db_data, function(index, value) {
                    $('#bt-save').hide();
                    $('#bt-cancel').hide();
                    $('#bt-add').hide();
                    $('#bt-back').show();
                    $('#v-name').html(value.name);
                    $('#v-village').html(value.village);
                    $('#v-city').html(value.city);
                    $('#v-province').html(value.province);
                    $('#v-tel').html(value.tel);
                    switch (value.sector_type) {
                        case 'ho':
                            type = 'ສຳນັກງານໃຫຍ່';
                            break;
                        case 'se':
                            type = 'ຂະແໜງການ';
                            break;
                        case 'bc':
                            type = 'ສາຂາ';
                            break;
                        case 'ou':
                            type = 'ພາຍນອກ';
                            break;
                    }
                    $('#v-type').html(type);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ad_sh_sector() } }
        });
    }

    $('#bt-back').click(function(e) {
        e.preventDefault();
        $('#list_sector').show();
        $('#view-sector').hide();
        $('#bt-add').show();
        $('#bt-back').hide();

    });

}

function edit_se(id) {
    $('#bt-add').hide();
    $('#bt-save').show();
    $('#bt-cancel').show()
    $('#bt-save').attr("disabled", false);
    $('#bt-cancel').attr("disabled", false);
    $('#bt-save').attr('bt_data', 'update');
    $('#bt-save').attr('id_data', id);
    $('#list_sector').hide();
    $('#add-sector').show();


    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

    ad_edit_se_sector();

    function ad_edit_se_sector() {
        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_sector_one', id: id },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                var db_data = $.parseJSON(data);
                var type = '';
                $.each(db_data, function(index, value) {

                    $('#add-name').val(value.name);
                    $('#add-village').val(value.village);
                    $('#add-city').val(value.city);
                    $('#add-province').val(value.province);
                    $('#add-tel').val(value.tel);
                    $('#add-type').val(value.sector_type);
                });
                var intrvl = setInterval(function() {
                    $('#add-name:first').focus();
                    clearInterval(intrvl);
                }, 800);
            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ad_edit_se_sector() } }
        });
    }

}

function del_se(id) {
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    alertify.confirm("ທ່ານແນ່ໃຈບໍ່ ທີ່ຈະລຶບຂໍ້ມູນນີ້??", function(ev) {
        ev.preventDefault();


        ad_del_sector();

        function ad_del_sector() {
            $.ajax({
                url: url + 'index.php/' + 'mg_data/del',
                type: "POST",
                data: { post_type: 'del_sector', id: id },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                    var intrvl = setInterval(function() {
                        $('#del_se' + id).remove();
                        clearInterval(intrvl);
                    }, 800);
                    alertify.alert("ຂໍ້ມູນໄດ້ຖຶກລຶບ ອອກຈາກຖານຂໍ້ມູນແລ້ວ!");
                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ad_del_sector() } }
            });
        }

    }, function(ev) {
        ev.preventDefault();
        $('.loading').fadeOut(2000);
        alertify.alert("ທ່ານໄດ້ຍົກເລີກ ການລຶບຂໍ້ມູນແລ້ວ!");
    });
}

//// end ad_se page -----------------------

/// Ad-doc page ---------------------------
function ad_doc(used_data) {
    // document.getElementById("main_center").innerHTML = "Ad-doc";
    var title = '<div class="header-top"><span class="pull-left"><h4 class="mt-0 m-b-15 header-title"> <h5><i class="ti-folder"></i> ຈັດເກັບ ເອກະສານ </h5></h4></span><span class="pull-right text-right"><div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;" id="processing"></div></span><div class="clearfix"></div></div>';
    var body = ' <div class="row"> <div class="col-sm-6 col-md-6 col-lg-6"><strong>  <h5><i class="ti-loop"></i> ພາກສ່ວນ ພາຍໃນ</h5> </strong> <div class="input-group"><span class="input-group-addon">ຂະແໜງການ / ສາຂາ</span><select class="form-control" id="sector_inside"></select></div> <p> <ul class="nav nav-tabs" role="tablist"> <li class="nav-item"> <a class="nav-link active" href="#folder-in-inside" role="tab" data-toggle="tab"> <i class="ti-angle-double-right"></i> ຂາເຂົ້າ</a> </li> <li class="nav-item"> <a class="nav-link" href="#folder-out-inside" role="tab" data-toggle="tab"> <i class="ti-angle-double-left"></i> ຂາອອກ</a> </li> </ul> </p><input type="hidden" value="docin" id="sector-data-inside"> <div class="tab-content"> <div role="tabpanel" class="tab-pane active" id="folder-in-inside"> <p class="pull-right"> <button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-add-folder-in-inside"><i class="ti-plus"></i> ເພີ່ມໃໝ່ </button> <button type="button" style="display:none;" class="btn btn-outline-danger waves-effect waves-light" id="bt-cancel-folder-in-inside"> <i class="ti-close"></i> ຍົກເລີກ</button> <div class="input-group" id="form-in-inside" style="display:none;"><input type="text" id="name-folder-in-inside" data="add" data_id="" class="form-control" placeholder="ປ້ອນຊື່ຕູ້ເກັບ ເອກະສານ ...."><span class="input-group-btn"> <button class="btn btn-default" type="button" id="bt-save-folder-in-inside"> <i class="ti-save"></i> ບັນທຶກ </button></span></div> </p> <div class="clearfix"></div> <ul class="list-group" id="list-folder-docin-inside"></ul> </div> <div role="tabpanel" class="tab-pane " id="folder-out-inside"> <p class="pull-right"><button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-add-folder-out-inside"><i class="ti-plus"></i> ເພີ່ມໃໝ່ </button> <button type="button" class="btn btn-outline-danger waves-effect waves-light" style="display:none;" id="bt-cancel-folder-out-inside"> <i class="ti-close"></i> ຍົກເລີກ</button> <div class="input-group" id="form-out-inside" style="display:none;"> <input type="text" class="form-control" id="name-folder-out-inside" data="add" data_id="" placeholder="ປ້ອນຊື່ຕູ້ເກັບ ເອກະສານ ...."><span class="input-group-btn"> <button class="btn btn-default" type="button" id="bt-save-folder-out-inside"> <i class="ti-save"></i> ບັນທຶກ </button></span></div> </p> <div class="clearfix"></div> <ul class="list-group" id="list-folder-docout-inside"></ul> </div> </div> </div> <div class="col-sm-6 col-md-6 col-lg-6"><strong>  <h5><i class="ti-new-window"></i> ພາກສ່ວນ ພາຍນອກ</h5> </strong> <div class="input-group"><span class="input-group-addon">ຂະແໜງການ ພາຍນອກ</span><select class="form-control" id="sector_outside"></select></div> <p> <ul class="nav nav-tabs" role="tablist"> <li class="nav-item"> <a class="nav-link active" href="#folder-in-outside" role="tab" data-toggle="tab"> <i class="ti-angle-double-right"></i> ຂາເຂົ້າ</a> </li> <li class="nav-item"> <a class="nav-link" href="#folder-out-outside" role="tab" data-toggle="tab"> <i class="ti-angle-double-left"></i> ຂາອອກ</a> </li> </ul> </p><input type="hidden" value="docin" id="sector-data-outside"> <div class="tab-content"> <div role="tabpanel" class="tab-pane active" id="folder-in-outside"> <p class="pull-right"> <button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-add-folder-in-outside"><i class="ti-plus"></i> ເພີ່ມໃໝ່ </button> <button type="button" style="display:none;" class="btn btn-outline-danger waves-effect waves-light" id="bt-cancel-folder-in-outside"> <i class="ti-close"></i> ຍົກເລີກ</button> <div class="input-group" id="form-in-outside" style="display:none;"><input type="text" id="name-folder-in-outside" data="add" data_id="" class="form-control" placeholder="ປ້ອນຊື່ຕູ້ເກັບ ເອກະສານ ...."><span class="input-group-btn"> <button class="btn btn-default" type="button" id="bt-save-folder-in-outside"> <i class="ti-save"></i> ບັນທຶກ </button></span></div> </p> <div class="clearfix"></div> <ul class="list-group" id="list-folder-docin-outside"></ul> </div> <div role="tabpanel" class="tab-pane " id="folder-out-outside"> <p class="pull-right"><button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-add-folder-out-outside"><i class="ti-plus"></i> ເພີ່ມໃໝ່ </button> <button type="button" class="btn btn-outline-danger waves-effect waves-light" style="display:none;" id="bt-cancel-folder-out-outside"> <i class="ti-close"></i> ຍົກເລີກ</button> <div class="input-group" id="form-out-outside" style="display:none;"> <input type="text" class="form-control" id="name-folder-out-outside" data="add" data_id="" placeholder="ປ້ອນຊື່ຕູ້ເກັບ ເອກະສານ ...."><span class="input-group-btn"> <button class="btn btn-default" type="button" id="bt-save-folder-out-outside"> <i class="ti-save"></i> ບັນທຶກ </button></span></div> </p> <div class="clearfix"></div> <ul class="list-group" id="list-folder-docout-outside"></ul> </div> </div> </div> </div>';
    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = body;



    /// get data ------------ inside -------------------------------------
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');


    ad_get_doc();

    function ad_get_doc() {
        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_sector' },
            timeout: 6000,
            success: function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                var db_data = $.parseJSON(data);
                $.each(db_data, function(index, value) {

                    if (used_data.user_type == 'admin' || used_data.user_type == 'ceo') {
                        if (value.sector_type != 'ou') {
                            $('#sector_inside').append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                        } else {
                            $('#sector_outside').append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                        }

                    } else if (used_data.user_type == 'user') {
                        if (used_data.user_sector == value.id) {
                            if (value.sector_type != 'ou') {
                                $('#sector_inside').append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                            } else {
                                $('#sector_outside').append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                            }
                        }
                    }

                });
                // console.log(used_data.user_sector);
                getlist_inside();
                getlist_outside();

            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ad_get_doc() } }
        });
    }


    // ------ select sector -----------------
    $('#sector_inside').change(function(e) {
        e.preventDefault();
        getlist_inside();
    });

    $('#sector_outside').change(function(e) {
        e.preventDefault();
        getlist_outside();
    });


    function getlist_inside() {
        var dat = $('#sector_inside').val();

        $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

        ad_getlist_inside();

        function ad_getlist_inside() {
            $.ajax({
                url: url + 'index.php/' + 'mg_data/get_data',
                type: "POST",
                data: { get_db: 'db_grono_doc' },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                    var db_data = $.parseJSON(data);
                    $('#list-folder-docin-inside').html('');
                    $('#list-folder-docout-inside').html('');
                    $.each(db_data, function(index, value) {
                        if (value.sector_id == dat) {
                            switch (value.grono_type) {
                                case 'in':
                                    $('#list-folder-docin-inside').append('<li class="list-group-item" id="ldocin-inside' + value.id + '"> <i class="ti-folder"></i> <span id="name-din-inside' + value.id + '">' + value.name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docin_inside(\'' + value.id + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docin_inside(\'' + value.id + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');
                                    break;
                                case 'out':
                                    $('#list-folder-docout-inside').append('<li class="list-group-item" id="ldocout-inside' + value.id + '"> <i class="ti-folder"></i> <span id="name-dout-inside' + value.id + '">' + value.name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docout_inside(\'' + value.id + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docout_inside(\'' + value.id + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');
                                    break;
                            }
                        }
                    });

                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ad_getlist_inside() } }
            });
        }
    }



    //// editor docin inside ------------------------------------------------------
    $('#bt-add-folder-in-inside').click(function(e) {
        e.preventDefault();
        $('#bt-cancel-folder-in-inside').attr("disabled", false);
        $('#bt-save-folder-in-inside').attr("disabled", true);
        $('#name-folder-in-inside').attr("disabled", false);
        $('#bt-add-folder-in-inside').hide();
        $('#bt-cancel-folder-in-inside').show();
        $('#form-in-inside').show();
        $('#name-folder-in-inside').val('');
        var intrvl = setInterval(function() {
            $('#name-folder-in-inside:first').focus();
            clearInterval(intrvl);
        }, 800);

    });

    $('#name-folder-in-inside').keyup(function(e) {
        if ($(this).val() != '') {
            $('#bt-save-folder-in-inside').attr("disabled", false);
        }
    });

    $('#bt-save-folder-in-inside').click(function(e) {
        e.preventDefault();
        var name = $('#name-folder-in-inside').val();
        var sector_id = $('#sector_inside').val();
        var data = $('#name-folder-in-inside').attr("data");
        var id = $('#name-folder-in-inside').attr("data_id");
        $('#bt-save-folder-in-inside').attr("disabled", true);
        $('#bt-cancel-folder-in-inside').attr("disabled", true);
        $('#name-folder-in-inside').attr("disabled", true);
        if (name != '') {

            switch (data) {
                case 'add':
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    add_docin_inside();

                    function add_docin_inside() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/add',
                            type: "POST",
                            data: { post_type: 'add_grono_doc', name: name, grono_type: 'in', sector_id: sector_id },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-add-folder-in-inside').show();
                                $('#bt-cancel-folder-in-inside').hide();
                                $('#form-in-inside').hide();
                                $('#list-folder-docin-inside').prepend('<li class="list-group-item" id="ldocin-inside' + data + '"> <i class="ti-folder"></i> <span id="name-din-inside' + data + '">' + name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docin_inside(\'' + data + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docin_inside(\'' + data + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');
                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { add_docin_inside() } }
                        });
                    }
                    break;
                case 'update':
                    $('#name-folder-in-inside').attr("data", "add");
                    $('#name-folder-in-inside').attr("data_id", "");
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    up_docin_inside();

                    function up_docin_inside() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/update',
                            type: "POST",
                            data: { post_type: 'update_grono_doc', name: name, id: id },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-add-folder-in-inside').show();
                                $('#bt-cancel-folder-in-inside').hide();
                                $('#form-in-inside').hide();
                                $('#name-din-inside' + id).html(name);
                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { up_docin_inside() } }
                        });
                    }
                    break;
            }
        }
    });

    $('#bt-cancel-folder-in-inside').click(function(e) {
        e.preventDefault();
        $('#name-folder-in-inside').val('');
        $('#bt-add-folder-in-inside').show();
        $('#bt-cancel-folder-in-inside').hide();
        $('#form-in-inside').hide();
    });

    $('#name-folder-in-inside').keyup(function(event) { // check key enter
        if (event.keyCode == 13) {
            $('#bt-save-folder-in-inside').click();
        }
    });


    //// editor docout ------------------------------------------------------
    $('#bt-add-folder-out-inside').click(function(e) {
        e.preventDefault();
        $('#bt-save-folder-out-inside').attr("disabled", true);
        $('#bt-cancel-folder-out-inside').attr("disabled", false);
        $('#name-folder-out-inside').attr("disabled", false);

        $('#bt-add-folder-out-inside').hide();
        $('#bt-cancel-folder-out-inside').show();
        $('#form-out-inside').show();
        $('#name-folder-out-inside').val('');
        var intrvl = setInterval(function() {
            $('#name-folder-out-inside:first').focus();
            clearInterval(intrvl);
        }, 800);

    });

    $('#name-folder-out-inside').keyup(function(e) {
        if ($(this).val() != '') {
            $('#bt-save-folder-out-inside').attr("disabled", false);
        }
    });

    $('#bt-save-folder-out-inside').click(function(e) {
        e.preventDefault();
        var name = $('#name-folder-out-inside').val();
        var sector_id = $('#sector_inside').val();
        var data = $('#name-folder-out-inside').attr("data");
        var id = $('#name-folder-out-inside').attr("data_id");
        $('#bt-save-folder-out-inside').attr("disabled", true);
        $('#bt-cancel-folder-out-inside').attr("disabled", true);
        $('#name-folder-out-inside').attr("disabled", true);

        if (name != '') {

            switch (data) {
                case 'add':
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    add_docout_inside();

                    function add_docout_inside() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/add',
                            type: "POST",
                            data: { post_type: 'add_grono_doc', name: name, grono_type: 'out', sector_id: sector_id },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-add-folder-out-inside').show();
                                $('#bt-cancel-folder-out-inside').hide();
                                $('#form-out-inside').hide();
                                $('#list-folder-docout-inside').prepend('<li class="list-group-item" id="ldocout-inside' + data + '"> <i class="ti-folder"></i> <span id="name-dout-inside' + data + '">' + name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docout_inside(\'' + data + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docout_inside(\'' + data + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');

                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { add_docout_inside() } }
                        });
                    }
                    break;
                case 'update':
                    $('#name-folder-out-inside').attr("data", "add");
                    $('#name-folder-out-inside').attr("data_id", "");
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    up_docout_inside();

                    function up_docout_inside() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/update',
                            type: "POST",
                            data: { post_type: 'update_grono_doc', name: name, id: id },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-add-folder-out-inside').show();
                                $('#bt-cancel-folder-out-inside').hide();
                                $('#form-out-inside').hide();
                                //$('#list-folder-docout-inside').prepend('<li class="list-group-item" id="ldocout-inside' + data + '"> <i class="ti-folder"></i> <span id="name-dout-inside' + data + '">' + name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docout_inside(\'' + data + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docout_inside(\'' + data + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');
                                $('#name-dout-inside' + id).html(name);
                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ip_docout_inside() } }
                        });
                    }
                    break;
            }
        }
    });

    $('#bt-cancel-folder-out-inside').click(function(e) {
        e.preventDefault();
        $('#name-folder-out-inside').val('');
        $('#bt-add-folder-out-inside').show();
        $('#bt-cancel-folder-out-inside').hide();
        $('#form-out-inside').hide();
    });

    $('#name-folder-out-inside').keyup(function(event) { // check key enter
        if (event.keyCode == 13) {
            $('#bt-save-folder-out-inside').click();
        }
    });


    /// get data ------------ outside -------------------------------------

    function getlist_outside() {
        var dat = $('#sector_outside').val();
        //alert(dat);
        $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

        ad_getlist_outside();

        function ad_getlist_outside() {
            $.ajax({
                url: url + 'index.php/' + 'mg_data/get_data',
                type: "POST",
                data: { get_db: 'db_grono_doc' },
                timeout: 6000,
                success: function(data) {
                    $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                    $('.loading').fadeOut(2000);
                    var db_data = $.parseJSON(data);
                    $('#list-folder-docin-outside').html('');
                    $('#list-folder-docout-outside').html('');
                    $.each(db_data, function(index, value) {
                        if (value.sector_id == dat) {
                            switch (value.grono_type) {
                                case 'in':
                                    $('#list-folder-docin-outside').append('<li class="list-group-item" id="ldocin-outside' + value.id + '"> <i class="ti-folder"></i> <span id="name-din-outside' + value.id + '">' + value.name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docin_outside(\'' + value.id + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docin_outside(\'' + value.id + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');
                                    break;
                                case 'out':
                                    $('#list-folder-docout-outside').append('<li class="list-group-item" id="ldocout-outside' + value.id + '"> <i class="ti-folder"></i> <span id="name-dout-outside' + value.id + '">' + value.name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docout_outside(\'' + value.id + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docout_outside(\'' + value.id + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');
                                    break;
                            }
                        }
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { ad_getlist_outside() } }
            });
        }
    }



    //// editor docin outside ------------------------------------------------------
    $('#bt-add-folder-in-outside').click(function(e) {
        e.preventDefault();
        $('#bt-save-folder-in-outside').attr("disabled", true);
        $('#bt-cancel-folder-in-outside').attr("disabled", false);
        $('#name-folder-in-outside').attr("disabled", false);

        $('#bt-add-folder-in-outside').hide();
        $('#bt-cancel-folder-in-outside').show();
        $('#form-in-outside').show();
        $('#name-folder-in-outside').val('');
        var intrvl = setInterval(function() {
            $('#name-folder-in-outside:first').focus();
            clearInterval(intrvl);
        }, 800);

    });

    $('#name-folder-in-outside').keyup(function(e) {
        if ($(this).val() != '') {
            $('#bt-save-folder-in-outside').attr("disabled", false);
        }
    });

    $('#bt-save-folder-in-outside').click(function(e) {
        e.preventDefault();
        var name = $('#name-folder-in-outside').val();
        var sector_id = $('#sector_outside').val();
        var data = $('#name-folder-in-outside').attr("data");
        var id = $('#name-folder-in-outside').attr("data_id");
        $('#bt-save-folder-in-outside').attr("disabled", true);
        $('#bt-cancel-folder-in-outside').attr("disabled", true);
        $('#name-folder-in-outside').attr("disabled", true);
        if (name != '') {

            switch (data) {
                case 'add':
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    add_docin_outside();

                    function add_docin_outside() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/add',
                            type: "POST",
                            data: { post_type: 'add_grono_doc', name: name, grono_type: 'in', sector_id: sector_id },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-add-folder-in-outside').show();
                                $('#bt-cancel-folder-in-outside').hide();
                                $('#form-in-outside').hide();
                                $('#list-folder-docin-outside').prepend('<li class="list-group-item" id="ldocin-outside' + data + '"> <i class="ti-folder"></i> <span id="name-din-outside' + data + '">' + name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docin_outside(\'' + data + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docin_outside(\'' + data + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');
                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { add_docin_outside() } }
                        });
                    }
                    break;
                case 'update':
                    $('#name-folder-in-outside').attr("data", "add");
                    $('#name-folder-in-outside').attr("data_id", "");
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    up_docin_outside();

                    function up_docin_outside() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/update',
                            type: "POST",
                            data: { post_type: 'update_grono_doc', name: name, id: id },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-add-folder-in-outside').show();
                                $('#bt-cancel-folder-in-outside').hide();
                                $('#form-in-outside').hide();
                                $('#name-din-outside' + id).html(name);
                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { up_docin_outside() } }
                        });
                    }
                    break;
            }
        }
    });

    $('#bt-cancel-folder-in-outside').click(function(e) {
        e.preventDefault();
        $('#name-folder-in-outside').val('');
        $('#bt-add-folder-in-outside').show();
        $('#bt-cancel-folder-in-outside').hide();
        $('#form-in-outside').hide();
    });

    $('#name-folder-in-outside').keyup(function(event) { // check key enter
        if (event.keyCode == 13) {
            $('#bt-save-folder-in-outside').click();
        }
    });


    //// editor docout ------------------------------------------------------
    $('#bt-add-folder-out-outside').click(function(e) {
        e.preventDefault();
        $('#bt-save-folder-out-outside').attr("disabled", true);
        $('#bt-cancel-folder-out-outside').attr("disabled", false);
        $('#name-folder-out-outside').attr("disabled", false);

        $('#bt-add-folder-out-outside').hide();
        $('#bt-cancel-folder-out-outside').show();
        $('#form-out-outside').show();
        $('#name-folder-out-outside').val('');
        var intrvl = setInterval(function() {
            $('#name-folder-out-outside:first').focus();
            clearInterval(intrvl);
        }, 800);

    });

    $('#name-folder-out-outside').keyup(function(e) {
        if ($(this).val() != '') {
            $('#bt-save-folder-out-outside').attr("disabled", false);
        }
    });

    $('#bt-save-folder-out-outside').click(function(e) {
        e.preventDefault();
        var name = $('#name-folder-out-outside').val();
        var sector_id = $('#sector_outside').val();
        var data = $('#name-folder-out-outside').attr("data");
        var id = $('#name-folder-out-outside').attr("data_id");
        $('#bt-save-folder-out-outside').attr("disabled", true);
        $('#bt-cancel-folder-out-outside').attr("disabled", true);
        $('#name-folder-out-outside').attr("disabled", true);
        if (name != '') {
            ///alert(sector_id);
            switch (data) {
                case 'add':
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    add_docout_outside();

                    function add_docout_outside() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/add',
                            type: "POST",
                            data: { post_type: 'add_grono_doc', name: name, grono_type: 'out', sector_id: sector_id },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-add-folder-out-outside').show();
                                $('#bt-cancel-folder-out-outside').hide();
                                $('#form-out-outside').hide();
                                $('#list-folder-docout-outside').prepend('<li class="list-group-item" id="ldocout-outside' + data + '"> <i class="ti-folder"></i> <span id="name-dout-outside' + data + '">' + name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docout_outside(\'' + data + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docout_outside(\'' + data + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');

                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { add_docout_outside() } }
                        });
                    }
                    break;
                case 'update':
                    $('#name-folder-out-outside').attr("data", "add");
                    $('#name-folder-out-outside').attr("data_id", "");
                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');

                    up_docout_outside();

                    function up_docout_outside() {
                        $.ajax({
                            url: url + 'index.php/' + 'mg_data/update',
                            type: "POST",
                            data: { post_type: 'update_grono_doc', name: name, id: id },
                            timeout: 6000,
                            success: function(data) {
                                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                $('.loading').fadeOut(2000);
                                $('#bt-add-folder-out-outside').show();
                                $('#bt-cancel-folder-out-outside').hide();
                                $('#form-out-outside').hide();
                                $('#list-folder-docout-outside').prepend('<li class="list-group-item" id="ldocout-outside' + data + '"> <i class="ti-folder"></i> <span id="name-dout-outside' + data + '">' + name + '</span> <span class="pull-right"> <button type="button" onclick="edit_docout_outside(\'' + data + '\')" class="btn btn-outline-primary waves-effect"><i class="ti-pencil-alt"></i></button> <button type="button" onclick="del_docout_outside(\'' + data + '\')" class="btn btn-outline-danger waves-effect"><i class="ti-trash"></i></button>  </span></li>');

                            },
                            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { up_docout_outside() } }
                        });
                    }
                    break;
            }
        }
    });

    $('#bt-cancel-folder-out-outside').click(function(e) {
        e.preventDefault();
        $('#name-folder-out-outside').val('');
        $('#bt-add-folder-out-outside').show();
        $('#bt-cancel-folder-out-outside').hide();
        $('#form-out-outside').hide();
    });

    $('#name-folder-out-outside').keyup(function(event) { // check key enter
        if (event.keyCode == 13) {
            $('#bt-save-folder-out-outside').click();
        }
    });





}

//// function docin inside   ///////
/// edit docin insid
function edit_docin_inside(id) {
    $('#bt-cancel-folder-in-inside').attr("disabled", false);
    $('#bt-save-folder-in-inside').attr("disabled", true);
    $('#name-folder-in-inside').attr("disabled", false);
    $('#bt-add-folder-in-inside').hide();
    $('#bt-cancel-folder-in-inside').show();
    $('#form-in-inside').show();
    $('#name-folder-in-inside').attr("data", "update"); // set update
    $('#name-folder-in-inside').attr("data_id", id); // set update
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    $.post(url + 'index.php/' + 'mg_data/get_data', { get_db: 'db_grono_doc_one', id: id }, function(data) {
        $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
        $('.loading').fadeOut(2000);
        var db_data = $.parseJSON(data);
        $.each(db_data, function(index, value) {
            $('#name-folder-in-inside').val(value.name);
        });
    });

    var intrvl = setInterval(function() {
        $('#name-folder-in-inside:first').focus();
        clearInterval(intrvl);
    }, 800);

}

function del_docin_inside(id) {
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    alertify.confirm("ທ່ານແນ່ໃຈບໍ່ ທີ່ຈະລຶບຂໍ້ມູນນີ້??", function(ev) {
        ev.preventDefault();
        $.post(url + 'index.php/' + 'mg_data/del', { post_type: 'del_grono_doc', id: id }, function(data) {
            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
            $('.loading').fadeOut(2000);


            var intrvl = setInterval(function() {
                $('#ldocin-inside' + id).remove();
                clearInterval(intrvl);
            }, 800);

            alertify.alert("ຂໍ້ມູນໄດ້ຖຶກລຶບ ອອກຈາກຖານຂໍ້ມູນແລ້ວ!");
        });

    }, function(ev) {
        ev.preventDefault();
        $('.loading').fadeOut(2000);
        alertify.alert("ທ່ານໄດ້ຍົກເລີກ ການລຶບຂໍ້ມູນແລ້ວ!");
    });
}

/// edit docout insid
function edit_docout_inside(id) {
    $('#bt-cancel-folder-out-inside').attr("disabled", false);
    $('#bt-save-folder-out-inside').attr("disabled", true);
    $('#name-folder-out-inside').attr("disabled", false);
    $('#bt-add-folder-out-inside').hide();
    $('#bt-cancel-folder-out-inside').show();
    $('#form-out-inside').show();
    $('#name-folder-out-inside').attr("data", "update"); // set update
    $('#name-folder-out-inside').attr("data_id", id); // set update
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    $.post(url + 'index.php/' + 'mg_data/get_data', { get_db: 'db_grono_doc_one', id: id }, function(data) {
        $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
        $('.loading').fadeOut(2000);
        var db_data = $.parseJSON(data);
        $.each(db_data, function(index, value) {
            $('#name-folder-out-inside').val(value.name);
        });
    });
    var intrvl = setInterval(function() {
        $('#name-folder-out-inside:first').focus();
        clearInterval(intrvl);
    }, 800);

}

function del_docout_inside(id) {
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    alertify.confirm("ທ່ານແນ່ໃຈບໍ່ ທີ່ຈະລຶບຂໍ້ມູນນີ້??", function(ev) {
        ev.preventDefault();
        $.post(url + 'index.php/' + 'mg_data/del', { post_type: 'del_grono_doc', id: id }, function(data) {
            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
            $('.loading').fadeOut(2000);


            var intrvl = setInterval(function() {
                $('#ldocout-inside' + id).remove();
                clearInterval(intrvl);
            }, 800);

            alertify.alert("ຂໍ້ມູນໄດ້ຖຶກລຶບ ອອກຈາກຖານຂໍ້ມູນແລ້ວ!");
        });

    }, function(ev) {
        ev.preventDefault();
        $('.loading').fadeOut(2000);
        alertify.alert("ທ່ານໄດ້ຍົກເລີກ ການລຶບຂໍ້ມູນແລ້ວ!");
    });
}


//// function docin outside   ///////
/// edit docin insid
function edit_docin_outside(id) {
    $('#bt-cancel-folder-in-outside').attr("disabled", false);
    $('#bt-save-folder-in-outside').attr("disabled", true);
    $('#name-folder-in-outside').attr("disabled", false);
    $('#bt-add-folder-in-outside').hide();
    $('#bt-cancel-folder-in-outside').show();
    $('#form-in-outside').show();
    $('#name-folder-in-outside').attr("data", "update"); // set update
    $('#name-folder-in-outside').attr("data_id", id); // set update
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    $.post(url + 'index.php/' + 'mg_data/get_data', { get_db: 'db_grono_doc_one', id: id }, function(data) {
        $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
        $('.loading').fadeOut(2000);
        var db_data = $.parseJSON(data);
        $.each(db_data, function(index, value) {
            $('#name-folder-in-outside').val(value.name);
        });
    });
    var intrvl = setInterval(function() {
        $('#name-folder-in-outside:first').focus();
        clearInterval(intrvl);
    }, 800);

}

function del_docin_outside(id) {
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    alertify.confirm("ທ່ານແນ່ໃຈບໍ່ ທີ່ຈະລຶບຂໍ້ມູນນີ້??", function(ev) {
        ev.preventDefault();
        $.post(url + 'index.php/' + 'mg_data/del', { post_type: 'del_grono_doc', id: id }, function(data) {
            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
            $('.loading').fadeOut(2000);


            var intrvl = setInterval(function() {
                $('#ldocin-outside' + id).remove();
                clearInterval(intrvl);
            }, 800);

            alertify.alert("ຂໍ້ມູນໄດ້ຖຶກລຶບ ອອກຈາກຖານຂໍ້ມູນແລ້ວ!");
        });

    }, function(ev) {
        ev.preventDefault();
        $('.loading').fadeOut(2000);
        alertify.alert("ທ່ານໄດ້ຍົກເລີກ ການລຶບຂໍ້ມູນແລ້ວ!");
    });
}

/// edit docout insid
function edit_docout_outside(id) {
    $('#bt-cancel-folder-out-outside').attr("disabled", false);
    $('#bt-save-folder-out-outside').attr("disabled", true);
    $('#name-folder-out-outside').attr("disabled", false);
    $('#bt-add-folder-out-outside').hide();
    $('#bt-cancel-folder-out-outside').show();
    $('#form-out-outside').show();
    $('#name-folder-out-outside').attr("data", "update"); // set update
    $('#name-folder-out-outside').attr("data_id", id); // set update
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    $.post(url + 'index.php/' + 'mg_data/get_data', { get_db: 'db_grono_doc_one', id: id }, function(data) {
        $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
        $('.loading').fadeOut(2000);
        var db_data = $.parseJSON(data);
        $.each(db_data, function(index, value) {
            $('#name-folder-out-outside').val(value.name);
        });
    });
    var intrvl = setInterval(function() {
        $('#name-folder-out-outside:first').focus();
        clearInterval(intrvl);
    }, 800);

}

function del_docout_outside(id) {
    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    alertify.confirm("ທ່ານແນ່ໃຈບໍ່ ທີ່ຈະລຶບຂໍ້ມູນນີ້??", function(ev) {
        ev.preventDefault();
        $.post(url + 'index.php/' + 'mg_data/del', { post_type: 'del_grono_doc', id: id }, function(data) {
            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
            $('.loading').fadeOut(2000);

            var intrvl = setInterval(function() {
                $('#ldocout-outside' + id).remove();
                clearInterval(intrvl);
            }, 800);

            alertify.alert("ຂໍ້ມູນໄດ້ຖຶກລຶບ ອອກຈາກຖານຂໍ້ມູນແລ້ວ!");
        });

    }, function(ev) {
        ev.preventDefault();
        $('.loading').fadeOut(2000);
        alertify.alert("ທ່ານໄດ້ຍົກເລີກ ການລຶບຂໍ້ມູນແລ້ວ!");
    });
}





//// end ad_doc page -----------------------

/// Ad-user page ---------------------------
function ad_user(used_data) {
    //  document.getElementById("main_center").innerHTML = "Ad-User";
    var title = '<div class="header-top"><span class="pull-left"><h4 class="mt-0 m-b-15 header-title"> <h5> <i class="ti-user"></i> ຈັດການ ຜູ້ໃຊ້ </h5></h4></span><span class="pull-right text-right"> <button type="button" class="btn btn-outline-primary waves-effect waves-light" id="bt-add-user"> <i class="ti-plus"></i> ເພີ່ມຜູ້ໃຊ້ໃໝ່</button> <button type="button" class="btn btn-outline-primary waves-effect waves-light" style="display:none;" id="bt-save-user"> <i class="ti-save"></i> ບັນທຶກ</button> <button type="button" class="btn btn-outline-danger waves-effect waves-light" style="display:none;" id="bt-cancel-user"> <i class="ti-close"></i> ລ້າງຂໍ້ມູນ</button><div class="pull-right" style="margin-top: -5px; width: 48px; height: 48px; text-align: center;" id="processing"></div></span><div class="clearfix"></div></div>';
    var body = ' <div id="form-list-user"> <div class="col-sm-4 col-md-4 col-lg-4 pull-left"> <p> <div class="input-group"><span class="input-group-addon">ສັງກັດຢູ່:</span><select class="form-control" id="sector-user-add"> </select></div> </p> </div> <div class="col-sm-6 col-md-6 col-lg-6 pull-right"> <p> <nav aria-label="Page navigation"> <ul class="pagination justify-content-end" id="user-pagination"> </ul> </nav> </p> </div> <div class="clearfix"></div> <div class="table-responsive"> <table class="table table-hover mb-0"> <thead> <tr> <th>ຊື່ຜູ້ໃຊ້ ໃນລະບົບ</th> <th class="text-center" width="120">ສິດຜູ້ໃຊ້</th> <th class="text-center" width="180">ຈັດການ ຂໍ້ມູນ</th> </tr> </thead> <tbody id="form-list-all-user"> </tbody> </table> </div> </div> <div class="row" style="display:none;" id="form-add-user"> <div class="col-sm-6 col-md-6 col-lg-6"><strong>  <h5><i class="ti-credit-card"></i> ຂໍ້ມູນຜູ້ໃຊ້</h5> </strong> <div class="progress"> <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" id="process-bar" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div> </div> <p> <div class="input-group"><span class="input-group-addon">ຊື່ ນາມສະກຸນ:</span><input type="text" class="form-control" id="form-user-add-name" placeholder="ຊື່ ນາມສະກຸນ..."></div><span style="color:red;">ໝາຍເຫດ: ນຳໃຊ້ເວລາ Login ເຂົ້າສູ່ລະບົບ</span></p> <p> <div class="input-group" style="width:230px;"><span class="input-group-addon">ເພດ:</span> <select name="form_user_status" id="form-sex" class="form-control"> <option value="ທ່ານ "> ຊາຍ </option><option value="ທ່ານ ນ. "> ຍິງ </option></select></div> </p> <p> <div class="input-group"><span class="input-group-addon">ລະຫັດຜ່ານ:</span><input type="password" id="form-user-pass1" class="form-control" placeholder="ກຳນົດລະຫັດຜ່ານ..."></div> </p> <p> <div class="input-group"><span class="input-group-addon">ຍືນຍັນ ລະຫັດຜ່ານ:</span><input type="password" id="form-user-pass2" class="form-control" placeholder="ຍືນຍັນ ລະຫັດຜ່ານ..."></div> </p> <p> <div class="input-group" style="width:180px;"><span class="input-group-addon">ສະຖານະ:</span><select name="form_user_status" id="form-user-status" class="form-control"> <option value="active"> ໃຊ້ງານຢູ່ </option><option value="deactive"> ບໍ່ໃຊ້ແລ້ວ </option></select></div> </p> <P id="form-alert-user"> </P> </div> <div class="col-sm-6 col-md-6 col-lg-6"><strong>  <h5><i class="ti-archive"></i> ຂໍ້ມູນໃນລະບົບ</h5> </strong> <p> <div class="input-group"><span class="input-group-addon">ສັງກັດຢູ່:</span><select name="form_user_status" id="form-user-sector-select" class="form-control"> </select></div> </p> <p> <div class="input-group" style="width:230px;"><span class="input-group-addon">ປະເພດ ຜູ້ໃຊ້:</span><select name="form_user_status" id="form-user-type" class="form-control"> <option value="user"> ຜູ້ໃຊ້ທົ່ວໄປ </option><option value="ceo"> ຜູ້ບໍລິຫານ </option></select></div> </p> <P><strong>ສິດເຂົ້າເຖິງຂໍ້ມູນ:</strong></P> <P> <ul id="form-permission-list"> </ul> </P> </div> </div>';
    document.getElementById("panel_title").innerHTML = title;
    document.getElementById("panel_body").innerHTML = body;




    var user = {
        user_data: "",
        permission_data: "",
        renew_data: "",
        sector: "",
        sector_seclect: "",
        permission_db: "",
        user_per: "",
        user_add_type: "",
        id_update: "",
        get_data_update: function() {

        },
        show: function(type, sect) {

            //// renew data ---------------------------------------------------------

            var db_data = JSON.parse(this.user_data);

            // console.log(db_data);
            var renew = [];
            user.renew_data = '';
            $.each(db_data, function(index, value) {
                if (db_data[index] != null) {
                    if (sect == value.sector_id && value.user_type != 'admin') {


                        var user_add = {
                            "id": value.id,
                            "permission": value.permission,
                            "sector_id": value.sector_id,
                            "user_type": value.user_type,
                            "profile": value.profile,
                            "name": value.name,
                            "pass": value.pass,
                            "sex": value.sex,
                            "status": value.status,
                            "date": value.date
                        };

                        renew.push(user_add);
                        var newa = JSON.stringify(renew);
                        user.renew_data = newa;


                    }
                }
            });
            //  console.log(user.renew_data);

        },
        pagi_page: "10",
        paginasion: function(page) {
            //if (this.renew_data != "") 

            if (this.renew_data != '') {
                ///console.log(this.renew_data);
                if (page == null) { page = 1; }
                var new_data = JSON.parse(this.renew_data);
                var permission = JSON.parse(this.permission_data);
                var stop = page * this.pagi_page;
                var start = stop - this.pagi_page;
                var page_per = Math.ceil(new_data.length / this.pagi_page);
                var act = '';
                $('#form-list-all-user').html('');
                //var n_data = [];



                //console.log(new_data);
                for (var i = 0; i < new_data.length; i++) {
                    //console.log(i);
                    if (i >= start) {

                        if (i < stop) {
                            //   n_data += ;
                            //console.log(new_data[i].name);
                            var uper = new_data[i].permission.split('|');
                            var nuper = [];

                            for (o = 0; o < uper.length; o++) {
                                if (uper[o] != '') {
                                    for (a = 0; a < permission.length; a++) {

                                        if (uper[o] == permission[a].type) {
                                            nuper += "<li>" + permission[a].description + "</li>";

                                        }
                                    }
                                }
                            }


                            //  console.log(nuper);


                            if (new_data[i].status == 'active') { act = '<span class="badge badge-info">Active (ໃຊ້ງານຢູ່)</span>'; } else if (new_data[i].status == 'deactive') { act = '<span class="badge badge-default">Inactive (ບໍ່ໃຊ້ແລ້ວ)</span>'; } else { act = 'No Status'; }
                            $('#form-list-all-user').append('<tr> <td> <strong> ' + new_data[i].sex + ' ' + new_data[i].name + ' </strong> <br>  ສະຖານະ: <span id="status-' + new_data[i].id + '"> ' + act + ' </span> <div style="display:none;" id="sh-user-per' + new_data[i].id + '"> <hr> <P> <strong>ສິດເຂົ້າເຖິງຂໍ້ມູນ:</strong> </P> <P > <ul > ' + nuper + ' </ul> </P></div> </td> <td class="text-center"> <a class="sh-user-per" data="' + new_data[i].id + '" style="font-size:20px;"><i class="ti-shield"></i></a> </td> <td class="text-right"> <button type="button" class="btn btn-outline-primary waves-effect waves-light btn-edit-user" data="' + new_data[i].id + '" > <i class="ti-pencil-alt"></i> ແກ້ໄຂ</button> <button type="button" class="btn btn-outline-danger waves-effect waves-light btn-delete-user" data="' + new_data[i].id + '"> <i class="ti-trash"></i> ລຶບ</button></td> </tr>');

                        }
                    }
                }
                $("#user-pagination").html('');
                for (var j = 1; j < page_per + 1; j++) {
                    if (page == j) {
                        $("#user-pagination").append('<li  class="page-item active go-user-page" data="' + j + '" > <a class="page-link" >' + j + ' </a></li>');
                    } else {
                        $("#user-pagination").append('<li  class="page-item  go-user-page" data="' + j + '" > <a class="page-link" >' + j + ' </a></li>');
                    }
                }

                //// event on load ----------------
                $(".go-user-page").click(function(e) {
                    e.preventDefault();
                    var page = $(this).attr("data");
                    //alert(page);
                    user.paginasion(page)
                });

                $(".sh-user-per").click(function(e) {
                    e.preventDefault();
                    var data = $(this).attr("data");
                    $("#sh-user-per" + data).toggle("slow");

                });

                /// edit ---------

                $(".btn-edit-user").click(function(e) {
                    e.preventDefault();
                    var id = $(this).attr("data");

                    $("#form-list-user").hide();
                    $("#bt-add-user").hide();
                    $("#bt-save-user").show();
                    $("#bt-save-user").attr("disabled", true);
                    $("#bt-cancel-user").show();
                    $("#form-add-user").show();
                    $("#process-bar").attr('style', 'width: 0%;');

                    user.user_add_type = "update";
                    $("#form-user-pass1").val('');
                    $("#form-user-pass2").val('');
                    $("#form-alert-user").html('');

                    $('#form-permission-list').html('');
                    var per = JSON.parse(user.permission_data);
                    $.each(per, function(index, value) {
                        $('#form-permission-list').append('<li><input type="checkbox" id="per_' + value.type + '" > ' + value.description + ' </li> ');
                    });
                    $('#per_rm').click(function(e) {
                        if ($('#per_rm').is(':checked')) {
                            var up = user.user_per;
                            user.user_per = up + "rm|";
                        } else {
                            var up = user.user_per;
                            user.user_per = up.replace("rm|", "");
                        }
                        user.check_form();
                    });
                    $('#per_rs').click(function(e) {
                        if ($('#per_rs').is(':checked')) {
                            var up = user.user_per;
                            user.user_per = up + "rs|";
                        } else {
                            var up = user.user_per;
                            user.user_per = up.replace("rs|", "");
                        }
                        user.check_form();
                    });
                    $('#per_ap').click(function(e) {
                        if ($('#per_ap').is(':checked')) {
                            var up = user.user_per;
                            user.user_per = up + "ap|";
                        } else {
                            var up = user.user_per;
                            user.user_per = up.replace("ap|", "");
                        }
                        user.check_form();
                    });
                    $('#per_ed').click(function(e) {
                        if ($('#per_ed').is(':checked')) {
                            var up = user.user_per;
                            user.user_per = up + "ed|";
                        } else {
                            var up = user.user_per;
                            user.user_per = up.replace("ed|", "");
                        }
                        user.check_form();
                    });
                    $('#per_all').click(function(e) {
                        if ($('#per_all').is(':checked')) {
                            var up = user.user_per;
                            user.user_per = up + "all|";
                        } else {
                            var up = user.user_per;
                            user.user_per = up.replace("all|", "");
                        }
                        user.check_form();
                    });



                    var intrvl = setInterval(function() {
                        $('#form-user-add-name:first').focus();
                        clearInterval(intrvl);
                    }, 800);
                    $('#form-user-sector-select').html('');
                    //  $('#form-user-permisstion').html('');
                    var db_data = $.parseJSON(user.sector);
                    $.each(db_data, function(index, value) {
                        $('#form-user-sector-select').append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                    });
                    $('#form-user-sector-select').val(user.sector_seclect);
                    //  user.user_per = ''; ':not(:checked)'
                    // if ($('#form-user-male').is(':checked')) { $('#form-user-male').is(':checked'); } else if ($('#form-user-female').is(':checked')) { $('#form-user-female').is(':checked') }

                    // var permission = JSON.parse(this.permission_data);
                    var db_data = JSON.parse(user.user_data);
                    $.each(db_data, function(index, value) {
                        if (id == value.id) {



                            $("#form-user-add-name").val(value.name);
                            $("#form-sex").val(value.sex);
                            $("#form-user-status").val(value.status);
                            $("#form-user-type").val(value.user_type);
                            //console.log(value.sex);
                            user.id_update = value.id;
                            user.user_per = value.permission;
                            var uper = value.permission.split('|');


                            for (i = 0; i < uper.length; i++) {
                                if (uper[i] != '') {
                                    if (uper[i] === "rm") { $('#per_rm').attr("checked", true); }
                                    if (uper[i] === "rs") { $('#per_rs').attr("checked", true); }
                                    if (uper[i] === "ap") { $('#per_ap').attr("checked", true); }
                                    if (uper[i] === "ed") { $('#per_ed').attr("checked", true); }
                                    if (uper[i] === "all") { $('#per_all').attr("checked", true); }
                                    // console.log(uper[i]);
                                }
                            }
                        }
                    });
                });



                /// del ---------------
                $(".btn-delete-user").click(function(e) {
                    e.preventDefault();
                    var id = $(this).attr("data");
                    // alert(id);

                    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
                    alertify.confirm("ທ່ານແນ່ໃຈບໍ່ ທີ່ຈະລຶບຂໍ້ມູນນີ້??", function(ev) {
                        ev.preventDefault();
                        $.post(url + 'index.php/' + 'mg_data/del', { post_type: 'del_user', id: id }, function(data) {
                            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                            $('.loading').fadeOut(2000);


                            var db_data = JSON.parse(user.user_data);
                            $.each(db_data, function(index, value) {
                                if (db_data[index] != null) {
                                    if (id == value.id) {

                                        var n_data = JSON.parse(user.user_data);
                                        delete n_data[index];
                                        //u_data.unshift(user_add);
                                        var newa = JSON.stringify(n_data);
                                        user.user_data = newa;
                                        // console.log(user.user_data);

                                    }
                                }
                            });

                            // var sid = $("#sector-user-add").val();
                            // console.log(sid);
                            user.show('all', user.sector_seclect);
                            user.paginasion();
                            $("#form-list-user").slideDown();


                            alertify.alert("ຂໍ້ມູນໄດ້ຖຶກລຶບ ອອກຈາກຖານຂໍ້ມູນແລ້ວ!");
                        });

                    }, function(ev) {
                        ev.preventDefault();
                        $('.loading').fadeOut(2000);
                        alertify.alert("ທ່ານໄດ້ຍົກເລີກ ການລຶບຂໍ້ມູນແລ້ວ!");
                    });



                });
                //--------------
            } else { $('#form-list-all-user').html(''); }
        },
        save: function() {
            $(".app").click(function(e) {
                e.preventDefault();
                alert('Ok');
            });
        },
        update: function() {

        },
        del: function(id) {

        },
        check_form: function() {


            var name = $("#form-user-add-name").val();
            var pass1 = $("#form-user-pass1").val();
            var pass2 = $("#form-user-pass2").val();
            var sex = $("#form-sex").val();
            var status = $("#form-user-status").val();
            var user_sector = $("#form-user-sector-select").val();
            var user_per = this.user_per;
            var user_type = $("#form-user-type").val();
            //if ($('#form-user-male').is(':checked')) { sex = "ທ່ານ "; } else if ($('#form-user-female').is(':checked')) { sex = "ທ່ານ ນ. "; }
            //console.log(user_per);
            // alert(user_sector);
            var a = 0,
                b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 0,
                g = 0;

            if (name != '') { a = 14.4; } else { a = 0; }
            if (sex != '') { b = 14.4; } else { b = 0; }
            if (status != '') { c = 14.4; } else { c = 0; }
            if (user_sector != '') { d = 14.4; } else { d = 0; }
            if (user_per != '') { e = 14.4; } else { e = 0; }

            if (pass1 == '' && pass2 == '' && user.user_add_type == 'update') {
                f = 14.4;
                g = 14.4;
                $("#form-alert-user").html('');
                // alert('Ok');
            } else {

                if (pass1.length > 5) {
                    f = 14.4;
                } else {
                    f = 0;
                    $("#form-alert-user").html('<div class = "alert alert-warning" role = "alert" > <strong> ແຈ້ງເຕືອນຈາກລະບົບ! </strong> ລະຫັດຂອງທ່າານ ຕ້ອງບໍ່ຕ່ຳກ່ວາ 6 ຕົວອັກສອນ.</div >');
                    // $('.msg').html(' ລະຫັດຜ່ານ ຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວອັກສອນ!');
                    // $('.box-alert').slideDown('slow'); 
                }
                if (pass2.length > 5) {
                    if (pass1 == pass2) {
                        g = 14.4;
                        $("#form-alert-user").html('');
                        // $('.box-alert').slideUp('slow');
                    } else {
                        $("#form-alert-user").html('<div class = "alert alert-warning" role = "alert" > <strong> ແຈ້ງເຕືອນຈາກລະບົບ! </strong> ລະຫັດຍືນຍັງຂອງທ່າານ ບໍ່ກົງກັນ.</div >');
                        g = 0;
                        // $('.msg').html(' ລະຫັດຜ່ານ ທ່ານປ້ອນບໍ່ກົງກັນ! ');
                        // $('.box-alert').slideDown('slow');
                    }
                } else {
                    g = 0;
                    $("#form-alert-user").html('<div class = "alert alert-warning" role = "alert" > <strong> ແຈ້ງເຕືອນຈາກລະບົບ! </strong> ລະຫັດຂອງທ່າານ ຕ້ອງບໍ່ຕ່ຳກ່ວາ 6 ຕົວອັກສອນ.</div >');
                    //$('.msg').html(' ລະຫັດຜ່ານ ຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວອັກສອນ!');
                    //$('.box-alert').slideDown('slow');
                }
            }

            var process_percen = a + b + c + d + e + f + g;

            if (process_percen > 99) { $("#bt-save-user").attr("disabled", false); } else { $("#bt-save-user").attr("disabled", true); }
            // console.log(process_percen);
            //  console.log(process_percen);

            $("#process-bar").attr('style', 'width: ' + process_percen + '%;');

        }
    }; //// end object user /////



    $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
    // ----------
    $.post(url + 'index.php/' + 'mg_data/get_data', { get_db: 'db_sector' }, function(data) {
        user.sector = data;

        $('#sector-user-add').html('');
        var db_data = $.parseJSON(user.sector);
        $.each(db_data, function(index, value) {
            if (value.sector_type != 'ou') {
                $('#sector-user-add').append('<option value="' + value.id + '"> ' + value.name + ' </option>');
            }
        });

        /// get permission 
        $.post(url + 'index.php/' + 'mg_data/get_data', { get_db: 'db_permission' }, function(data) {
            user.permission_data = data;
            ///console.log(user.permission_data);

            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
            $.post(url + 'index.php/' + 'mg_data/get_data', { get_db: 'db_user' }, function(data) {
                $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                $('.loading').fadeOut(2000);
                user.user_data = data;
                var sect = $('#sector-user-add').val();
                user.sector_seclect = sect;
                user.show('all', sect);
                // console.log(user.sector);

                var db_data = $.parseJSON(user.user_data);
                $.each(db_data, function(index, value) {
                    //alert(key); ////     ຄົ້ນຫາຂໍ້ມູນ ---------------------
                    if (value.name.search(new RegExp('x', 'i')) != -1) {
                        // alert(value.id);
                        //console.log(value.name);
                        return;
                    }
                });
                user.paginasion();
                //user.save();
            });
        });

    });
    //-------


    user_get_sector_db();

    function user_get_sector_db() {
        $.ajax({
            url: url + 'index.php/' + 'mg_data/get_data',
            type: "POST",
            data: { get_db: 'db_sector' },
            timeout: 6000,
            success: function(data) {
                user.sector = data;

                $('#sector-user-add').html('');
                var db_data = $.parseJSON(user.sector);
                $.each(db_data, function(index, value) {
                    if (value.sector_type != 'ou') {
                        $('#sector-user-add').append('<option value="' + value.id + '"> ' + value.name + ' </option>');
                    }
                });

                /// get permission 
                user_get_per_db();

                function user_get_per_db() {
                    $.ajax({
                        url: url + 'index.php/' + 'mg_data/get_data',
                        type: "POST",
                        data: { get_db: 'db_permission' },
                        timeout: 6000,
                        success: function(data) {
                            user.permission_data = data;
                            ///console.log(user.permission_data);

                            $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');


                            /// get user db
                            user_get_user_data_db();

                            function user_get_user_data_db() {
                                $.ajax({
                                    url: url + 'index.php/' + 'mg_data/get_data',
                                    type: "POST",
                                    data: { get_db: 'db_user' },
                                    timeout: 6000,
                                    success: function(data) {
                                        $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                                        $('.loading').fadeOut(2000);
                                        user.user_data = data;
                                        var sect = $('#sector-user-add').val();
                                        user.sector_seclect = sect;
                                        user.show('all', sect);
                                        // console.log(user.sector);

                                        var db_data = $.parseJSON(user.user_data);
                                        $.each(db_data, function(index, value) {
                                            //alert(key); ////     ຄົ້ນຫາຂໍ້ມູນ ---------------------
                                            if (value.name.search(new RegExp('x', 'i')) != -1) {
                                                // alert(value.id);
                                                //console.log(value.name);
                                                return;
                                            }
                                        });
                                        user.paginasion();
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { user_get_user_data_db() } }
                                });
                            }


                        },
                        error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { user_get_per_db() } }
                    });
                }


            },
            error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { user_get_sector_db() } }
        });
    }



    $("#sector-user-add").change(function(e) {
        e.preventDefault();
        var sect = $('#sector-user-add').val();
        user.sector_seclect = sect;
        user.show('all', sect);
        user.paginasion();
        //user.save();
        //console.log(user.sector_seclect);

    });


    $("#bt-add-user").click(function(e) {
        e.preventDefault();
        $("#form-list-user").hide();
        $("#bt-add-user").hide();
        $("#bt-save-user").show();
        $("#bt-save-user").attr("disabled", true);
        $("#bt-cancel-user").show();
        $("#form-add-user").show();
        $("#process-bar").attr('style', 'width: 0%;');

        //if (user.user_add_type == '' || user.user_add_type == 'update') {}
        user.user_add_type = "add";
        $("#form-user-add-name").val('');
        $("#form-user-pass1").val('');
        $("#form-user-pass1").val('');
        $("#form-user-pass2").val('');
        $("#form-alert-user").html('');



        var intrvl = setInterval(function() {
            $('#form-user-add-name:first').focus();
            clearInterval(intrvl);
        }, 800);
        $('#form-user-sector-select').html('');
        $('#form-user-permisstion').html('');
        var db_data = $.parseJSON(user.sector);
        $.each(db_data, function(index, value) {
            $('#form-user-sector-select').append('<option value="' + value.id + '"> ' + value.name + ' </option>');
        });
        $('#form-user-sector-select').val(user.sector_seclect);

        $('#form-permission-list').html('');
        var per = JSON.parse(user.permission_data);
        $.each(per, function(index, value) {
            $('#form-permission-list').append('<li><input type="checkbox" id="per_' + value.type + '" > ' + value.description + ' </li> ');
        });



        user.user_per = '';
        $('#per_rm').click(function(e) {
            if ($('#per_rm').is(':checked')) {
                var up = user.user_per;
                user.user_per = up + "rm|";
            } else {
                var up = user.user_per;
                user.user_per = up.replace("rm|", "");
            }
            user.check_form();
        });
        $('#per_rs').click(function(e) {
            if ($('#per_rs').is(':checked')) {
                var up = user.user_per;
                user.user_per = up + "rs|";
            } else {
                var up = user.user_per;
                user.user_per = up.replace("rs|", "");
            }
            user.check_form();
        });
        $('#per_ap').click(function(e) {
            if ($('#per_ap').is(':checked')) {
                var up = user.user_per;
                user.user_per = up + "ap|";
            } else {
                var up = user.user_per;
                user.user_per = up.replace("ap|", "");
            }
            user.check_form();
        });
        $('#per_ed').click(function(e) {
            if ($('#per_ed').is(':checked')) {
                var up = user.user_per;
                user.user_per = up + "ed|";
            } else {
                var up = user.user_per;
                user.user_per = up.replace("ed|", "");
            }
            user.check_form();
        });
        $('#per_all').click(function(e) {
            if ($('#per_all').is(':checked')) {
                var up = user.user_per;
                user.user_per = up + "all|";
            } else {
                var up = user.user_per;
                user.user_per = up.replace("all|", "");
            }
            user.check_form();
        });
        // console.log(user.user_data);
    });

    $("#form-user-add-name").keyup(function(e) { user.check_form() });
    $('#form-user-male').click(function(event) { user.check_form() });
    $('#form-user-female').click(function(event) { user.check_form() });
    $("#form-user-pass1").keyup(function(e) { user.check_form() });
    $("#form-user-pass2").keyup(function(e) { user.check_form() });
    $("#form-user-status").change(function(e) {
        e.preventDefault();
        user.check_form();
    });
    $("#form-user-type").change(function(e) {
        e.preventDefault();
        user.check_form();
    });
    $("#sector-user-select").change(function(e) {
        e.preventDefault();
        user.check_form();
    });

    $("#form-sex").change(function(e) {
        e.preventDefault();
        user.check_form();
    });

    $("#form-user-sector-select").change(function(e) {
        e.preventDefault();
        user.check_form();
    });



    $("#bt-cancel-user").click(function(e) {
        e.preventDefault();
        $("#bt-cancel-user").hide();
        $("#bt-save-user").hide();
        $("#form-add-user").hide();
        $("#bt-add-user").show();
        $("#form-list-user").slideDown();
        //// clear form


    });




    $("#bt-save-user").click(function(e) {
        e.preventDefault();
        $("#bt-save-user").attr("disabled", true);
        $("#bt-cancel-user").attr("disabled", true);
        var name = $("#form-user-add-name").val();
        var pass1 = $("#form-user-pass1").val();
        var pass2 = $("#form-user-pass2").val();
        var pass_new = null;
        var sex = $("#form-sex").val();
        var status = $("#form-user-status").val();
        var user_sector = $("#form-user-sector-select").val();
        var user_per = user.user_per;
        var user_type = $("#form-user-type").val();
        //if ($('#form-user-male').is(':checked')) { sex = "ທ່ານ "; } else if ($('#form-user-female').is(':checked')) { sex = "ທ່ານ ນ. "; }
        if (pass1 == pass2) { pass_new = pass1; }
        switch (user.user_add_type) {
            case 'add':
                //console.log(name + '-' + pass1 + '-' + sex + '-' + status + '-' + user_sector + '-' + user_per + '-' + user_type);
                $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');


                add_user_data_db();

                function add_user_data_db() {
                    $.ajax({
                        url: url + 'index.php/' + 'mg_data/add',
                        type: "POST",
                        data: { post_type: 'add_user', name: name, pass: pass_new, sex: sex, user_sector: user_sector, user_per: user_per, status: status, user_type: user_type },
                        timeout: 6000,
                        success: function(data) {
                            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                            $('.loading').fadeOut(2000);
                            $("#bt-cancel-user").attr("disabled", false);
                            $("#bt-cancel-user").hide();
                            $("#bt-save-user").hide();
                            $("#form-add-user").hide();
                            $("#bt-add-user").show();

                            var u_data = JSON.parse(user.user_data);
                            var user_add = {
                                "id": data,
                                "permission": user_per,
                                "sector_id": user_sector,
                                "user_type": user_type,
                                "profile": null,
                                "name": name,
                                "pass": "",
                                "sex": sex,
                                "status": status,
                                "date": ""
                            };
                            u_data.unshift(user_add);
                            var newa = JSON.stringify(u_data);
                            user.user_data = newa;
                            //console.log(newa);


                            user.show('all', user.sector_seclect);
                            user.paginasion();
                            //user.get_data_update();
                            $("#form-list-user").slideDown();
                        },
                        error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { add_user_data_db() } }
                    });
                }

                break;
            case 'update':
                ////// update data
                var id = user.id_update;

                $('#processing').html('<span class="loading"><img src="' + url + 'images/loading.svg" width="48" height="48"></span>');
                update_user_data_db();

                function update_user_data_db() {
                    $.ajax({
                        url: url + 'index.php/' + 'mg_data/update',
                        type: "POST",
                        data: { post_type: 'update_user', id: id, name: name, pass: pass_new, sex: sex, user_sector: user_sector, user_per: user_per, status: status, user_type: user_type },
                        timeout: 6000,
                        success: function(data) {
                            $('#processing').html('<span class="loading"><div style="padding-top: 10px;"><i class="ti-check-box" style="font-size:25px; color:royalblue;"></i></div></span>');
                            $('.loading').fadeOut(2000);
                            $("#bt-cancel-user").attr("disabled", false);
                            $("#bt-cancel-user").hide();
                            $("#bt-save-user").hide();
                            $("#form-add-user").hide();
                            $("#bt-add-user").show();
                            var db_data = JSON.parse(user.user_data);
                            $.each(db_data, function(index, value) {
                                if (id == value.id) {
                                    var n_data = JSON.parse(user.user_data);
                                    var user_add = {
                                        "id": id,
                                        "permission": user_per,
                                        "sector_id": user_sector,
                                        "user_type": user_type,
                                        "profile": null,
                                        "name": name,
                                        "pass": "",
                                        "sex": sex,
                                        "status": status,
                                        "date": ""
                                    };
                                    n_data[index] = user_add;
                                    var newa = JSON.stringify(n_data);
                                    user.user_data = newa;
                                }
                            });
                            user.show('all', user.sector_seclect);
                            user.paginasion();
                            $("#form-list-user").slideDown();
                        },
                        error: function(jqXHR, textStatus, errorThrown) { if (textStatus === "timeout") { update_user_data_db() } }
                    });
                }
                break;
        }
    });








}



///// user function /////////////////////////
//// end ad_user page -----------------------