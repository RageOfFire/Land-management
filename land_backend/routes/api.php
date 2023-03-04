<?php

use App\Http\Controllers\OwnerController;
use App\Http\Controllers\LandController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\CostController;
use App\Http\Controllers\ModstatusController;
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

// Login

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
    
    ], function ($router) {
    
    Route::post('/login', [AuthController::class, 'login']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::post('/me', [AuthController::class, 'me']);

    });

// Home pages

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

// Owners

Route::get('/owners', [OwnerController::class, 'index']);

Route::post('/owners', [OwnerController::class, 'store']);

Route::get('/owners/{owner}', [OwnerController::class, 'show']);

Route::post('/owners/{owner}', [OwnerController::class, 'update']);

Route::delete('/owners/{owner}', [OwnerController::class, 'destroy']);

Route::get('/owners/search/{key}', [OwnerController::class, 'search']);

// Lands

Route::get('/lands', [LandController::class, 'index']);

Route::post('/lands', [LandController::class, 'store']);

Route::get('/lands/{land}', [LandController::class, 'show']);

Route::post('/lands/{land}', [LandController::class, 'update']);

Route::delete('/lands/{land}', [LandController::class, 'destroy']);

Route::get('/lands/search/{key}', [LandController::class, 'search']);

// Transactions

Route::get('/transactions', [TransactionController::class, 'index']);

Route::post('/transactions', [TransactionController::class, 'store']);

Route::get('/transactions/{transaction}', [TransactionController::class, 'show']);

Route::post('/transactions/{transaction}', [TransactionController::class, 'update']);

Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy']);

Route::get('/transactions/search/{key}', [TransactionController::class, 'search']);

// Statuses

Route::get('/statuses', [StatusController::class, 'index']);

Route::post('/statuses', [StatusController::class, 'store']);

Route::get('/statuses/{status}', [StatusController::class, 'show']);

Route::post('/statuses/{status}', [StatusController::class, 'update']);

Route::delete('/statuses/{status}', [StatusController::class, 'destroy']);

Route::get('/statuses/search/{key}', [StatusController::class, 'search']);

// Assets

Route::get('/assets', [AssetController::class, 'index']);

Route::post('/assets', [AssetController::class, 'store']);

Route::get('/assets/{asset}', [AssetController::class, 'show']);

Route::post('/assets/{asset}', [AssetController::class, 'update']);

Route::delete('/assets/{asset}', [AssetController::class, 'destroy']);

Route::get('/assets/search/{key}', [AssetController::class, 'search']);

// Contracts

Route::get('/contracts', [ContractController::class, 'index']);

Route::post('/contracts', [ContractController::class, 'store']);

Route::get('/contracts/{contract}', [ContractController::class, 'show']);

Route::post('/contracts/{contract}', [ContractController::class, 'update']);

Route::delete('/contracts/{contract}', [ContractController::class, 'destroy']);

Route::get('/contracts/search/{key}', [ContractController::class, 'search']);

// Costs

Route::get('/costs', [CostController::class, 'index']);

Route::post('/costs', [CostController::class, 'store']);

Route::get('/costs/{cost}', [CostController::class, 'show']);

Route::post('/costs/{cost}', [CostController::class, 'update']);

Route::delete('/costs/{cost}', [CostController::class, 'destroy']);

Route::get('/costs/search/{key}', [CostController::class, 'search']);

// Modstatuses

Route::get('/modstatuses', [ModstatusController::class, 'index']);

Route::post('/modstatuses', [ModstatusController::class, 'store']);

Route::get('/modstatuses/{modstatus}', [ModstatusController::class, 'show']);

Route::post('/modstatuses/{modstatus}', [ModstatusController::class, 'update']);

Route::delete('/modstatuses/{modstatus}', [ModstatusController::class, 'destroy']);

Route::get('/modstatuses/search/{key}', [ModstatusController::class, 'search']);