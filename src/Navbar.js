import React from 'react';
import { useEthers, useEtherBalance} from "@usedapp/core"
import { formatUnits } from "@ethersproject/units";

const Navbar = (props) => {

	const { account, activateBrowserWallet, deactivate} = useEthers()

  const isConnected = account !== undefined

  const tokenBalance = useEtherBalance(account);

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
          <button type="button" class="btn btn-primary mx-2">
            {`${account?.slice(0, 4)}...${account?.slice(-3)}`}
          </button>
          <button type="button" class="btn btn-warning mx-2">
            {`${formattedTokenBalance}`}
          </button>
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
    </>
  )
}

export default Navbar;