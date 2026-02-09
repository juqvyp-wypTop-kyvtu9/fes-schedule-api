<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'schedule_item_id',
        'role',
        'status',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'schedule_assignments')
            ->withPivot(['role', 'status'])
            ->withTimestamps();
    }
}
