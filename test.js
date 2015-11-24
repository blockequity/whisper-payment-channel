loadScript("/Users/jeffrey/dev/ethereum/payment_channel/payment_channel.js");

personal.unlockAccount(eth.accounts[0], "")

var receiver = shh.newIdentity()
    sender = shh.newIdentity()
    numbers = [3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8];
    index = 0;

var tx = new PaymentChannel(eth.accounts[0], sender, receiver, PaymentChannel.payer);
tx.onPayload = function(payload) {
    console.log("received data", payload);
    return true;
};
var rx = new PaymentChannel(eth.accounts[0], receiver, sender, PaymentChannel.beneficiary);
rx.onPayment = function(error, payment) {
    if( error ) {
        console.log("invalid payment:", error);
        return false;
    }

    console.log("received payment", payment);
    return true;
};
rx.data = function() {
	// either run out of numbers or quit randomly
	if( index == numbers.length) {
		console.log("done")
		return false;
	}
    return web3.toHex(numbers[index++]);
}

tx.start();
rx.start();