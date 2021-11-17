import React from 'react';
import { useEthers, useEtherBalance} from "@usedapp/core"
import { formatUnits } from "@ethersproject/units";

const Navbar = (props) => {

  /*
  using this for getting imformation ile account and 
  functions like activate and deactivate
  */
	const { account, activateBrowserWallet, deactivate} = useEthers()

  /* 
  defining if the account is connected
  */
  const isConnected = account !== undefined

  /*
  getting eth balance
  */
  const tokenBalance = useEtherBalance(account);

  /*
  formatting eth balance because javascript cant handle 18 decimalse
  */
  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;


  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <div class="navbar-brand" >ETH Wallet</div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="d-flex my-3">
        {isConnected ? (
        <>
          <button  class="btn btn-danger mx-2" onClick={deactivate}>
            Disconnect
          </button>
        </>
      ) : (
        <button
 		class="btn btn-success"
          onClick={() => activateBrowserWallet()}
        >
          Connect
        </button>
      )}
      </div>
    </div>
  </div>
</nav>
{isConnected ? (
  <div>
<div class="container mt-4">
  My Address: <span class="badge badge-lg  bg-primary text-light">{account}</span>
</div>

<div class="container mt-4">
  My Balance: <span class="badge badge-lg  bg-primary text-light">{`${formattedTokenBalance}`}</span>
</div>
</div>
  ):(
  <div></div>
  )}

    </>
  )
}

export default Navbar;