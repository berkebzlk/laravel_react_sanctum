<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/**
 * FUNCTIONS
 */

if (!function_exists('getRemoteDb')) {
    function getRemoteDb() {
        return 'MikroDB_V16_ARGESIM2024';
    }
}

if (!function_exists('getQuery')) {
    function getQuery($sql) {
        $res = DB::select($sql);

        return $res;
    }
}

/**
 * FUNCTIONS END
 */