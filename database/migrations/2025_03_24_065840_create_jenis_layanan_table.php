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
        Schema::create('jenis_layanan', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId("destinasi_id")->constrained('destinasi')->onDelete('cascade');
            $table->string("title");
            $table->string("description");
            $table->unsignedInteger("price");
            $table->string('image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jenis_layanan');
    }
};
