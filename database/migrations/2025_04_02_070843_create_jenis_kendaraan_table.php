<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("jenis_kendaraan", function (Blueprint $table) {
            $table->id("id_jenis_kendaraan");
            $table->timestamps();
            $table->string("title");
            $table->string("description");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("jenis_kendaraan");
    }
};
