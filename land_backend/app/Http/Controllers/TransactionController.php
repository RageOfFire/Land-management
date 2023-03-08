<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transaction = Transaction::paginate(10);
        return response()->json($transaction);
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
            'transaction_date' => 'required',
            'value' => 'required',
            'owner_id' => 'required'
        ]);
        $transaction = Transaction::create($request->all());
        return response()->json(['message'=> 'transaction created', 
        'transaction' => $transaction]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        return $transaction;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        $request->validate([
            'transaction_date' => 'required',
            'value' => 'required',
            'owner_id' => 'required'
        ]);
        $transaction->transaction_date = $request->input('transaction_date');
        $transaction->value = $request->input('value');
        $transaction->owner_id = $request->input('owner_id');
        $transaction->save();

        return response()->json([
            'message' => 'transaction updated!',
            'transaction' => $transaction
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return response()->json([
            'message' => 'transaction deleted'
        ]);
    }
    public function search($key) {
        $transaction = Transaction::where('transaction_date', 'LIKE', "%".$key."%")
        ->orWhere('value','LIKE',"%".$key."%")
        ->get();
        return response()->json($transaction);
    }
}
