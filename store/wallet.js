
export const state = () => ({
    initialized: false,
    dids: [],
    currentDid: '',
    defaultChain: '',
    walletConnectPresentationRequest: null
  })
  
export const mutations = {
    addDid(state, did) {
        state.dids.push(did)
    },
    removeDid(state, did) {
        state.list.splice(state.dids.indexOf(did), 1)
    },
    setCurrentDid(state, did) {
        state.currentDid = did
        localStorage.setItem('default_did', did)
    },
    setWalletConnectPresentationRequest(state, presentationRequest) {
      console.log("WalletConnect presentation request", presentationRequest)
      state.walletConnectPresentationRequest = presentationRequest
    },
    setDefaultChain(state, chain){
      state.defaultChain = chain
      localStorage.setItem("default_chain", chain)
    },
    initialize(state, initialState) {
      state.initialized = true
      state.dids = initialState.dids
      let defaultChain = localStorage.getItem("default_chain")
      if (defaultChain != null)
        state.defaultChain = defaultChain
      else
        state.defaultChain = initialState.defaultChain
      let default_did = localStorage.getItem("default_did")
      if(initialState.currentDid != null)
        state.currentDid = initialState.currentDid
      else if(initialState.dids.findIndex(i => i == default_did) < 0)
        state.currentDid = initialState.dids[0]
      else
        state.currentDid = default_did
      console.log("wallet initialized with ", state)
    }
}

export const actions = {
  initialize({ commit }, initialState) {
    commit('initialize', initialState)
  }
}