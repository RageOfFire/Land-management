<?php

namespace App\Http\Controllers;

use App\Models\Cost;
use Illuminate\Http\Request;

class CostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cost = Cost::paginate(10);
        return response()->json($cost);
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
            'service_cost' => 'nullable',
            'maintenance_cost' => 'nullable',
            'manage_cost' => 'nullable'
        ]);
        $cost = Cost::create($request->all());
        return response()->json(['message'=> 'cost created', 
        'cost' => $cost]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cost  $cost
     * @return \Illuminate\Http\Response
     */
    public function show(Cost $cost)
    {
        return $cost;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cost  $cost
     * @return \Illuminate\Http\Response
     */
    public function edit(Cost $cost)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cost  $cost
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cost $cost)
    {
        $request->validate([
            'land_id' => 'required',
            'service_cost' => 'nullable',
            'maintenance_cost' => 'nullable',
            'manage_cost' => 'nullable'
        ]);
        $cost->land_id = $request->input('land_id');
        $cost->service_cost = $request->input('service_cost');
        $cost->maintenance_cost = $request->input('maintenance_cost');
        $cost->manage_cost = $request->input('manage_cost');
        $cost->save();

        return response()->json([
            'message' => 'cost updated!',
            'cost' => $cost
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cost  $cost
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cost $cost)
    {
        $cost->delete();
        return response()->json([
            'message' => 'cost deleted'
        ]);
    }
    public function search($key) {
        $cost = Cost::where('service_cost', 'LIKE', "%".$key."%")
        ->orWhere('maintenance_cost','LIKE',"%".$key."%")
        ->orWhere('manage_cost','LIKE',"%".$key."%")
        ->get();
        return response()->json($cost);
    }
}
