<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\ScheduleItem;

class EventShiftController extends Controller
{
    public function index(Event $event)
    {
        // シフト（スケジュールアイテム）と担当ユーザー情報も返す
        return $event->shifts()
            ->with(['users'])
            ->orderBy('start_time')
            ->get();
    }

    public function myShifts(Event $event, Request $request)
    {
        $user = $request->user();

        $items = $event->shifts()
            ->whereHas('users', fn ($q) => $q->whereKey($user->id))
            ->with([
                'day',
                'users' => fn ($q) => $q->whereKey($user->id)->withPivot(['role', 'status']),
            ])
            ->orderBy('start_time')
            ->get()
            ->map(function (ScheduleItem $item) {
                $u = $item->users->first();

                return [
                    'id' => $item->id,
                    'event_day_id' => $item->event_day_id,
                    'date' => $item->day?->date?->format('Y-m-d'),
                    'label' => $item->day?->label,
                    'start_time' => $item->start_time,
                    'end_time' => $item->end_time,
                    'title' => $item->title,
                    'description' => $item->description,
                    'location' => $item->location,
                    'type' => $item->type,
                    'manual_url' => $item->manual_url,
                    'role' => $u?->pivot?->role,
                    'status' => $u?->pivot?->status,
                ];
            });

        return response()->json($items);
    }
}
