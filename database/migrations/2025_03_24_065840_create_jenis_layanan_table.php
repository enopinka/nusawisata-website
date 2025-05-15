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
        Schema::create("jenis_layanan", function (Blueprint $table) {
            $table->id("id_jenis_layanan");
            $table->timestamps();
            $table
                ->foreignId("id_destinasi")
                ->constrained(table: "destinasi", column: "id_destinasi")
                ->cascadeOnDelete();
            $table->string("title");
            $table->string("description");
            $table->unsignedInteger("price");
            $table->string("image");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("jenis_layanan");
    }
};
