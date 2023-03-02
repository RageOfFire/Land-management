<?php

namespace App\Http\Controllers;

use App\Models\Owner;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $owners = Owner::all();
        return response()->json($owners);
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
            'name' => 'required',
            'address' => 'required',
            'phone_number' => 'required',
            'email' => 'nullable'
        ]);
        $owner = Owner::create($request->all());
        return response()->json(['message'=> 'owner created', 
        'owner' => $owner]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Owner  $owner
     * @return \Illuminate\Http\Response
     */
    public function show(Owner $owner)
    {
        return $owner;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Owner  $owner
     * @return \Illuminate\Http\Response
     */
    public function edit(Owner $owner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Owner  $owner
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Owner $owner)
    {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
            'phone_number' => 'required',
            'email' => 'nullable'
        ]);
        $owner->name = $request->input('name');
        $owner->address = $request->input('address');
        $owner->phone_number = $request->input('phone_number');
        $owner->email = $request->input('email');
        $owner->save();

        return response()->json([
            'message' => 'owner updated!',
            'owner' => $owner
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Owner  $owner
     * @return \Illuminate\Http\Response
     */
    public function destroy(Owner $owner)
    {
        $owner->delete();
        return response()->json([
            'message' => 'owner deleted'
        ]);
    }
    public function search($key) {
        $owners = Owner::where('name', 'LIKE', "%".$key."%")
        ->orWhere('address','LIKE',"%".$key."%")
        ->orWhere('phone_number','LIKE',"%".$key."%")
        ->orWhere('email','LIKE',"%".$key."%")
        ->get();
        return response()->json($owners);
    }
}
