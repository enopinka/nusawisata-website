<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller {
  public function index(){
    return Inertia::render("Admin/Login");
  }

  public function authenticate (Request $request){
    $credentials = $request->validate([
      'email'=>['required', 'email'],
      'password'=>['required']
    ]);

    if (Auth::attempt($credentials)){
      
      $request->session()->regenerate();

      return Inertia::location('/admin/dashboard');

    }

    return back()->withErrors([
      'password'=> 'Password salah'
    ])->onlyInput('password');
  }

  public function unauthenticate(Request $request){
    Auth::logout(); 

        $request->session()->invalidate(); 
        $request->session()->regenerateToken();

        return Inertia::location('/admin/login'); 
  }
}