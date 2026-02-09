<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MeScheduleController;
use App\Http\Controllers\MeEventDayController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/me/event-days', MeEventDayController::class);
Route::middleware('auth:sanctum')->get('/me/schedules', MeScheduleController::class);
