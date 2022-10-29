<template>
<div>
  <h1>Present credential via</h1>
  <img src="https://raw.githubusercontent.com/WalletConnect/web-examples/main/dapps/react-dapp-v2/public/assets/walletconnect.png" width="250px" class="mb-2"/>

  <video id="scanner-video" class="image-fluid mx-auto img-thumbnail"></video>
  <input type="text" class="form-control border-primary my-2 mx-auto" v-model="rpAddress">
  <button :disabled="rpAddress == null" class="btn btn-primary" @click="startPresent">Start present</button>

  <p>{{statusMsg}}</p>
</div>
</template>
	
<script>
import QrScanner from 'qr-scanner'
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
      const wcChatClient = await this.$globals.getWcChatClient()
      wcChatClient.on("chat_joined", async () => {
        this.statusMsg = "RP joined"
      });
      wcChatClient.on("chat_message", async (event) => {
        console.log(event)
        this.statusMsg = "Credential requested: " + event.params.message
        this.$store.commit('wallet/setWalletConnectPresentationRequest', event)
        const sessionInfo = await this.$axios.$get("/api/wallet/presentation/create?type=" + event.params.message)
        this.$router.replace("/CredentialRequest/?sessionId=" + sessionInfo.id)
        
      });
      await wcChatClient.register({ account: `eip155:1:${this.$auth.user.ethAccount}` });
      
      this.statusMsg = "Contacting RP"
      await wcChatClient.invite({
         account: this.rpAddress, // the CAIP-2 formatted account of the recipient.
         invite: {
           message: "StartPresentation", // an intro message from you
           account: `eip155:1:${this.$auth.user.ethAccount}`, // your CAIP-2 formatted account that you registered previously.
         },
      });
    },
    checkScanResult(result) {
      return result.data.startsWith("eip155:1:")
    }
  },
  mounted() {
    const qrScanner = new QrScanner(document.getElementById("scanner-video"), 
      result => {
        if(this.checkScanResult(result)) {
          qrScanner.stop()
          this.rpAddress = result.data;
          this.startPresent();
        } else {
          console.log("Failed to parse QR code", result.data)
        }
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true
      });
    window.addEventListener('beforeunload', () => { qrScanner.stop() })
    qrScanner.start()
  }
}
</script>
	
<style scoped>
	
</style>