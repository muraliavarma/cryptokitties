import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			fromAccountAddress: 0,
			toAccountAddress: '0xEbd51E60CbbB1fe2326843abEf55e8aE470912D9',
			contractAddress: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
			fromOwnedKitties: [],
			toOwnedKitties: [],
			toAddressError: 'Can not be empty',
			fromTransactions: []
		}

		if(typeof web3 != 'undefined'){
			console.log("Using web3 detected from external source like Metamask")
			this.web3 = new Web3(web3.currentProvider)
		}else{
			console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
			this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		}

		var self = this
		this.web3.eth.getAccounts().then((accounts) => {
			if (accounts && accounts[0]) {
				self.setState({
					fromAccountAddress: accounts[0]
				}, (() => this.getAccountDetails(accounts[0], (kitties) => {
					self.setState({
						fromOwnedKitties: kitties
					})
				})))

				fetch('/transactions/' + accounts[0])
				.then(result => result.json())
				.then((result) => {
					self.setState({
						fromTransactions: result.transactions
					})
				})
			}
		});

		const MyContract = web3.eth.contract([{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_sireId","type":"uint256"}],"name":"approveSiring","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_sireId","type":"uint256"},{"name":"_matronId","type":"uint256"}],"name":"bidOnSiringAuction","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"_sireId","type":"uint256"}],"name":"breedWithAuto","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"}],"name":"createGen0Auction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_genes","type":"uint256"},{"name":"_owner","type":"address"}],"name":"createPromoKitty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kittyId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSaleAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kittyId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"createSiringAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_matronId","type":"uint256"}],"name":"giveBirth","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"val","type":"uint256"}],"name":"setAutoBirthFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newCEO","type":"address"}],"name":"setCEO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"cooldownEndBlock","type":"uint256"}],"name":"Pregnant","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"approved","type":"address"},{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[{"name":"_newCFO","type":"address"}],"name":"setCFO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"kittyId","type":"uint256"},{"indexed":false,"name":"matronId","type":"uint256"},{"indexed":false,"name":"sireId","type":"uint256"},{"indexed":false,"name":"genes","type":"uint256"}],"name":"Birth","type":"event"},{"constant":false,"inputs":[{"name":"_newCOO","type":"address"}],"name":"setCOO","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setGeneScienceAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contractAddress","type":"address"}],"name":"setMetadataAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSaleAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"secs","type":"uint256"}],"name":"setSecondsPerBlock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSiringAuctionAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[],"name":"withdrawAuctionBalances","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"autoBirthFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_matronId","type":"uint256"},{"name":"_sireId","type":"uint256"}],"name":"canBreedWith","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ceoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cfoAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cooAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cooldowns","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"erc721Metadata","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_AUCTION_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_CREATION_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GEN0_STARTING_PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gen0CreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"geneScience","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getKitty","outputs":[{"name":"isGestating","type":"bool"},{"name":"isReady","type":"bool"},{"name":"cooldownIndex","type":"uint256"},{"name":"nextActionAt","type":"uint256"},{"name":"siringWithId","type":"uint256"},{"name":"birthTime","type":"uint256"},{"name":"matronId","type":"uint256"},{"name":"sireId","type":"uint256"},{"name":"generation","type":"uint256"},{"name":"genes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_kittyId","type":"uint256"}],"name":"isPregnant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_kittyId","type":"uint256"}],"name":"isReadyToBreed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"kittyIndexToApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"kittyIndexToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pregnantKitties","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PROMO_CREATION_LIMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"promoCreatedCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"saleAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"secondsPerBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"sireAllowedToAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"siringAuction","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_preferredTransport","type":"string"}],"name":"tokenMetadata","outputs":[{"name":"infoUrl","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"name":"ownerTokens","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}])
		this.state.ContractInstance = MyContract.at(this.state.contractAddress)
	}

	componentDidMount() {

	}

	// Listen for events and executes the voteNumber method
	getAccountDetails(accountAddress, cb){
		this.state.ContractInstance.balanceOf(accountAddress, (err, result) => {
			console.log('balance of', err, result);
		})

		// THIS DOES NOT WORK - probably because the contract solidity code shows that we loop through all possible kitties, which times out I imagine
		// this.state.ContractInstance.tokensOfOwner(accountAddress, (err, result) => {
		// 	console.log('tokens of owner', err, result);
		// })

		// for some reason the address need to be all in lower case before this works
		fetch('https://api.cryptokitties.co/kitties?offset=0&limit=12&owner_wallet_address=' + accountAddress.toLowerCase() + '&parents=false&authenticated=true&orderBy=id&orderDirection=desc')
		.then(result => result.json())
		.then(
			(result) => {
				console.log(result)
				cb(result.kitties)
			},
			(error) => {
				console.log('CK API fetch failed!', error)
			}
		)

		this.state.ContractInstance.totalSupply((err, result) => {
			console.log('total supply', err, result['c'][0]);
		})

	}

	getToAddress() {
		if (!this.web3.utils.isAddress(this.state.toAccountAddress)) {
			this.setState({
				toAddressError: ' Invalid Address'
			})
		}
		else if (this.state.toAccountAddress == this.state.fromAccountAddress) {
			this.setState({
				toAddressError: ' From and To Addresses need to be different'
			})
		}
		else {
			this.setState({
				toAddressError: ''
			})

			this.getAccountDetails(this.state.toAccountAddress, (kitties) => {
				this.setState({
					toOwnedKitties: kitties
				})
			});
		}
	}

	refreshFromAndTo() {
		this.getAccountDetails(this.state.fromAccountAddress, (kitties) => {
			this.setState({
				fromOwnedKitties: kitties
			})
		})

		this.getAccountDetails(this.state.toAccountAddress, (kitties) => {
			this.setState({
				toOwnedKitties: kitties
			})
		})

		fetch('/transactions/' + this.state.fromAccountAddress)
		.then(result => result.json())
		.then((result) => {
			this.setState({
				fromTransactions: result.transactions
			})
		})
	}

	transfer(kittenId) {
		console.log(kittenId)
		var self = this
		this.state.fromOwnedKitties.find((kitten) => kitten.id == kittenId).isTransferring = true
		this.setState({
			fromOwnedKitties: this.state.fromOwnedKitties
		})

		this.state.ContractInstance.transfer(this.state.toAccountAddress, kittenId, (err1, hash) => {
			if (err1) {
				console.log(err1)
				self.refreshFromAndTo()
				return;
			}

			var urlSuffix = '/kittenId/' + kittenId + '/tx/' + hash + '/from/' + this.state.fromAccountAddress + '/to/' + this.state.toAccountAddress;

			fetch('/transfer/start' + urlSuffix)
			console.log('transferring', hash);
			this.waitForReceipt(hash, ((receipt) => {
				if (receipt.status == '0x1') {
					fetch('/transfer/success' + urlSuffix)
					.then(() => {
						// wait 5 more seconds after the receipt and then refresh
						window.setInterval(() => {
							self.refreshFromAndTo()							
						}, 5000)
					})
				}
				else {
					fetch('/transfer/fail' + urlSuffix)
				}
				console.log('received', receipt)
			}));
		})
	}

	waitForReceipt(hash, cb) {
		var self = this
		// can probably be improved by listening for getTransaction and figuring out estimated time remaining and block confirmations
		web3.eth.getTransactionReceipt(hash, function (err, receipt) {
			console.log('checking transaction status', hash, receipt)
			if (err) {
				error(err);
			}

			if (receipt !== null) {
				// Transaction went through
				if (cb) {
					cb(receipt);
				}
			}
			else {
				// Try again in 1 second
				window.setTimeout(() => {
					self.waitForReceipt(hash, cb);
				}, 1000);
			}
		});
	}

	renderOwnedKittens(ownedKittens, canTransfer) {
		return (
			<div>
				<b>Owned Kittens</b>
				{ownedKittens.map((kitten, idx) => (
					<div key={idx}>
						<img src={kitten.image_url_cdn} height="200" width="200"/>
						<br/>
						<span>ID: <b>{kitten.id}</b></span>
						<br/>
						<span>Name: <b>{kitten.name}</b></span>
						<br/>
						{kitten.isTransferring && 
							<span>Transferring...</span>
						}
						{!kitten.isTransferring && canTransfer &&
							<button type="button" className="btn btn-dark" onClick={() => this.transfer(kitten.id)}>Transfer</button>
						}
						<hr/>
					</div>
				))}
			</div>
		);
	}

	render() {
		return (
			<div className="container text-center">
				<h1>View and gift your kute kittenz</h1>

				<div className="row">
					<div className="col-6">
						<b>My Address:</b> &nbsp;
						<span>{this.state.fromAccountAddress}</span>
						<hr/>
						{this.renderOwnedKittens(this.state.fromOwnedKitties, !this.state.toAddressError)}
					</div>
					<div className="col-6">
						<b>To Address:</b> &nbsp;
						<input type="text" value={this.state.toAccountAddress} onChange={(event) => this.setState({toAccountAddress: event.target.value})}/>
						<button type="button" className="btn btn-dark" onClick={() => this.getToAddress()}>Get</button>
						<div className="text-danger">{this.state.toAddressError}</div>
						<hr/>
						{!this.state.toAddressError && this.renderOwnedKittens(this.state.toOwnedKitties)}
					</div>
				</div>
				<hr/>
				<b>Successful Transactions</b>
				<div className="row">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Time Stamp</th>
								<th scope="col">Kitten ID</th>
								<th scope="col">Recipient</th>
								<th scope="col">Transaction Hash</th>
							</tr>
						</thead>
						<tbody>
						{this.state.fromTransactions.map((transaction, idx) => (
							<tr key={idx}>
								<td>{transaction.ts}</td>
								<td>{transaction.kittenId}</td>
								<td>{transaction.to}</td>
								<td>{transaction.tx}</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
)
