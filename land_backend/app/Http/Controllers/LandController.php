<?php

namespace App\Http\Controllers;

use App\Models\Land;
use Illuminate\Http\Request;

class LandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lands = Land::paginate(10);
        return response()->json($lands);
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
            'address' => 'required',
            'area_decimal' => 'required',
            'use_plans' => 'required',
            'value' => 'required',
            'owner_id' => 'required'
        ]);
        $land = Land::create($request->all());
        return response()->json(['message'=> 'land created', 
        'land' => $land]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Land  $land
     * @return \Illuminate\Http\Response
     */
    public function show(Land $land)
    {
        return $land;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Land  $land
     * @return \Illuminate\Http\Response
     */
    public function edit(Land $land)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Land  $land
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Land $land)
    {
        $request->validate([
            'address' => 'required',
            'area_decimal' => 'required',
            'use_plans' => 'required',
            'value' => 'required',
            'owner_id' => 'required'
        ]);
        $land->address = $request->input('address');
        $land->area_decimal = $request->input('area_decimal');
        $land->use_plans = $request->input('use_plans');
        $land->value = $request->input('value');
        $land->owner_id = $request->input('owner_id');
        $land->save();

        return response()->json([
            'message' => 'land updated!',
            'land' => $land
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Land  $land
     * @return \Illuminate\Http\Response
     */
    public function destroy(Land $land)
    {
        $land->delete();
        return response()->json([
            'message' => 'land deleted'
        ]);
    }
    public function search($key) {
        $lands = Land::where('address', 'LIKE', "%".$key."%")
        ->orWhere('area_decimal','LIKE',"%".$key."%")
        ->orWhere('use_plans','LIKE',"%".$key."%")
        ->orWhere('value','LIKE',"%".$key."%")
        ->get();
        return response()->json($lands);
    }
}
