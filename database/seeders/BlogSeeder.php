<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        for ($a = 0; $a < 50; $a++) {
            Blog::create([
                'title' => 'Ini Judul Blog ' . ($a + 1),
                'content' => '<h1>Cara Memulai Hari dengan Produktif</h1> <p>Banyak orang ingin memulai hari dengan penuh energi dan produktivitas, tetapi sering kali merasa malas atau kurang fokus. Berikut beberapa cara yang bisa membantu Anda memulai hari dengan lebih baik.</p> <h2>1. Bangun Lebih Awal</h2> <p>Bangun pagi memberi Anda waktu lebih banyak untuk mempersiapkan diri, merencanakan hari, dan menikmati momen tenang sebelum kesibukan dimulai.</p> <h2>2. Lakukan Olahraga Ringan</h2> <p>Gerakan sederhana seperti stretching atau berjalan-jalan di pagi hari bisa membantu meningkatkan aliran darah, membuat tubuh lebih segar, dan pikiran lebih jernih.</p> <h2>3. Sarapan Sehat</h2> <p>Pastikan Anda mengisi energi dengan makanan yang bernutrisi, seperti buah-buahan, telur, atau oatmeal. Sarapan sehat membantu meningkatkan konsentrasi dan stamina.</p> <h2>4. Buat Daftar Prioritas</h2> <p>Menentukan tugas-tugas penting yang harus diselesaikan membantu Anda tetap fokus dan menghindari pemborosan waktu pada hal-hal kurang bermanfaat.</p> <h2>5. Hindari Gangguan Tidak Perlu</h2> <p>Matikan notifikasi media sosial atau kurangi waktu bermain gadget di pagi hari agar bisa lebih fokus pada rutinitas yang produktif.</p> <p>Dengan menerapkan kebiasaan-kebiasaan ini, Anda bisa memulai hari dengan penuh semangat dan produktivitas. Bagaimana kebiasaan pagi Anda selama ini?</p>',
                'image' => 'https://images.unsplash.com/photo-1726661025464-818c9abd6da9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            ]);
        }
    }
}
