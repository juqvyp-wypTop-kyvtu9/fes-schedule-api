<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        return $this->hasMany(\App\Models\ScheduleItem::class);
    }
}
