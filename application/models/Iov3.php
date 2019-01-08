<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Iov3 extends CI_Model {
	
	
	function __construct()
	{
		parent::__construct();
		
	}

	///-------------------------------- New V3 -------------------------------------------

	public function add_data($table,$data)
	{
		$this->db->insert($table,$data);
	}

	public function update_data($table,$data,$id)
	{
		$this->db->update($table,$data,"id = $id");
	}

	public function update_data_all($table,$data)
	{
		$this->db->update($table,$data);
	}

	public function del_data($table,$id)
	{
		$this->db->where('id', $id)->delete($table);
	}

	public function get_data($table)
      {
        $query = $this->db->select("*")->from($table)->order_by("id","desc")->get();
        return $query->result_array();
	  }
	  public function get_data_asc($table)
      {
        $query = $this->db->select("*")->from($table)->order_by("id","asc")->get();
        return $query->result_array();
	  }

	  public function get_data_year($table)
      {
        $query = $this->db->select("*")->from($table)->where("data_used","1")->get();
        return $query->result_array();
	  }
	  
	  public function get_data_one($table,$id)
      {
        $query = $this->db->select("*")->from($table)->where('id',$id)->get();
        return $query->result_array();
	  }

	  public function session_login($table,$data,$id)
	{
		$this->db->update($table,$data,"id = $id");
	}
	  public function get_data_login($table,$session)
	{
		$query = $this->db->select("*")->from($table)->where('session_log',$session)->get();
		return $query->row_array();
	}
	//check_doc_num

	public function check_doc_num($table,$year,$sector,$grono,$doc)
      {
		$data =  array('YEAR(date)'=>$year,'sector_type'=>$sector,'doc_type'=>$grono,'doc_in_out'=>$doc);
        $query = $this->db->select("*")->from($table)->where($data)->limit('1')->order_by("id","desc")->get();
        return $query->result_array();
	  }

	  public function get_doc_my($table,$month,$year)
      {
		$data =  array('MONTH(date)'=>$month,'YEAR(date)'=>$year);
        $query = $this->db->select("*")->from($table)->where($data)->order_by("id","desc")->get();
        return $query->result_array();
	  }

	  public function get_doc_y($table,$year)
      {
		$data =  array('YEAR(date)'=>$year);
        $query = $this->db->select("*")->from($table)->where($data)->order_by("id","desc")->get();
        return $query->result_array();
	  }


	//// ----------------------- old v2 --------------------------------------------------
	/* get_doc_my
	public function add_data_last_id($table,$data)
	{
		$this->db->insert($table,$data);
		echo $this->db->insert_id(); 
	}

	public function add_data($table,$data)
	{
		$this->db->insert($table,$data);
		//echo $this->db->insert_id(); 
	}

	public function show_data($table)
	{
		$query = $this->db->select("*")->from($table)->order_by("id","asc")->get();
		return $query->result_array();
	}
	public function show_data_docall($table,$year)
	{
		$user_type = $this->session->userdata("user_type");
		if($user_type=='admin'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show');
			$like = array();
		}elseif($user_type=='super-user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show');
			$like = array( 'user.user_type'=>'super-user','user.user_type'=>'user' );
		}elseif($user_type=='user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show', 'user.user_type'=>'user');
			$like = array();
		}
		$query = $this->db->select("*")->from('document')->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("document.doc_id","desc")->like($like)->where($data_w)->get();
		return $query->result_array();
	}

	public function show_data_docall_m($table,$year,$month)
	{
		$user_type = $this->session->userdata("user_type");
		if($user_type=='admin'){
			$data_w = array('YEAR(document.doc_date)' =>$year,'MONTH(document.doc_date)' =>$month, 'document.status'=>'show');
			$like = array();
		}elseif($user_type=='super-user'){
			$data_w = array('YEAR(document.doc_date)' =>$year,'MONTH(document.doc_date)' =>$month, 'document.status'=>'show');
			$like = array( 'user.user_type'=>'super-user','user.user_type'=>'user' );
		}elseif($user_type=='user'){
			$data_w = array('YEAR(document.doc_date)' =>$year,'MONTH(document.doc_date)' =>$month, 'document.status'=>'show', 'user.user_type'=>'user');
			$like = array();
		}
		$query = $this->db->select("*")->from('document')->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("document.doc_id","desc")->like($like)->where($data_w)->get();
		return $query->result_array();
	}

///// trash =========================================================================
	public function show_data_trash($table,$year) /// trash
	{
		$user_type = $this->session->userdata("user_type");
		if($user_type=='admin'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'hide');
			$like = array();
		}elseif($user_type=='super-user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'hide');
			$like = array( 'user.user_type'=>'super-user','user.user_type'=>'user' );
		}elseif($user_type=='user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'hide', 'user.user_type'=>'user');
			$like = array();
		}
		$query = $this->db->select("*")->from('document')->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("document.doc_id","desc")->like($like)->where($data_w)->get();
		return $query->result_array();
	}

	public function search_doc_trash($table,$data,$year) {
		$user_type = $this->session->userdata("user_type");
		if($user_type=='admin'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'hide');
			$like = array('document.name'=>$data);
			$tlike = array('document.num_in'=>$data);
		}elseif($user_type=='super-user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'hide', 'user.user_type'=>'super-user','user.user_type'=>'user');
			$like = array( 'document.name'=>$data);
			$tlike = array('document.num_in'=>$data);
		}elseif($user_type=='user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'hide', 'user.user_type'=>'user');
			$like = array('document.name'=>$data);
			$tlike = array('document.num_in'=>$data);
		}

		
		//$like = array( 'document.name'=>$data ); 
		//like('document.name',$data)->or_like('document.detail',$data)
		$query = $this->db->select("*")->from('document')->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("document.doc_id","desc")->like($like)->or_like($tlike)->where($data_w)->get();
		return $query->result_array();

	} 


	public function show_trash_edit($table,$year,$id)
	{
		$user_type = $this->session->userdata("user_type");
		if($user_type=='admin'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'doc_id' => $id);
			$like = array();
		}elseif($user_type=='super-user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'hide' , 'doc_id' => $id);
			$like = array( 'user.user_type'=>'super-user','user.user_type'=>'user' );
		}elseif($user_type=='user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'hide', 'user.user_type'=>'user' , 'doc_id' => $id);
			$like = array();
		}
		$query = $this->db->select("*")->from('document')->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("document.doc_id","desc")->like($like)->where($data_w)->get();
		return $query->result_array();
	}
//// end trash ========================================================================

	public function show_last_post($table,$year,$day,$doc)
	{
		$user_type = $this->session->userdata("user_type");
		if($user_type=='admin'){
			$data_w = array('YEAR(document.doc_date)' =>$year,'DAY(document.doc_date)' =>$day,'document.doc_in_out' =>$doc, 'document.status'=>'show');
			$like = array();
		}elseif($user_type=='super-user'){
			$data_w = array('YEAR(document.doc_date)' =>$year,'DAY(document.doc_date)' =>$day,'document.doc_in_out' =>$doc, 'document.status'=>'show');
			$like = array( 'user.user_type'=>'super-user','user.user_type'=>'user' );
		}elseif($user_type=='user'){
			$data_w = array('YEAR(document.doc_date)' =>$year,'DAY(document.doc_date)' =>$day,'document.doc_in_out' =>$doc, 'document.status'=>'show', 'user.user_type'=>'user');
			$like = array();
		}
		$query = $this->db->select("*")->from('document')->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("document.doc_id","desc")->like($like)->where($data_w)->get();
		return $query->result_array();
	}

	public function show_data_edit($table,$year,$id)
	{
		$user_type = $this->session->userdata("user_type");
		if($user_type=='admin'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'doc_id' => $id);
			$like = array();
		}elseif($user_type=='super-user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show' , 'doc_id' => $id);
			$like = array( 'user.user_type'=>'super-user','user.user_type'=>'user' );
		}elseif($user_type=='user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show', 'user.user_type'=>'user' , 'doc_id' => $id);
			$like = array();
		}
		$query = $this->db->select("*")->from('document')->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("document.doc_id","desc")->like($like)->where($data_w)->get();
		return $query->result_array();
	}

	public function search_doc($table,$data,$year) {
		$user_type = $this->session->userdata("user_type");
		if($user_type=='admin'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show');
			$like = array('document.name'=>$data);
			$tlike = array('document.num_in'=>$data);
		}elseif($user_type=='super-user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show');
			$like = array( 'document.name'=>$data, 'user.user_type'=>'super-user','user.user_type'=>'user' );
			$tlike = array('document.num_in'=>$data);

		}elseif($user_type=='user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show', 'user.user_type'=>'user');
			$like = array('document.name'=>$data);
			$tlike = array('document.num_in'=>$data);
		}

		//$this->db->select('username,userid');
		//$this->db->from('tbl_user');
		//$this->db->like('username','code');
		//$this->db->or_like('usertype','admin');
		//$query=$this->db->get();

		//$like = array( 'document.name'=>$data );
		//like('document.name',$data)->or_like('document.detail',$data)
		$query = $this->db->select("*")->from('document')->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("document.doc_id","desc")->like($like)->or_like($tlike)->where($data_w)->get();
		
		/*
		$this->db->select("*");
		$this->db->from('document');
		$this->db->join('grono_doc', 'grono_doc.id = document.doc_type');
		$this->db->join('user', 'user.id = document.user_id');
		$this->db->order_by("document.doc_id","desc");
		$this->db->like($like);
		$this->db->or_like($tlike);
		$this->db->where($data_w);
		
		$query=$this->db->get();
		

		return $query->result_array();

	} 

	public function search_doc_data_type($table,$data,$type,$doc_type,$year)
	{	
		$user_type = $this->session->userdata("user_type");
		if($user_type=='admin'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show', 'document.doc_in_out'=>$type , 'document.doc_type'=>$doc_type);
			$like = array( 'document.name'=>$data);
			$tlike = array('document.num_in'=>$data);
		}elseif($user_type=='super-user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show', 'document.doc_in_out'=>$type , 'document.doc_type'=>$doc_type);
			$like = array( 'document.name'=>$data,'user.user_type'=>'super-user','user.user_type'=>'user');
			$tlike = array('document.num_in'=>$data);
		}elseif($user_type=='user'){
			$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show', 'user.user_type'=>'user', 'document.doc_in_out'=>$type , 'document.doc_type'=>$doc_type);
			$like = array( 'document.name'=>$data);
			$tlike = array('document.num_in'=>$data);
		}

		//$data_w = array('YEAR(document.doc_date)' =>$year, 'document.status'=>'show', 'document.doc_in_out'=>$type , 'document.doc_type'=>$doc_type);
		
		$query = $this->db->select("*")->from('document')->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("document.doc_id","desc")->like($like)->where($data_w)->get();
		

		return $query->result_array();


	} 

	public function show_in_out($table)
	{
		//$data = array('document.status'=>'show');
		$query = $this->db->select("*")->from($table)->order_by("id","desc")->get();
		return $query->result_array();

	}

	public function update_data($table,$data,$id)
	{
		$this->db->update($table,$data,"id = $id");
	}

	public function update_doc($table,$data,$id)
	{
		$this->db->update($table,$data,"doc_id = $id");
	}

	public function update_datapp($table,$data)
	{
		$this->db->update($table,$data);
	}
	
	public function del_data($table,$id)
	{
		$this->db->where('id', $id)->delete($table);
	}

	public function del_document($table,$id)
	{
		$this->db->where('doc_id', $id)->delete($table);
	}

	public function show_table_num($table)
	{
		$num = $this->db->count_all_results($table);
		return $num;
	}
	public function get_data_year($table)
	{
		$year = $this->db->select("name")->from($table)->where('data_used','1')->get();
		return $year->row();
	}
	public function get_setting($table)
	{
		$sys = $this->db->select("*")->from($table)->get();
		return $sys->row();
	}
	public function getdoc_num_m($table,$year,$doc_id)
	{
		$data = array('YEAR(doc_date)' =>$year, 'doc_type'=>$doc_id );
		//$num = $this->db->select("*")->from($table)->where($data)->count_all_results();
		$num = $this->db->select("*")->from($table)->where($data)->limit('1')->order_by("num_in","desc")->get();
		if($num->row()==""){
				//return $num->1;
		}
		else {
			return $num->row();
		}
		
	}
	public function getdoc_num($table,$year,$doc_id)
	{
		$data = array('YEAR(doc_date)' =>$year, 'doc_type'=>$doc_id );
		$num = $this->db->select("*")->from($table)->where($data)->count_all_results();
		//$num = $this->db->select("*")->from($table)->where($data)->limit('1')->order_by("id","desc")->get();
		return $num;
	}
	public function show_grono($table,$type)
	{
		$query = $this->db->select("*")->from($table)->where('grono_type',$type)->order_by("id","asc")->get();
		return $query->result_array();
	}

	public function check_login($table,$data)
	{

		$query = $this->db->select("*")->from($table)->where($data)->get();
		return $query->row_array();
	}
	public function session_login($table,$data,$id)
	{
		$this->db->update($table,$data,"id = $id");
	}
	public function get_data_login($table,$session)
	{
		$query = $this->db->select("*")->from($table)->where('session_log',$session)->get();
		return $query->row_array();
	}

	/// function report data
	public function report_day($table,$day,$doc_in_out,$doc_cat)
	{
		///echo DATE(document.doc_date); $data = array('document.status'=>'show');
		$date = str_replace('/', '-', $day);
		$day_new = date("Y-m-d",strtotime($date));
		//echo $day_new;
		$data = array('document.status'=>'show', 'DATE(document.doc_date)' => $day_new, 'document.doc_in_out' => $doc_in_out, 'document.doc_type' => $doc_cat);
		//$data = array('user_id' => '1');
		$query = $this->db->select("*")->from($table)->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("doc_id","asc")->where($data)->get();
		return $query->result_array();

	}
	public function report_month($table,$month,$doc_in_out,$doc_cat)
	{
		$dm = explode("/", $month);

		$month_new = $dm[0];
		$year_new = $dm[1];
		//echo $month_new;
		$data = array('document.status'=>'show', 'MONTH(document.doc_date)' => $month_new, 'YEAR(document.doc_date)' => $year_new, 'document.doc_in_out' => $doc_in_out, 'document.doc_type' => $doc_cat);
		//$data = array('user_id' => '1');
		$query = $this->db->select("*")->from($table)->join('grono_doc', 'grono_doc.id = document.doc_type')->join('user', 'user.id = document.user_id')->order_by("doc_id","asc")->where($data)->get();
		return $query->result_array();
	}
	/// end report data
	*/

}