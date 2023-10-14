<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class todo extends Model
{
    use HasFactory;
    protected $table = 'todo';
    protected $guarded = [];
    public function setStatusAttribute($value){
			$this->attributes['status'] = (string)$value;
	}

	public function getStatusAttribute($value){
		return [
			0 => 'Deleted',
			1=>'Active',
			2=>'Completed',
			3=>'Extra'
			][$value];
	}
}
