<?php

use App\Events\MarkerLocationChangedEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/test', function(Request $request) {
    $lat = $request->lat;
    $lng = $request->lng;

    for ($i=0; $i<5; $i++) {
        $lat  += 0.00004;
        $lng  += 0.00004;
        event(new MarkerLocationChangedEvent($lat, $lng));
        sleep(2);
    }

    return response()->json('OK');
});
