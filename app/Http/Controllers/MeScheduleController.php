<?php

namespace App\Http\Controllers;

use App\Models\ScheduleItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MeScheduleController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'event_day_id' => [
                'required',
                'integer',
                Rule::exists('event_days', 'id')->where(function ($q) use ($user) {
                    $q->whereExists(function ($sub) use ($user) {
                        $sub->selectRaw(1)
                            ->from('schedule_items')
                            ->join('schedule_assignments', 'schedule_assignments.schedule_item_id', '=', 'schedule_items.id')
                            ->whereColumn('schedule_items.event_day_id', 'event_days.id')
                            ->where('schedule_assignments.user_id', $user->id);
                    });
                }),
            ],
        ]); // validate() は失敗時に422(JSON)を返す [page:5]

        $eventDayId = $validated['event_day_id'];

        $items = ScheduleItem::query()
            ->where('event_day_id', $eventDayId)
            ->whereHas('users', fn ($q) => $q->whereKey($user->id))
            ->with(['users' => fn ($q) => $q->whereKey($user->id)->withPivot(['role', 'status'])])
            ->orderBy('start_time')
            ->get()
            ->map(function (ScheduleItem $item) {
                $u = $item->users->first();

                return [
                    'id' => $item->id,
                    'event_day_id' => $item->event_day_id,
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
