<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\todoController;
use \App\Http\Controllers\AuthenticationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/todo/list',[App\Http\Controllers\todoController::class,'list']);
Route::post('/todo/user/list',[App\Http\Controllers\todoController::class,'userList']);
Route::post('/todo/user/share',[App\Http\Controllers\todoController::class,'share']);
Route::post('/todo/save',[App\Http\Controllers\todoController::class,'store']);
Route::patch('/todo/update/{todo}',[App\Http\Controllers\todoController::class, 'update']);
Route::patch('/todo/update/status/{todo}',[App\Http\Controllers\todoController::class, 'updateStatus']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [App\Http\Controllers\AuthenticationController::class,'login']);
Route::post('/register', [App\Http\Controllers\AuthenticationController::class,'register']);
Route::post('/logout', [App\Http\Controllers\AuthenticationController::class,'logout']);
//Route::get('/user',[App\Http\Controllers\AuthenticationController::class,'user']);



