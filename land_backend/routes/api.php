<?php

use App\Http\Controllers\OwnerController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return  response()->json(array("token"=>$token));
});

Route::post('/users/login', [UsersController::class, 'login'])->name('login');

Route::post('/users', [UsersController::class, 'store']);

Route::get('/owners', [OwnerController::class, 'index']);

Route::post('/owners', [OwnerController::class, 'store']);

Route::get('/owners/{owner}', [OwnerController::class, 'show']);

Route::post('/owners/{owner}', [OwnerController::class, 'update']);

Route::delete('/owners/{owner}', [OwnerController::class, 'destroy']);

Route::get('/search',[OwnerController::class,'search']);