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

Route::view('/', 'welcome');

Route::post('/test', function(Request $request) {
    $lat = $request->lat;
    $lng = $request->lng;

    for ($i=0; $i<10; $i++) {
        $lat  += 0.00001;
        $lng  += 0.00001;
        event(new MarkerLocationChangedEvent($lat, $lng));
        sleep(1);
    }

    return response()->json('OK');
});
