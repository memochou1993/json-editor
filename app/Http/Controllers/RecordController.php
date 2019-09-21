<?php

namespace App\Http\Controllers;

use App\Record;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use App\Http\Requests\RecordRequest as Request;
use App\Http\Resources\RecordResource as Resource;

class RecordController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\RecordRequest  $request
     * @return \App\Http\Resources\RecordResource
     */
    public function store(Request $request)
    {
        $request->merge([
            'data' => Crypt::encrypt(json_encode($request->data)),
        ]);

        $request->password && $request->merge([
            'password' => Hash::make($request->password),
        ]);

        $record = Record::create($request->all());

        return new Resource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Record  $record
     * @return \App\Http\Resources\RecordResource
     */
    public function show(Record $record)
    {
        if ($record->expires_in) {
            if (Carbon::now()->diffInSeconds(new Carbon($record->created_at)) > $record->expires_in) {
                abort(404);
            }
        }

        return new Resource($record);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\RecordRequest  $request
     * @param  \App\Record  $record
     * @return \App\Http\Resources\RecordResource
     */
    public function update(Request $request, Record $record)
    {
        $request->data && $request->merge([
            'data' => Crypt::encrypt(json_encode($request->data)),
        ]);

        $record->update([
            'name' => $request->name ?? $record->name,
            'data' => $request->data ?? $record->data,
        ]);

        return new Resource($record);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Requests\RecordRequest  $request
     * @param  \App\Record  $record
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Record $record)
    {
        if ($record->password) {
            if (! Hash::check($request->password, $record->password)) {
                abort(403);
            }
        }

        $record->delete();

        return response(null, 204);
    }

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
