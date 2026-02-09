<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedule_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_day_id')->constrained()->cascadeOnDelete();

            $table->time('start_time');
            $table->time('end_time')->nullable();

            $table->string('title');
            $table->text('description')->nullable();
            $table->string('location')->nullable();

            $table->string('type'); 
            $table->string('manual_url')->nullable();

            $table->timestamps();

            $table->index(['event_day_id', 'start_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_items');
    }
};
