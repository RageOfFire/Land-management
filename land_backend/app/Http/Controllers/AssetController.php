<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $asset = Asset::all();
        return response()->json($asset);
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
            'home' => 'nullable',
            'construction' => 'nullable',
            'road' => 'nullable'
        ]);
        $asset = Asset::create($request->all());
        return response()->json(['message'=> 'asset created', 
        'asset' => $asset]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function show(Asset $asset)
    {
        return $asset;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function edit(Asset $asset)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Asset $asset)
    {
        $request->validate([
            'land_id' => 'required',
            'home' => 'nullable',
            'construction' => 'nullable',
            'road' => 'nullable'
        ]);
        $asset->land_id = $request->input('land_id');
        $asset->home = $request->input('home');
        $asset->construction = $request->input('construction');
        $asset->road = $request->input('road');
        $asset->save();

        return response()->json([
            'message' => 'asset updated!',
            'asset' => $asset
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function destroy(Asset $asset)
    {
        $asset->delete();
        return response()->json([
            'message' => 'asset deleted'
        ]);
    }
    public function search($key) {
        $asset = Asset::where('home', 'LIKE', "%".$key."%")
        ->orWhere('construction','LIKE',"%".$key."%")
        ->orWhere('road','LIKE',"%".$key."%")
        ->get();
        return response()->json($asset);
    }
}
