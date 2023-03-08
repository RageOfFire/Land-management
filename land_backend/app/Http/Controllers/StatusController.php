<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $status = Status::paginate(10);
        return response()->json($status);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'land_id' => 'required',
            'status_charge' => 'required',
            'old_status' => 'nullable',
            'new_status' => 'nullable'
        ]);
        $status = Status::create($request->all());
        return response()->json(['message'=> 'status created', 
        'status' => $status]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function show(Status $status)
    {
        return $status;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function edit(Status $status)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Status $status)
    {
        $request->validate([
            'land_id' => 'required',
            'status_charge' => 'required',
            'old_status' => 'nullable',
            'new_status' => 'nullable'
        ]);
        $status->land_id = $request->input('land_id');
        $status->status_charge = $request->input('status_charge');
        $status->old_status = $request->input('old_status');
        $status->new_status = $request->input('new_status');
        $status->save();

        return response()->json([
            'message' => 'status updated!',
            'status' => $status
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Status  $status
     * @return \Illuminate\Http\Response
     */
    public function destroy(Status $status)
    {
        $status->delete();
        return response()->json([
            'message' => 'status deleted'
        ]);
    }
    public function search($key) {
        $status = Status::where('status_charge', 'LIKE', "%".$key."%")
        ->orWhere('old_status','LIKE',"%".$key."%")
        ->orWhere('new_status','LIKE',"%".$key."%")
        ->get();
        return response()->json($status);
    }
}
