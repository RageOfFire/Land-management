<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Owner;

class UsersController extends Controller
{
    // private $apiToken;
    // public function __construct()
    // {
    // $this->apiToken = uniqid(base64_encode(Str::random(40)));
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $ownerlist = Owner::all()->get();
        // $owners = $ownerlist->count();
        // return $owners;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required',
        //     'email' => 'required|email|unique:users',
        //     'password' => 'required',
        //     'confirm_password' => 'required|same:password'
        // ]);
        // if($validator->fails()) {
        //     return response()->json(['error' => $validator->errors()], 401);
        // }
        // $Data = [
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password),
        //     'remember_token' => $request->token,
        //     'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
        //     'updated_at' => Carbon::now('Asia/Ho_Chi_Minh')
        // ];
        // $user = User::create($Data);
        // return response()->json(array("success"=> 1,"data"=>$Data ));

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function login(Request $request){ 
        //User check
    //     if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
    //     $user = Auth::user();
    //     //Setting login response 
    //     $success['token'] = $this->apiToken;
    //     $success['name'] =  $user->name;
    //       return response()->json([
    //         'status' => 'success',
    //         'data' => $success
    //       ]); 
    //     } else { 
    //       return response()->json([
    //         'status' => 'error',
    //         'data' => 'Unauthorized Access'
    //       ]); 
    //     } 
      }
}
