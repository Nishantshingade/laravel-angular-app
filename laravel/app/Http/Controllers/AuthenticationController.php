<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\loginRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\registerRequest;


class AuthenticationController extends Controller
{
    public function login(loginRequest $request){
    	$loginCreds = $request->only('email','password');
    	if(!Auth::attempt($loginCreds)){
    		return response()->json(['msg'=>'Unauthorized'],401);
    	}
    	$user = Auth::user();
    	$token = $user->createToken($user->name);
    	return response()->json([
    			'id' => $user->id,
    			'name' => $user->name,
    			'email' => $user->email,
    			'token' => $token->accessToken,
    			'token_expire_at' => $token->token->expires_at,
    			'msg'=>'Authorized'],200);
    }

    public function user(Request $request){
    	dd($request->bearerToken());
    }

    public function register(registerRequest $request){
    	return $request->validated() ? response()->json(User::create($request->validated())) : $request->validated();
    }
}
