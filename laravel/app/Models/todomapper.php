<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class todomapper extends Model
{
    use HasFactory;
    protected $table = 'todo_user_mapping';
    protected $fillable = ['todo_id','shared_by','shared_with'];
}
