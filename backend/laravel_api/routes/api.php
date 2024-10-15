<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController as LoginController;
use App\Http\Controllers\Auth\RegisterController as RegisterController;
use App\Http\Controllers\Menu\MenuController;
use App\Http\Controllers\Satis\SatisController;
use App\Http\Controllers\Stok\KartlarVeReceteler\StokTanitimKartlari\StokTanitimKartiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');




Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/menu', [MenuController::class, 'index']);

    Route::get('/satisFaturaAnaliz', [SatisController::class, 'satisKontrolAnaliz']);
    
    Route::get('/stokTanitimKarti', [StokTanitimKartiController::class, 'index']);
});