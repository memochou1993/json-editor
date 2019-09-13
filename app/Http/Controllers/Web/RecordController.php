<?php

namespace App\Http\Controllers\Web;

use App\Record;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;

class RecordController extends Controller
{
    /**
     * @param  \App\Record  $record
     * @return \Illuminate\Http\Response
     */
    public function response(Record $record)
    {
        if ($record->expires_in) {
            if (Carbon::now()->diffInSeconds(new Carbon($record->created_at)) > $record->expires_in) {
                abort(404);
            }
        }

        $data = json_decode(Crypt::decrypt($record->data));

        return response()->json($data);
    }

    /**
     * @param  \App\Record  $record
     * @return \Illuminate\Http\Response
     */
    public function download(Record $record)
    {
        if ($record->expires_in) {
            if (Carbon::now()->diffInSeconds(new Carbon($record->created_at)) > $record->expires_in) {
                abort(404);
            }
        }

        $data = json_decode(Crypt::decrypt($record->data));

        return response()->streamDownload(function () use ($data) {
            echo json_encode($data, JSON_PRETTY_PRINT).PHP_EOL;
        }, $record->name.'.json');
    }
}
