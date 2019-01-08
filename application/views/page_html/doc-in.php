<div class="row">
<div class="col-sm-6 col-md-6 col-lg-6">
        <strong>  <h5><i class="ti-file"></i> ຂໍ້ມູນເອກະສານ</h5> </strong>
        <div class="progress progress-striped">
            <div class="progress-bar progress-bar-custom active ch_data_bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                <span class="sr-only">60% Complete</span>
            </div>
        </div>

        <form class="form">
            <div class="form-group">

            </div>
            <div class="form-group" style="width: 180px;">
                <div class="input-group">
                    <div class="input-group-addon"> ເລກທີ່ ຂາເຂົ້າ: </div>
                    <input type="text" class="form-control doc_new_id" value="...." data="" disabled onkeypress="return isNumberKey(event)">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon"> ຊື່ເອກະສານ: </div>
                    <input type="text" class="form-control docin_name" placeholder=" ຊື່ເອກະສານ.... ">
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon"> ເລກທີ່ເອກະສານ: </div>
                    <input type="text" class="form-control docin_date" placeholder="ເລຫທີ່ ສະຖານທີ່, ວວ ດດ ປປປປ">
                </div>
            </div>
            <p>
                <div class="form-inline num_manual">

                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"> ໝວດເອກະສານ: </div>
                            <select class="form-control docin_type">
                                 <option value="none" >= ເລືອກໝວດເອກະສານ =</option>


                                </select>
                        </div>
                    </div>
                </div>
            </p>

            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon"> ທີ່ມາຂອງເອກະສານ:
                        <input type="radio" name="dc-t" checked data="inside"> ພາຍໃນ
                        <input type="radio" name="dc-t" data="outside"> ພາຍນອກ
                    </div>
                </div>
            </div>

            <p>
                <div class="form-inlines">
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon "> ຈາກພາກສ່ວນ: </div>
                            <select class="form-control docin_form">
                                <option value="none"> = ເລືອກພາກສ່ວນ = </option>
                                <optgroup label="ສຳນັກງານໃຫຍ່">
                                    
                                </optgroup>
                                <optgroup label="ສາຂາ">
                                
                                </optgroup>
                                <optgroup label="ໜ່ວຍບໍລິການ">
                                
                                </optgroup>
                                <optgroup label="ພາກສ່ວນອື່ນ">
                                
                                </optgroup>
                                </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"> ເຖິງພາກສ່ວນ: </div>
                            <select class="form-control docin_to">
                                <option value="none"> = ເລືອກພາກສ່ວນ = </option>
                                <optgroup label="ສຳນັກງານໃຫຍ່">
                                    
                                    <option value="h|<?php echo $office['id'] ?>"> <?php echo $office['name'] ?></option>
                                
                                </optgroup>
                                <optgroup label="ສາຂາ">
                                    
                                    <option value="b|<?php echo $office['id'] ?>"> <?php echo $office['name'] ?></option>
                                
                                </optgroup>
                                <optgroup label="ໜ່ວຍບໍລິການ">
                                
                                    <option value="u|<?php echo $office['id'] ?>"> <?php echo $office['name'] ?></option>
                                
                                </optgroup>
                                <optgroup label="ພາກສ່ວນອື່ນ">
                                
                                    <option value="o|<?php echo $office['id'] ?>"> <?php echo $office['name'] ?></option>
                                
                                </optgroup>
                                </select>
                        </div>
                    </div>
                </div>
            </p>
            <div class="form-group" style="width: 200px;">
                <div class="input-group">
                    <div class="input-group-addon"> ວັນທີ່ບັນທຶກ: </div>
                    <input type="text" class="form-control" readonly value="23/12/2018">
                </div>
            </div>
            <div class="form-group" style="width: 200px;">
                <div class="input-group">
                    <div class="input-group-addon"> ຜູ້ບັນທຶກ: </div>
                    <input type="text" class="form-control" readonly value="admin">
                </div>
            </div>
            ລາຍລະອຽດເພີ່ມເຕີມ:
            <textarea name="" id="input" class="form-control docin_detail" rows="5" required="required"></textarea>
        </form>
    </div>
    <div class="col-sm-6 col-md-6 col-lg-6" id="upload-file">
        <input type="hidden" class="file_upload" value="">
        <strong> <h5> <i class="ti-clip"></i> ໄຟລ໌ເອກະສານອັບໂຫລດ</h5>  </strong>
        <ul class="list-group list_file"> </ul>
        <span id="output"></span><span class="sh_img"></span>
        <div class="progress progress-striped upload-bar" style="display: none;">
            <div class="progress-bar progress-bar-custom active up-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                <span class="sr-only">60% Complete</span>
            </div>
        </div>
        <form id="form_upload"><input type="file" name="file_upload" style="display: none;" id="f_upload"></form>
        <P class="text-center">
            <button type="button" class="btn btn-success waves-effect waves-light" onclick="$('#f_upload').click()"> <i class="ti-export"></i> ເລືອກໄຟລ໌ເອກະສານ</button>
        </P>
    </div>
</div>
</div>
