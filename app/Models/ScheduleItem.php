<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ScheduleItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_day_id',
        'start_time',
        'end_time',
        'title',
        'description',
        'location',
        'type',
        'manual_url',
    ];
    public function day()
    {
        return $this->belongsTo(EventDay::class, 'event_day_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'schedule_assignments')
            ->withPivot(['role', 'status'])
            ->withTimestamps();
    }
}

