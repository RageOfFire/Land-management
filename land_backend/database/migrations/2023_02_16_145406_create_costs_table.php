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
        Schema::create('costs', function (Blueprint $table) {
            $table->id('cost_id');
            $table->unsignedBigInteger('land_id');
            $table->foreign('land_id')->references('land_id')->on('lands');
            $table->decimal('service_cost', 8, 2)->nullable();
            $table->decimal('maintenance_cost', 8, 2)->nullable();
            $table->decimal('manage_cost', 8, 2)->nullable();
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
        Schema::dropIfExists('costs');
    }
};
