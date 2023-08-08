class EthereumTransaction {
  constructor(
    transactionHash,
    senderAddress,
    receiverAddress,
    amountTransferred,
    blockNumber,
  ) {
    this.transactionHash = transactionHash;
    this.senderAddress = senderAddress;
    this.receiverAddress = receiverAddress;
    this.amountTransferred = amountTransferred;
    this.blockNumber = blockNumber;
  }
}

module.exports = EthereumTransaction;
