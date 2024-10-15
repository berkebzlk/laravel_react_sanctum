<?php

use Illuminate\Support\Facades\Route;

Route::get('/ppinfo', function () {
    return phpinfo();
});
