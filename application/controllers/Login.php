<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
	function __construct()
	{
		parent::__construct();
		// load libary tcpdf
		//$this->load->library('Pdf_report');
	}
	public function index()
	{
			$this->load->view('login');
	}

	public function check_login()
	{

		$user_login = $this->input->post("user");
		$pass = $this->input->post("pass");
		$ch_user = false;
		//echo $user_login."+".$pass;
		$user = $this->Iov3->get_data("user"); 
		foreach($user  as $data){ 
			if($data['name']== $user_login){
				$ch_user = true;
			} 
		}

		if($ch_user == false){ echo "0"; }

		foreach($user  as $data){ 			
			if($data['name']== $user_login){
			$result = password_verify($pass,$data['pass']);
        		if($result == true){
					
					
					$id = $data['id'];
					$session_log = random(18);
					$data_l =  array('session_log'=>$session_log);
					$this->Iov3->session_login("user",$data_l,$id);
					//echo $data["name"];
				$user_data=array("user_id"=>$data["id"],"user_session"=>$session_log,"user_name"=>$data["name"],"user_type"=>$data["user_type"]);
				
				$this->session->set_userdata($user_data);
				//$this->config->set_item('sess_expiration', '150');
				//$config['sess_expiration']= 150;
				//$this->session->sess_update();
				//redirect(base_url(),"refresh");
				//exit();

				echo "1";

        		} else {
					echo "0";
				}
			}
		}
		
		


		/*
		$result = password_verify($name_login,$hashed_name);
        if($result == true){
            echo "Log in";
        } else {
            echo "No Log in";
		}
		*/
	}

	public function go_out()
	{
		$this->session->sess_destroy();
		redirect(base_url(),"refresh");
		exit();
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



}