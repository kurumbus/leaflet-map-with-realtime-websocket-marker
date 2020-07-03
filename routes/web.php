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

Route::get('/api/markers', function(Request $request) {
    $faker = Faker\Factory::create();

    return response()->json([
        [
            'id' => 1,
            'position' => [
                'lat' =>  49.4185511,
                'lng' =>  8.67669,
            ],
            'id_client' =>1,
            'battery' => 1,
            'info' => 'Vehicle: '.$faker->word.', Operator: '.$faker->name,
        ],
        [
            'id' => 2,
            'position' => [
                'lat' =>  49.4185534,
                'lng' =>  8.67690,
            ],
            'id_client' =>1,
            'battery' => 0,
            'info' => 'Vehicle: '.$faker->word.', Operator: '.$faker->name,
        ],
        [
            'id' => 3,
            'position' => [
                'lat' =>  49.4186634,
                'lng' =>  8.67688,
            ],
            'id_client' =>1,
            'battery' => 2,
            'info' => 'Vehicle: '.$faker->word.', Operator: '.$faker->name,
        ],
    ]);
});

Route::post('/test', function(Request $request) {
    $faker = Faker\Factory::create();
    $lat = $request->lat;
    $lng = $request->lng;

    for ($i=0; $i<10; $i++) {
        $lat  += 0.00001;
        $lng  += 0.00001;
        $data = [
            'lat' => $lat,
            'lng' => $lng,
            'id_client' =>1,
            'battery' => 2,
            'info' => 'Vehicle: '.$faker->word.', Operator: '.$faker->name,
        ];
        event(new MarkerLocationChangedEvent(random_int(1,3), $data));
        sleep(1);
    }

    return response()->json('OK');
});
