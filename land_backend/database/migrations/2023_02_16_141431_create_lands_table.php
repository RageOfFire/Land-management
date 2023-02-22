<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lands', function (Blueprint $table) {
            $table->id("land_id");
            $table->text('address');
            $table->decimal('area_decimal', 8, 2);
            $table->string('use_plans');
            $table->boolean('status');
            $table->decimal('value', 8, 2);
            $table->unsignedBigInteger('owner_id');
            $table->foreign('owner_id')->references('owner_id')->on('owners');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lands');
    }
};
