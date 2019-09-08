<?php

namespace App\Http\Controllers;

use App\Record;
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
            'data' => Crypt::encrypt($request->data),
            'password' => $request->password ? Hash::make($request->password) : null,
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
        $request->merge([
            'data' => Crypt::encrypt($request->data),
        ]);

        $record->update($request->only([
            'name',
            'data',
        ]));

        return new Resource($record);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Record  $record
     * @return \Illuminate\Http\Response
     */
    public function destroy(Record $record)
    {
        $record->delete();

        return response(null, 204);
    }
}
