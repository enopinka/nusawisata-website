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
        Schema::create("kendaraan", function (Blueprint $table) {
            $table->id("id_kendaraan");
            $table->timestamps();
            $table
                ->foreignId("id_jenis_kendaraan")
                ->constrained(
                    table: "jenis_kendaraan",
                    column: "id_jenis_kendaraan"
                )
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
        Schema::dropIfExists("kendaraan");
    }
};
