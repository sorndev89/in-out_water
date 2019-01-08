<?php 
defined('BASEPATH') OR exit('No direct script access allowed'); 
class Main extends CI_Controller {
	function __construct() {
		parent::__construct(); 
	} 
	public function index() {
		$year = $this->In_outv2->get_data_year("data_base_year"); 
		$nyear = $year->name; 
		$this->show_in_out = $this->In_outv2->show_data_docall_m("document",$nyear,date('m')); 
		$this->sh_hoffice = $this->In_outv2->show_data("heard_office"); 
		$this->sh_boffice = $this->In_outv2->show_data("brunch_office"); 
		$this->sh_uoffice = $this->In_outv2->show_data("unit_office"); 
		$this->sh_ooffice = $this->In_outv2->show_data("other_office"); 
		$this->used_year = $this->In_outv2->get_data_year("data_base_year"); 
		$this->load->view('top',$this); $this->load->view('main',$this); 
		$this->load->view('flooter',$this); 
	} 

}