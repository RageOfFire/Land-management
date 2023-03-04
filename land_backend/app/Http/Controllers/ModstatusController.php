<?php

namespace App\Http\Controllers;

use App\Models\Modstatus;
use Illuminate\Http\Request;

class ModstatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $modstatus = Modstatus::all();
        return response()->json($modstatus);
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
            'mod_date' => 'nullable',
            'mod_info' => 'nullable',
            'mod_name' => 'nullable',
            'mod_reason' => 'nullable'
        ]);
        $modstatus = ModStatus::create($request->all());
        return response()->json(['message'=> 'modstatus created', 
        'modstatus' => $modstatus]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Modstatus  $modstatus
     * @return \Illuminate\Http\Response
     */
    public function show(Modstatus $modstatus)
    {
        return $modstatus;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Modstatus  $modstatus
     * @return \Illuminate\Http\Response
     */
    public function edit(Modstatus $modstatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Modstatus  $modstatus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Modstatus $modstatus)
    {
        $request->validate([
            'land_id' => 'required',
            'mod_date' => 'nullable',
            'mod_info' => 'nullable',
            'mod_name' => 'nullable',
            'mod_reason' => 'nullable'
        ]);
        $modstatus->land_id = $request->input('land_id');
        $modstatus->mod_date = $request->input('mod_date');
        $modstatus->mod_info = $request->input('mod_info');
        $modstatus->mod_name = $request->input('mod_name');
        $modstatus->mod_reason = $request->input('mod_reason');
        $modstatus->save();

        return response()->json([
            'message' => 'modstatus updated!',
            'modstatus' => $modstatus
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Modstatus  $modstatus
     * @return \Illuminate\Http\Response
     */
    public function destroy(Modstatus $modstatus)
    {
        $modstatus->delete();
        return response()->json([
            'message' => 'modstatus deleted'
        ]);
    }
    public function search($key) {
        $modstatus = Modstatus::where('mod_info', 'LIKE', "%".$key."%")
        ->orWhere('mod_name','LIKE',"%".$key."%")
        ->orWhere('mod_reason','LIKE',"%".$key."%")
        ->get();
        return response()->json($modstatus);
    }
}
