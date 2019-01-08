<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <title>Doc Manager v3 Water</title>
    <meta content="Admin Dashboard" name="description">
    <meta content="ThemeDesign" name="author">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="<?php echo base_url('images\water.ico');?>">
    <!--Morris Chart CSS -->
    <link rel="stylesheet" href="assets\plugins\morris\morris.css">
    <link href="<?php echo base_url('assets\css\bootstrap.min.css');?> " rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets\css\icons.css');?> " rel="stylesheet" type="text/css">
    <!---->
    <link href="<?php echo base_url('assets\css\style.css');?> " rel="stylesheet" type="text/css">
</head>
<body class="fixed-left">
    <div id="preloader">
        <div id="status">
            <div class="spinner"></div>
        </div>
    </div>
    <div id="wrapper">
        <div class="left side-menu">
            <button type="button" class="button-menu-mobile button-menu-mobile-topbar open-left waves-effect" id="btnmcl">
                    <i class="mdi mdi-window-close"></i>
                </button>
            <!-- LOGO -->
            <div class="topbar-left">
                <div class="text-center" style=" padding-top:10px; ">
                    <!--<a href="index.html" class="logo">Admiry</a>-->
                    <a href="#doc-home" class="logo"><img src="images\water.png" height="125" alt="logo"></a>
                    <h4 class="font-16">ລັດວິສາຫະກິດ ນ້ຳປະປາ <br> ແຂວງຈຳປາສັກ </h4>
                </div>
            </div>
            <div class="sidebar-inner slimscrollleft">
                <div id="sidebar-menu">
                    <ul>
                        <li class="menu-title mu">ເມນູໜ້າວຽກ</li>
                        <li class="mi-rm">
                            <a href="#doc-home" class="waves-effect"> <i class="ti-list"></i> <span> ລາຍການ ເອກະສານ</span> </a>
                        </li>
                        <li class="mi-rm">
                            <a href="#doc-in" class="waves-effect"> <i class="ti-angle-double-right"></i> <span> ບັນທຶກ ຂາເຂົ້າ</span> </a>
                        </li>
                        <li class="mi-rm">
                            <a href="#doc-out" class="waves-effect"> <i class="ti-angle-double-left"></i> <span> ບັນທຶກ ຂາອອກ</span> </a>
                        </li>

                        <li class="mi-ap">
                            <a href="#doc-ap" class="waves-effect">
                                <i class="ti-layout-list-thumb"></i>
                                <span> ຕິດຕາມ / ອານຸມັດ <span class="badge badge-danger pull-right">8</span></span>
                            </a>
                        </li>
                        <li class="menu-title mi-ed">ຈັດການ ເອກະສານ</li>
                        <li class="mi-ed">
                            <a href="#doc-mg" class="waves-effect">
                                <i class="ti-pencil-alt"></i>
                                <span> ແກ້ໄຂ/ລຶບ ເອກະສານ</span>
                            </a>
                        </li>
                        <li class="mi-ed">
                            <a href="#doc-trash" class="waves-effect">
                                <i class="ti-trash"></i>
                                <span> ຖັງຂີ້ເຫຍື້ອ ລະບົບ</span>
                            </a>
                        </li>
                        <li class="menu-title mi-rm">ລາຍງານ</li>
                        <li class="mi-rm">
                            <a href="#doc-report" class="waves-effect">
                                <i class="ti-layers-alt"></i>
                                <span> ລາຍງານ ເອກະສານ</span>
                            </a>
                        </li>
                        <li class="menu-title mi-setting">ຈັດການລະບົບ (Admin)</li>
                        <li class="mi-admin">
                            <a href="#ad-system" class="waves-effect">
                                <i class="ti-settings"></i>
                                <span> ຕັ້ງຄ່າລະບົບ</span>
                            </a>
                        </li>
                        <li class="mi-admin">
                            <a href="#ad-se" class="waves-effect">
                                <i class="ti-panel"></i>
                                <span> ສຳນັກງານ</span>
                            </a>
                        </li>
                        <li class="mi-rs">
                            <a href="#ad-doc" class="waves-effect">
                                <i class="ti-folder"></i>
                                <span> ຈັດເກັບ ເອກະສານ</span>
                            </a>
                        </li>
                        <li class="mi-admin">
                            <a href="#ad-user" class="waves-effect">
                                <i class="ti-user"></i>
                                <span> ຈັດການ ຜູ້ໃຊ້</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="clearfix" style="padding-bottom: 100px;"></div>
            </div>
            <!-- end sidebarinner -->
        </div>
        <!-- Left Sidebar End -->
        <!-- Start right Content here -->
        <div class="content-page">
            <!-- Start content -->
            <div class="content">
                <!-- Top Bar Start -->
                <div class="topbar">
                    <nav class="navbar-custom bgkk">
                        <ul class="list-inline float-right mb-0">
                            <li class="list-inline-item dropdown notification-list">
                                <a class="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    <img src="images\water.png" alt="user" class="rounded-circle">
                                </a>
                                <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                                    <a class="dropdown-item" href="#"><i class="ti-user"></i> ຂໍ້ມູນຜູ້ໃຊ້</a>
                                    <a class="dropdown-item" href="#"><i class="ti-pencil-alt"></i> ປ່ຽນລະຫັດ</a>
                                    <a class="dropdown-item" href="<?php echo base_url("index.php/login/go_out")?>"><i class="ti-shift-right"></i> ອອກຈາກລະບົບ</a>
                                </div>
                            </li>
                        </ul>
                        <ul class="list-inline menu-left mb-0 ">
                            <li class="list-inline-item ">
                                <button type="button" class="button-menu-mobile open-left waves-effect bgkk">
                                        <i class="mdi mdi-menu"></i>  
                                    </button>
                            </li>
                            <li class="hide-phone list-inline-item app-search">
                                <h3 class="page-title">Dashboard</h3>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </nav>
                </div>
                <!-- Top Bar End -->
                <div class="page-content-wrapper ">
                    <div class="container-fluid">
                        <div class="row" style="display:none;">
                            <div class="col-md-6 col-xl-3">
                                <div class="mini-stat clearfix bg-white">
                                    <span class="mini-stat-icon bg-light"><i class="mdi mdi-database text-danger"></i></span>
                                    <div class="mini-stat-info text-right text-muted">
                                        <span class="counter text-danger">1,585</span> Mb
                                    </div>
                                    <p class="mb-0 m-t-20 text-muted">ໄຟລ໌ທີ່ອັບໂຫລດທັງໝົດ ໃຊ້ພື້ນທີ່ <span class="pull-right"></span></p>
                                </div>
                            </div>

                            <div class="col-md-6 col-xl-3">
                                <div class="mini-stat clearfix bg-white">
                                    <span class="mini-stat-icon bg-light"><i class="mdi mdi-dns text-danger"></i></span>
                                    <div class="mini-stat-info text-right text-muted">
                                        <span class="counter text-danger">852</span> File
                                    </div>
                                    <p class="mb-0 m-t-20 text-muted"> ຈຳນວນໄຟລ໌ທີ່ອັບໂຫລດທັງໝົດ <span class="pull-right"></span></p>
                                </div>
                            </div>

                            <div class="col-md-6 col-xl-3">
                                <div class="mini-stat clearfix bg-white">
                                    <span class="mini-stat-icon bg-light"><i class="mdi mdi-account-box text-danger"></i></span>
                                    <div class="mini-stat-info text-right text-muted">
                                        <span class="counter text-danger">12</span> User
                                    </div>
                                    <p class="mb-0 m-t-20 text-muted"> ຈຳນວນຜູ້ໃຊ້ທັງໝົດ <span class="pull-right"></span></p>
                                </div>
                            </div>
                        </div>
                    <div class="row" id="main_center">
                            <div class="col-xl-10">
                                <div class="card m-b-30">
                                    <div class="card-body">
                                      <div id="panel_title">
                                      </div>
                                      <!-- <div class="table-responsive"> -->
                                    <div id="panel_body">
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                    </div>
    </div>
    <!-- end row -->
    </div>
    <!-- container -->
    </div>
    <!-- Page content Wrapper -->
    </div>
    <!-- Page content Wrapper -->
    </div>
    <!-- content -->
    <footer class="footer ">
        © 2018 Doc Manager V3 ພັດທະນາໂດຍ SornDev.
    </footer>
    </div>
    <!-- End Right content here -->
    </div>
    <!-- END wrapper -->
    <!-- jQuery  -->
    <script src="<?php echo base_url('assets/js/jquery.min.js');?>"></script>
    <script src="<?php echo base_url('assets/js/popper.min.js');?>"></script>
    <!----><script src="<?php echo base_url('assets/js/bootstrap.min.js');?>"></script>
    <script src="<?php echo base_url('assets/js/modernizr.min.js');?>"></script>
    <script src="<?php echo base_url('assets/js/detect.js');?>"></script>
    <script src="<?php echo base_url('assets/js/fastclick.js');?>"></script>
    <script src="<?php echo base_url('assets/js/jquery.slimscroll.js');?>"></script>
    <script src="<?php echo base_url('assets/js/jquery.blockUI.js');?>"></script>
    <script src="<?php echo base_url('assets/js/waves.js');?>"></script>
    <script src="<?php echo base_url('assets/js/jquery.nicescroll.js');?>"></script>
    <script src="<?php echo base_url('assets/js/jquery.scrollTo.min.js');?>"></script>
    <!--Morris Chart
    <script src="aaaaassets\plugins\morris\morris.min.js "></script>-->
    <script src="<?php echo base_url('assets/plugins/raphael/raphael-min.js');?>"></script>
    <!--    <script src="<?php echo base_url('assets/pages/dashborad.js');?>"></script> -->
     <!--App js -->
    <script src="<?php echo base_url('assets/js/app.js');?>"></script>
    <script src="<?php echo base_url('assets/js/js_app/page_app.js?v=').time();?>"></script>
    <script src="<?php echo base_url('assets/js/js_app/rout_app.js?v=').time();?>"></script>
    <script src="<?php echo base_url('assets/js/js_app/js_con.js');?>"></script>
    <script src="<?php echo base_url('assets/plugins/alertify/js/alertify.js');?>"></script>
</body>
</html