import React, {useState, useEffect} from 'react';
import {useSendTransaction, useTransactions} from '@usedapp/core';
import {ethers} from 'ethers'
import { formatUnits } from "@ethersproject/units";

const Main = (props) => {
	
	const [disabled, setDisabled] = useState(true);
    const [amount, setAmount] = useState(0);
    const [address, setAddress] = useState('')
	const { sendTransaction, state } = useSendTransaction()
	const { transactions } = useTransactions()

	useEffect(() => {
  if (state.status !== 'Mining') {
    setDisabled(false)
    setAmount('0')
    setAddress('')
  }
}, [state])


const handleClick = () => {
  setDisabled(true)
  sendTransaction({ to: address, value: ethers.utils.parseEther(amount) })
}

  return (
    <>
<div class="container my-4">
    
	<div>{disabled}</div>
    <div class="m-auto">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Address</label>
    <input  onChange={(e) => setAddress(e.target.value)} value={address} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Amount to send in ETH</label>
    <input onChange={(e) => setAmount(e.target.value)} value={amount} class="form-control" id="exampleInputPassword1" />
  </div>
  <button onClick={(e) => handleClick()} class="btn btn-primary">Send</button>
</div>
</div>

<table class="table table-success container" style={{maxWidth:"90%"}}>
  <thead>
    <tr>
    <th style={{fontSize:"12px"}} scope="col">Sr</th>
      <th style={{fontSize:"12px"}} scope="col">Value</th>
      <th style={{fontSize:"12px"}} scope="col">To</th>
      <th style={{fontSize:"12px"}} scope="col">Tx Hash</th>
    </tr>
  </thead>
  <tbody>
  {transactions.map((transaction, index) => (
  <tr> 
      <td style={{fontSize:"12px"}}>{index}</td>
      <td style={{fontSize:"12px"}}>{parseFloat(formatUnits(transaction.transaction.value, 18))}</td>
      <td style={{fontSize:"12px"}}>{transaction.transaction.to}</td>
      <td style={{fontSize:"12px"}}>{transaction.transaction.hash}</td>
    </tr>
      ))}
      </tbody>
</table>
</>
  )
}

export default Main;