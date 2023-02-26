<?php

use App\Http\Controllers\OwnerController;
use App\Http\Controllers\AuthController;
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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
    
    ], function ($router) {
    
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/me', [AuthController::class, 'me']);
    });


Route::get('/all', function() {
    // Owners
    $ownerList = \DB::table('owners')->get();
    $ownerCount = $ownerList->count();
    // Land
    $landList = \DB::table('lands')->get();
    $landCount = $landList->count();
    // Transaction
    $transactionList = \DB::table('transactions')->get();
    $transactionCount = $transactionList->count();
    // Status
    $statusList = \DB::table('statuses')->get();
    $statusCount = $statusList->count();
    // Asset
    $assetList = \DB::table('assets')->get();
    $assetCount = $assetList->count();
    // Contract
    $contractList = \DB::table('contracts')->get();
    $contractCount = $contractList->count();
    // Costs
    $costList = \DB::table('costs')->get();
    $costCount = $costList->count();
    // Mod status
    $modstatusList = \DB::table('modstatuses')->get();
    $modstatusCount = $modstatusList->count();
    $data = [
        [
            'name' => 'Chủ sở hữu',
            'count' => $ownerCount
        ],
        [
            'name' => 'Đất đai',
            'count' => $landCount
        ],
        [
            'name' => 'Giao dịch',
            'count' => $transactionCount
        ],
        [
            'name' => 'Lịch sử thay đổi trạng thái',
            'count' => $statusCount
        ],
        [
            'name' => 'Tài sản gắn liền',
            'count' => $assetCount
        ],
        [
            'name' => 'Hợp đồng',
            'count' => $contractCount
        ],
        [
            'name' => 'Biểu phí',
            'count' => $costCount
        ],
        [
            'name' => 'Lịch sử thay đổi',
            'count' => $modstatusCount
        ]
    ];
    return response($data);
});

// Route::post('/users', [UsersController::class, 'store']);

Route::get('/owners', [OwnerController::class, 'index']);

Route::post('/owners', [OwnerController::class, 'store']);

Route::get('/owners/{owner}', [OwnerController::class, 'show']);

Route::post('/owners/{owner}', [OwnerController::class, 'update']);

Route::delete('/owners/{owner}', [OwnerController::class, 'destroy']);

Route::get('/search',[OwnerController::class,'search']);