<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mg_data extends CI_Controller {
	function __construct()
	{
		parent::__construct();
		//$this->load->model('in_outv2');
    }
    
    public function index()
	{

        
    }

    public function add()
	{

        $post_type = $this->input->get_post('post_type');

        switch ($post_type) {
            case 'add_sector':
            /// add sector table ---------------------
                $name = $this->input->get_post('name');
                $village = $this->input->get_post('village');
                $city = $this->input->get_post('city');
                $province = $this->input->get_post('province');
                $type = $this->input->get_post('type');                
                $tel = $this->input->get_post('tel');                
                $data =  array('name'=>$name,'village'=>$village, 'city'=>$city, 'province'=>$province, 'tel'=>$tel, 'sector_type'=>$type);
                $this->Iov3->add_data('sector',$data);
                $insert_id = $this->db->insert_id('sector');
                echo $insert_id;
            break;

            case 'add_grono_doc':
            /// add sector table ---------------------
                $name = $this->input->get_post('name');
                $sector_id = $this->input->get_post('sector_id');
                $grono_type = $this->input->get_post('grono_type');             
                $data =  array('name'=>$name,'grono_type'=>$grono_type, 'sector_id'=>$sector_id);
                $this->Iov3->add_data('grono_doc',$data);
                $insert_id = $this->db->insert_id('grono_doc');
                echo $insert_id;
            break;

            case 'add_year':
            /// add year table ---------------------
                $year = $this->input->get_post('year');           
                $data =  array('name'=>$year);
                $this->Iov3->add_data('data_base_year',$data);
                $insert_id = $this->db->insert_id('data_base_year');
                echo $insert_id;
            break;

            case 'add_user':
            /// add user table ---------------------
                $name = $this->input->get_post('name');    
                $pass = $this->input->get_post('pass'); 
                $sex = $this->input->get_post('sex'); 
                $user_sector = $this->input->get_post('user_sector'); 
                $user_per = $this->input->get_post('user_per'); 
                $status = $this->input->get_post('status');        
                $user_type = $this->input->get_post('user_type');
                $new_pass = password_hash($pass, PASSWORD_BCRYPT,['cost'=>9]);
                $data =  array('name'=>$name,'permission'=>$user_per,'sector_id'=>$user_sector,'user_type'=>$user_type,'pass'=>$new_pass,'sex'=>$sex,'status'=>$status,'date'=>date("Y-m-d H:i:s"));
                $this->Iov3->add_data('user',$data);
                $insert_id = $this->db->insert_id('user');
                echo $insert_id;
               // echo $data;
            break;
            /**/
            case 'add_doc':
            /// add doc table ---------------------
                $doc = $this->input->get_post('doc');
                $num_doc = $this->input->get_post('num_doc');
                $name_doc = $this->input->get_post('name_doc');
                $ndoc_doc = $this->input->get_post('ndoc_doc');
                $doc_type_doc = $this->input->get_post('doc_type_doc');
                $form_sector_doc = $this->input->get_post('form_sector_doc');
                $to_sector_doc = $this->input->get_post('to_sector_doc');
                $file_upload = $this->input->get_post('file_upload');
                $user = $this->input->get_post('user');
                $doc_detail = $this->input->get_post('doc_detail');
                $side = $this->input->get_post('side');
                $sector_type = $this->input->get_post('sector_type');
               // echo $doc."-".$num_doc."-".$name_doc."-".$ndoc_doc."-".$doc_type_doc."-".$form_sector_doc."-".$to_sector_doc."-".$file_upload."-".$user."-".$side;

                $data =  array('user_id'=>$user,'num_in'=>$num_doc,'docex'=>$ndoc_doc,'doc_in_out'=>$doc,'name'=>$name_doc,'detail'=>$doc_detail,'file_scan'=>$file_upload,'doc_type'=>$doc_type_doc,'doc_from'=>$form_sector_doc,'doc_to'=>$to_sector_doc,'doc_from_type'=>$side,'sector_type'=>$sector_type,'doc_approve'=>'','ceo_app'=>'','doc_view'=>'','status'=>'show','date'=>date("Y-m-d H:i:s"));
                $this->Iov3->add_data('document',$data);
                $insert_id = $this->db->insert_id('document');
                echo $insert_id;
               // echo $data;
            break;
            

    
        }
        
        
    }

    public function update()
	{

        $post_type = $this->input->get_post('post_type');

        switch ($post_type) {
            case 'update_sector':
            /// add sector table ---------------------
                $id = $this->input->get_post('id');                
                $name = $this->input->get_post('name');
                $village = $this->input->get_post('village');
                $city = $this->input->get_post('city');
                $province = $this->input->get_post('province');
                $type = $this->input->get_post('type');                
                $tel = $this->input->get_post('tel');                
                $data =  array('name'=>$name,'village'=>$village, 'city'=>$city, 'province'=>$province, 'tel'=>$tel, 'sector_type'=>$type);
                $this->Iov3->update_data('sector',$data,$id);
            break;

            case 'update_grono_doc':
            /// add grono_doc table ---------------------
                $id = $this->input->get_post('id');                
                $name = $this->input->get_post('name');              
                $data =  array('name'=>$name);
                $this->Iov3->update_data('grono_doc',$data,$id);
            break;

            case 'update_setting_file':
            /// update setting ---------------------
                $id = $this->input->get_post('id');                
                $file_size = $this->input->get_post('file_size');
                $file_type = $this->input->get_post('file_type');               
                $data =  array('file_type_upload'=>$file_type, 'maxfile_size'=>$file_size);
                $this->Iov3->update_data('setting_data',$data,$id);
            break;
            
            case 'update_setting_readonly':
            /// update setting readonly ---------------------
                $id = $this->input->get_post('id');                
                $read = $this->input->get_post('read');             
                $data =  array('data_readonly'=>$read);
                $this->Iov3->update_data('data_base_year',$data,$id);
            break;

            case 'update_setting_use':
            /// update setting readonly ---------------------
                $id = $this->input->get_post('id');                
                $use = $this->input->get_post('use');             
                $data =  array('data_used'=>$use);
                $clear =  array('data_used'=>'0');
                $this->Iov3->update_data_all('data_base_year',$clear);
                $this->Iov3->update_data('data_base_year',$data,$id);
            break;

            case 'update_user':
            /// update setting readonly ---------------------
                $id = $this->input->get_post('id');                
                $name = $this->input->get_post('name');    
                $pass = $this->input->get_post('pass'); 
                $sex = $this->input->get_post('sex'); 
                $user_sector = $this->input->get_post('user_sector'); 
                $user_per = $this->input->get_post('user_per'); 
                $status = $this->input->get_post('status');        
                $user_type = $this->input->get_post('user_type');

                if($pass==''){
                    //$new_pass = password_hash($pass, PASSWORD_BCRYPT,['cost'=>9]);
                    $data =  array('name'=>$name,'permission'=>$user_per,'sector_id'=>$user_sector,'user_type'=>$user_type,'sex'=>$sex,'status'=>$status);
    
                } else {
                    $new_pass = password_hash($pass, PASSWORD_BCRYPT,['cost'=>9]);
                    $data =  array('name'=>$name,'permission'=>$user_per,'sector_id'=>$user_sector,'user_type'=>$user_type,'pass'=>$new_pass,'sex'=>$sex,'status'=>$status);
     
                }

                $this->Iov3->update_data('user',$data,$id);
                
            break;
    
        }
        
        
    }


    public function del()
	{

        $post_type = $this->input->get_post('post_type');

        switch ($post_type) {
            case 'del_sector':
            /// add sector table ---------------------
                $id = $this->input->get_post('id');
                $this->Iov3->del_data('sector',$id);
            break;
            case 'del_grono_doc':
            /// add sector table ---------------------
                $id = $this->input->get_post('id');
                $this->Iov3->del_data('grono_doc',$id);
            break;

            case 'del_user':
            /// delete user table ---------------------
                $id = $this->input->get_post('id');
                $this->Iov3->del_data('user',$id);
            break;
            
    
        }
        
        
    }


    public function get_data()
	{

        $post_type = $this->input->get_post('get_db');

        switch ($post_type) {
            case 'db_sector':
            /// get db sector table ---------------------
		        $this->jsondb = $this->Iov3->get_data_asc("sector");                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;
            
            case 'db_sector_one':
            /// get db sector table ---------------------
                $id = $this->input->get_post('id');                
		        $this->jsondb = $this->Iov3->get_data_one("sector",$id);                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;

            case 'db_grono_doc':
            /// get db sector table ---------------------
		        $this->jsondb = $this->Iov3->get_data("grono_doc");                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;

            //// grono_doc

            case 'db_grono_doc_one':
            /// get db sector table ---------------------
                $id = $this->input->get_post('id');                
		        $this->jsondb = $this->Iov3->get_data_one("grono_doc",$id);                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;

            case 'db_setting_one':
            /// get db setting table ---------------------
                $id = $this->input->get_post('id');                
		        $this->jsondb = $this->Iov3->get_data_one("setting_data",$id);                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;

            case 'get_db_year':
            /// get db sector table ---------------------              
		        $this->jsondb = $this->Iov3->get_data("data_base_year");                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;

            case 'db_user':
            /// get db sector table ---------------------              
		        $this->jsondb = $this->Iov3->get_data("user");                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;

            case 'db_permission':
            /// get db sector table ---------------------              
		        $this->jsondb = $this->Iov3->get_data("permission");                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;

            // db_check_doc_num

            case 'db_check_doc_num':
            /// get document db num table ---------------------       
                $doc = $this->input->get_post('doc_in_out');
                $year = $this->input->get_post('year');  
                $sector = $this->input->get_post('sector');  
                $grono = $this->input->get_post('grono');         
		        $this->jsondb = $this->Iov3->check_doc_num("document",$year,$sector,$grono,$doc);                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;
            case 'db_doc':
            /// get document db num table ---------------------       
                $month = $this->input->get_post('month');
                $year = $this->input->get_post('year');        
		        $this->jsondb = $this->Iov3->get_doc_my("document",$month,$year);                 
                $myJSON = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $myJSON;
            break;

            case 'db_doc_sector_grono':
            /// get document db num table ---------------------       

                /// month and year
                $month = $this->input->get_post('month');
                $year = $this->input->get_post('year');        
		        $this->jsondb = $this->Iov3->get_doc_my("document",$month,$year);                 
                $doc = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                /// All year 
                //$month = $this->input->get_post('month');
                //$year = $this->input->get_post('year');        
		        //$this->jsondb = $this->Iov3->get_doc_y("document",$year);                 
                //$doc = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                
                $this->jsondb = $this->Iov3->get_data_asc("sector");                 
                $sector = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);

                $this->jsondb = $this->Iov3->get_data("grono_doc");                 
                $grono = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);

                $this->jsondb = $this->Iov3->get_data("user");                 
                $user = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);

                $all_data = $grono."|X|".$sector."|X|".$user."|X|".$doc;
                echo $all_data;

            break;

            case 'db_doc_search':
            /// get document db num table ---------------------       
               // $month = $this->input->get_post('month');
                $year = $this->input->get_post('year');        
		        $this->jsondb = $this->Iov3->get_doc_y("document",$year);                 
                $doc = json_encode($this->jsondb,JSON_UNESCAPED_UNICODE);
                echo $doc;
            break;
        }
        
        
    }

    public function check_session()
    {
        ///echo $this->session->userdata("user_id");
        if($this->session->userdata("user_id") == null){
            echo "out";
        }
        else {
           

            $data =  $this->session->userdata("user_session");
			$check = $this->Iov3->get_data_login("user",$data);
				if($check['session_log'] != null){
                    echo "in";
                }
               
        }


    }

    public function get_data_login()
    {
        $id = $this->session->userdata("user_id");
        $db_user = $this->Iov3->get_data_one("user",$id);                 
        $user = json_encode($db_user,JSON_UNESCAPED_UNICODE);

        $db_setting = $this->Iov3->get_data("setting_data");                 
        $setting = json_encode($db_setting,JSON_UNESCAPED_UNICODE);

        $db_year = $this->Iov3->get_data_year("data_base_year");                 
        $year = json_encode($db_year,JSON_UNESCAPED_UNICODE);

        $all_data = $user."|X|".$setting."|X|".$year."|X|"."in";
        echo $all_data;

    }

    public function test()
    {
        

        $id = $this->session->userdata("user_id");
        $db_user = $this->Iov3->get_data_one("user",$id);                 
        $user = json_encode($db_user,JSON_UNESCAPED_UNICODE);

       

        $db_setting = $this->Iov3->get_data("setting_data");                 
        $setting = json_encode($db_setting,JSON_UNESCAPED_UNICODE);

        

        $db_year = $this->Iov3->get_data_year("data_base_year");                 
        $year = json_encode($db_year,JSON_UNESCAPED_UNICODE);

        $all_data = $user."|X|".$setting."|X|".$year;
        echo $all_data;
        //echo $all_data;
        //$new = explode("|X|",$all_data);

       // $m = json_decode($new[1]);
       // print_r($new[1]);


        $name = "sone";
        //$hashed_name = $this->hash_string($name);
        $hashed_name = password_hash($name, PASSWORD_BCRYPT,['cost'=>9]);
       // echo "name: ".$name."<br>";
       // echo $hashed_name;

     //   echo "<br>";
        $name_login = "sone";
        //$result = $this->hash_verify($name_login,$hashed_name);
        $result = password_verify($name_login,$hashed_name);
        if($result == true){
       //     echo "Log in";
        } else {
      //      echo "No Log in";
        }
    }

    public function hash_string($string)
    {
        $hashed_string = password_hash($string, PASSWORD_BCRYPT,['cost'=>9]);
        return $hashed_string;
    }

    public function hash_verify($plain_text,$hashed_string)
    {
        $hashed_string = password_verify($plain_text,$hashed_string);
        return $hashed_string;
    }

    public function upload_file()
	{

		//// upload pic -------------------------------------------------
		$config = array("upload_path"=>"file_upload/","allowed_types"=>"jpg|gif|png|jpeg|pdf",);
		$this->load->library('upload', $config);
		if($this->upload->do_upload("file_upload")){
			$data = $this->upload->data();
			$name_pic=date("YmdHis");
			rename($data["full_path"],$data["file_path"].$name_pic.$data["file_ext"]);
							//$name_pic_thumb=$name_pic."_thumb".$data["file_ext"];
			$this->load->library("image_lib");
			$config = array("image_library"=>"gd2","source_image"=>"file_upload/".$name_pic.$data["file_ext"],
				"maintain_ratio"=>TRUE );
			
			$this->image_lib->initialize($config);
							//$this->image_lib->resize();
							//$img_up_th=$name_pic.'_thumb'.$data["file_ext"];
			$file_name=$name_pic.$data["file_ext"];
		}
		else{
							//echo $this->upload->display_errors('<p>', '</p>');
			$file_name='no_upload'; 
							///echo "No Upload";
		}
						//// end upload
		echo $file_name;
						//$shdata = $this->Mdata->get_data("product",$id);
						//$imgall = $shdata['img']."||".$img_up_th;
						//$data =  array('img'=>$imgall);
						//$this->Mdata->update_data("product",$data,$id);
    }
    
    public function del_file()
	{
		$file = $this->input->post('file');
		$delete = "file_upload/".$file;
		if(file_exists($delete)){ unlink($delete); echo "del"; } else { echo 'No'; }

	}

}