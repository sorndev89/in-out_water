<?php

class onload{
	private $ci;
	public function __construct()
	{
		$this->ci = & get_instance();
		}
		
		public function check_login(){
			
			$controller = $this->ci->router->class;
			$method = $this->ci->router->method;
			//$this->ci->session->sess_destroy();
			//echo "<br><br><br><br><br><br><br><br>";
			//echo $controller." | ".$method;
			//echo $this->ci->session->userdata("userlog_type");
			//echo "'".$this->ci->session->userdata("uselog_type")."'";
			if($this->ci->session->userdata("user_id") == null){
				
						if($controller=="Main_home" || $controller=="main_home" ||  $controller=="Mg_data" || $controller=="mg_data"){
							redirect(base_url("index.php/login"),"refresh");
							exit();
							}
						//echo '<script type="text/javascript"> alert("Go To Login"); </script>';
				}
				else{ /// ເມື່ອມີການເຂົ້າສູ່ລະບົບ
					
					//if($this->ci->session->userdata("userlog_type") == "admin"){ redirect(base_url('dashboard'),"refresh"); exit(); } 
					//else {redirect(base_url(),"refresh"); exit(); }
					
					if(($controller=="Login" || $controller=="login") && $method=='index' )
					{
						redirect(base_url(),"refresh"); exit();

					}
					
				//// ກວດຊອບ ຖ້າມີການ Login ຢູ່ບ່ອນໃຫມ່ ໃຫ້ອອກຈາກລະບົບ
				
					$data =  $this->ci->session->userdata("user_session");
					$check = $this->ci->Iov3->get_data_login("user",$data);
					if($check['session_log'] == null){
						$this->ci->session->sess_destroy();
						redirect(base_url(),"refresh"); exit();
					}
					
				//// ກວດຊອບ ຖ້າບໍ່ແມ່ນ admin ບໍ່ໃຫ້ເຂົ້າສູ່ໜ້າ Dashboard
				/*
					if($controller == 'dashboard' and $this->ci->session->userdata("userlog_type") != 'admin'){
						//$this->ci->session->sess_destroy();
						redirect(base_url(),"refresh"); exit();
					}
					*/

				}
				
		}
	
	}

?>