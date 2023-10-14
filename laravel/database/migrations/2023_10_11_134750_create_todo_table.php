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
        Schema::create('todo', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('msg');
            $table->enum('status', array('1', '0', '2','3'));
            $table->integer('created_by');
            // 1->active todo, 0->deleted, 2->marked as completed, 3->extra if required as completed please note that i have kelp 1 at first place in the array which denotes it is a default value
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
        Schema::dropIfExists('todo');
    }
};
