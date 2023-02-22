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
        Schema::create('modstatuses', function (Blueprint $table) {
            $table->id('mod_id');
            $table->unsignedBigInteger('land_id');
            $table->foreign('land_id')->references('land_id')->on('lands');
            $table->dateTime('mod_date')->nullable();
            $table->string('mod_info')->nullable();
            $table->string('mod_name')->nullable();
            $table->text('mod_reason')->nullable();
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
        Schema::dropIfExists('modstatuses');
    }
};
