<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EventDay;
use App\Models\ScheduleItem;

class Event extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];
    public function days()
    {
        return $this->hasMany(EventDay::class);
    }
    public function scheduleItems()
    {
        return $this->hasManyThrough(ScheduleItem::class, EventDay::class);
    }

    // シフト＝スケジュールアイテム
    public function shifts()
    {
        return $this->hasManyThrough(ScheduleItem::class, EventDay::class);
    }
}
