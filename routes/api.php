<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MeScheduleController;
use App\Http\Controllers\MeEventDayController;
use App\Http\Controllers\EventShiftController;
use App\Http\Controllers\EventController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum')->get('/me/event-days', MeEventDayController::class);
// Route::middleware('auth:sanctum')->get('/me/schedules', MeScheduleController::class);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me/event-days', MeEventDayController::class);
    Route::get('/me/schedules', MeScheduleController::class);
    Route::get('/events/{event}/shifts', [EventShiftController::class, 'index']);
    Route::get('/events/{event}/my-shifts', [EventShiftController::class, 'myShifts']);
    Route::get('/events', [EventController::class, 'index']);
});