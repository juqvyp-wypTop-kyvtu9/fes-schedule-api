<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Event;
use App\Models\EventDay;
use App\Models\ScheduleItem;
use App\Models\ScheduleAssignment;

$user = User::where('email', 'test@example.com')->first();
if ($user) {
    // イベントを作成
    $event = Event::firstOrCreate(
        ['name' => 'テストイベント'],
        ['description' => '検証用のテストイベント']
    );
    
    // イベント日を作成
    $eventDay1 = EventDay::firstOrCreate(
        ['event_id' => $event->id, 'date' => '2026-03-15'],
        ['label' => '春祭り']
    );
    
    $eventDay2 = EventDay::firstOrCreate(
        ['event_id' => $event->id, 'date' => '2026-03-16'],
        ['label' => '文化祭']
    );
    
    // スケジュール項目を作成
    $scheduleItem1 = ScheduleItem::firstOrCreate(
        ['event_day_id' => $eventDay1->id, 'start_time' => '10:00:00'],
        [
            'end_time' => '12:00:00',
            'title' => 'オープニングセレモニー',
            'location' => 'メインステージ',
            'type' => 'ceremony',
        ]
    );
    
    $scheduleItem2 = ScheduleItem::firstOrCreate(
        ['event_day_id' => $eventDay1->id, 'start_time' => '14:00:00'],
        [
            'end_time' => '16:00:00',
            'title' => 'ライブパフォーマンス',
            'location' => 'メインステージ',
            'type' => 'performance',
        ]
    );
    
    $scheduleItem3 = ScheduleItem::firstOrCreate(
        ['event_day_id' => $eventDay2->id, 'start_time' => '09:00:00'],
        [
            'end_time' => '11:00:00',
            'title' => 'フードコート営業',
            'location' => 'グラウンド',
            'type' => 'food',
        ]
    );
    
    // ユーザーをスケジュール項目に割り当てる
    ScheduleAssignment::firstOrCreate(
        ['user_id' => $user->id, 'schedule_item_id' => $scheduleItem1->id],
        ['role' => 'staff', 'status' => 'scheduled']
    );
    
    ScheduleAssignment::firstOrCreate(
        ['user_id' => $user->id, 'schedule_item_id' => $scheduleItem2->id],
        ['role' => 'staff', 'status' => 'scheduled']
    );
    
    ScheduleAssignment::firstOrCreate(
        ['user_id' => $user->id, 'schedule_item_id' => $scheduleItem3->id],
        ['role' => 'staff', 'status' => 'scheduled']
    );
    
    $days = EventDay::all();
    echo 'Created ' . $days->count() . ' event days' . PHP_EOL;
    foreach ($days as $day) {
        echo '- ' . $day->date . ': ' . $day->label . ' (' . $day->scheduleItems()->count() . ' schedule items)' . PHP_EOL;
    }
    
    echo PHP_EOL . 'User ' . $user->email . ' has been assigned to schedules' . PHP_EOL;
} else {
    echo 'User not found' . PHP_EOL;
}
