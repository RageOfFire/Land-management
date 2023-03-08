<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contract = Contract::paginate(10);
        return response()->json($contract);
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
            'contract_start' => 'required',
            'contract_end' => 'required',
            'use_plans' => 'required',
            'value' => 'required'
        ]);
        $contract = Contract::create($request->all());
        return response()->json(['message'=> 'contract created', 
        'contract' => $contract]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function show(Contract $contract)
    {
        return $contract;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function edit(Contract $contract)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contract $contract)
    {
        $request->validate([
            'land_id' => 'required',
            'contract_start' => 'required',
            'contract_end' => 'required',
            'use_plans' => 'required',
            'value' => 'required'
        ]);
        $contract->land_id = $request->input('land_id');
        $contract->contract_start = $request->input('contract_start');
        $contract->contract_end = $request->input('contract_end');
        $contract->use_plans = $request->input('use_plans');
        $contract->value = $request->input('value');
        $contract->save();

        return response()->json([
            'message' => 'contract updated!',
            'contract' => $contract
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contract  $contract
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contract $contract)
    {
        $contract->delete();
        return response()->json([
            'message' => 'contract deleted'
        ]);
    }
    public function search($key) {
        $contract = Contract::where('use_plans', 'LIKE', "%".$key."%")
        ->orWhere('value','LIKE',"%".$key."%")
        ->get();
        return response()->json($contract);
    }
}
