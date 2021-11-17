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
<table class="table table-success my-4">
  <thead>
    <tr>
      <th scope="col">Sr</th>
      <th scope="col">Value</th>
      <th scope="col">To</th>
      <th scope="col">Tx Hash</th>
    </tr>
  </thead>
  <tbody>
	{transactions.map((transaction, index) => (
	<tr>
      <th scope="row">{index}</th>
      <td>{`${parseFloat(formatUnits(transaction.transaction.value, 18))}`}</td>
      <td>{`${transaction.transaction.to?.slice(0, 9)}...${transaction.transaction.to?.slice(-4)}`}</td>
      <td>{`${transaction.transaction.hash?.slice(0, 9)}...${transaction.transaction.hash?.slice(-4)}`}</td>
    </tr>
      ))}
      </tbody>
</table>

</div>
  )
}

export default Main;