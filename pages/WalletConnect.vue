<template>
<div>
  <h1>Present credential via</h1>
  <img src="https://raw.githubusercontent.com/WalletConnect/web-examples/main/dapps/react-dapp-v2/public/assets/walletconnect.png" width="250px" class="mb-2"/>

  <input type="text" class="form-control border-primary my-2 mx-auto" v-model="rpAddress">
  <button :disabled="rpAddress == null" class="btn btn-primary" @click="startPresent">Start present</button>

  <p>{{statusMsg}}</p>
</div>
</template>
	
<script>
import {config} from '/config.js'
//import { ChatClient } from "@walletconnect/chat-client";

if (typeof window !== "undefined")
     window.global = window;
const ChatClient = require("@walletconnect/chat-client").ChatClient

export default {
  name: "WalletConnect",
  data() {
    return {
      rpAddress: null,
      statusMsg: ""
    }
  },
  methods: {
    startPresent: async function() {
      
      console.log(config.walletConnectId)
      
      const chatClient = await ChatClient.init({
         projectId: config.walletConnectId
      })
      chatClient.on("chat_joined", async () => {
        this.statusMsg = "RP joined"
      });
      chatClient.on("chat_message", async (event) => {
        console.log(event)
        this.statusMsg = "Credential requested: " + event.params.message
        const sessionInfo = await this.$axios.$get("/api/wallet/presentation/create?type=" + event.params.message)
        this.$router.replace("/CredentialRequest/?sessionId=" + sessionInfo.id)
        
      });
      await chatClient.register({ account: `eip155:1:${this.$auth.user.ethAccount}` });
      
      this.statusMsg = "Contacting RP"
      await chatClient.invite({
         account: this.rpAddress, // the CAIP-2 formatted account of the recipient.
         invite: {
           message: "StartPresentation", // an intro message from you
           account: `eip155:1:${this.$auth.user.ethAccount}`, // your CAIP-2 formatted account that you registered previously.
         },
      });
    }
  }	
}
</script>
	
<style scoped>
	
</style>