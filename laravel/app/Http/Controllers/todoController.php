<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\todo;
use App\Models\User;
use App\Models\todomapper;
use App\Http\Requests\todoRequest;
use Illuminate\Support\Facades\Auth;

class todoController extends Controller
{
	/* 
		Name : Nishant Shingade
		Description : As name suggests this function will give us all the To Do Items available in the system
		Date Created : 11-10-2023
        Modified Date : 11-10-2023
	*/
    public function list(Request $request){
        $data =array();
        $data['userTodoList']= todo::where('created_by','=',$request->id)->orderByDesc('id')->get(['id','title','msg','status','created_by']);
        $data['sharedWithUserTodoList'] = todomapper::select('*')
            ->where('todo_user_mapping.shared_with','=',$request->id)
            ->join('users', 'users.id', '=', 'todo_user_mapping.shared_by')
            ->join('todo', 'todo.id', '=', 'todo_user_mapping.todo_id')->get();
        return response()->json($data);
    }

    /* 
		Name : Nishant Shingade
		Description : This function will store the Model in the database. Please note that Artisan Request is used for validation with bail
		Date Created : 11-10-2023
        Modified Date : 11-10-2023
	*/
    public function store(todoRequest $request){
    	return $request->validated() ? response()->json(todo::create($request->validated())) : $request->validated();
    }

    /* 
		Name : Nishant Shingade
		Description : This function will Update the Model in the database.
		Date Created : 11-10-2023
        Modified Date : 11-10-2023
	*/
    public function update(todoRequest $request,todo $todo){
    	return $request->validated() ? response()->json($todo->update($request->validated())) : $request->validated();
    }

    /* 
		Name : Nishant Shingade
		Description : This function is used for both updating the status to marked as completed and deleting the record
		Date Created : 11-10-2023
        Modified Date : 11-10-2023
	*/
    public function updateStatus(Request $request,todo $todo){
    	return response()->json($todo->update($request->all()));
    }


    public function userList(Request $request){
        return response()->json(User::all()->except($request->user));
    }

    public function share(Request $request){
        try {
            $shared_by = isset($request->data['todoData']['created_by']) ? $request->data['todoData']['created_by'] : 0;
            $todoId = isset($request->data['todoData']['id']) ? $request->data['todoData']['id'] : 0;
            if(isset($request->data['shareWith']) && count($request->data['shareWith']) > 0 && $shared_by!=0 && $todoId!=0 ){
                foreach($request->data['shareWith'] as $eachUser){
                    $data = array();
                    $data['todo_id'] = $todoId;
                    $data['shared_by'] = $shared_by;
                    $data['shared_with'] = $eachUser;
                    todomapper::create($data);
                }
                return response()->json('shared');
            }else{
                response()->json('Something went wrong');
            }
        }catch (Exception $e) {
            return $e->getMessage();
        }
    }
}