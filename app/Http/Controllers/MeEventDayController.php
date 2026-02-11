<?php

namespace App\Http\Controllers;

use App\Models\EventDay;
use Illuminate\Http\Request;

class MeEventDayController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'event_id' => ['nullable', 'integer', 'exists:events,id'],
        ]);

        $user = $request->user();

        $query = EventDay::query()
            ->when(isset($validated['event_id']), function ($q) use ($validated) {
                $q->where('event_id', $validated['event_id']);
            })
            ->whereHas('scheduleItems.users', function ($q) use ($user) {
                $q->whereKey($user->id);
            })
            ->with('event:id,name')
            ->orderBy('date');

        $eventDays = $query->get(['id', 'event_id', 'date', 'label']);

        return $eventDays->map(function (EventDay $day) {
            return [
                'id' => $day->id,
                'event_id' => $day->event_id,
                'date' => $day->date->format('Y-m-d'),
                'label' => $day->label,
                'event_name' => $day->event->name ?? null,
            ];
        });
    }
}
