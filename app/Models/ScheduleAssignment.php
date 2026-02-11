<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\User;
use App\Models\ScheduleItem;

class ScheduleAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'schedule_item_id',
        'role',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scheduleItem()
    {
        return $this->belongsTo(ScheduleItem::class);
    }
}
