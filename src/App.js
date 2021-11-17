import React from 'react';
import { ChainId, DAppProvider } from "@usedapp/core"
import Navbar from './Navbar'
import Main from './Main'

const App = (props) => {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan, ChainId.Rinkeby, ChainId.Mainnet, ChainId.Ropsten],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>
    <Navbar />
    <Main />
    </DAppProvider>
  )
}

export default App;