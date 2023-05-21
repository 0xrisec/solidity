# The Sample network

## Objective

<center><img class="image" src="./assets/images/network.diagram.1.png"></center>
<b><center class="img-label">Final state of our sample network</center></b>

**1. R1, R2, R3, R4 (Organization):**  Organizations to entities that participate in a blockchain network. They are typically represented by real-world entities such as companies or institutions. Each organization has its own set of peers.

**2. CA1, CA2, CA3, CA4 (Certificate Authority):** Certificate Authorities are responsible for issuing and managing digital certificates within a blockchain network. They verify the identity of network participants and provide them with digital certificates, which are used for authentication and securing transactions on the network.

**3. NC4 (Network Configuration):** Network Configuration refers to the set of policies and rules that govern the operation of a Hyperledger blockchain network. It specifies various parameters such as the consensus mechanism, membership rules, endorsement policies, and channel configurations.

**4. O4 (Ordering Service):** The Ordering Service establishes the order and sequencing of transactions or blocks. It ensures that all transactions are properly ordered before being added to the ledger. The ordering service is usually implemented as a separate service and is responsible for maintaining the network's overall consistency.

**5. P1, P2, P3 (Peer Node):** Peer Nodes are the main participants in a Hyperledger blockchain network. They maintain a copy of the ledger and execute transactions. Peers communicate with each other to reach consensus on the validity of transactions and maintain the integrity of the network. They can also host and execute smart contracts.

**6. C1, C2 (Channels):** Channels in Hyperledger allow for the creation of separate sub-networks within a blockchain network. They enable private and confidential transactions between specific sets of participants. Each channel has its own ledger and smart contracts, providing privacy and scalability.

**7. CC1, CC2 (Channel Configuration):** Channel Configuration refers to the specific settings and parameters associated with a channel. It includes the list of participating organizations, the endorsement policies, and the anchor peers for the channel.

**8. L1, L2 (Ledger):** The Ledger stores the complete transaction history of the blockchain network. It maintains an immutable record of all transactions and is replicated across all peer nodes in the network. Each organization has its own copy of the ledger, ensuring transparency and decentralization.

**9. S5, S6 (Smart Contract):** Smart Contracts are self-executing agreements or programs that run on the blockchain network.

**10. A1, A2, A3 (Client Applications):** Client Applications interact with a Hyperledger blockchain network to submit transactions, query data, and interact with smart contracts. They provide a user interface or an API for users to interact with the blockchain network. Client applications communicate with peer nodes and may require authentication and authorization to access network resources.

## Creating the Network

<center><img class="image" src="./assets/images/network.diagram.2.png"></center>
<b><center class="img-label">Creating the basis for the network</center></b>

In our example network, the network is formed when a node called O4, known as the ordering service, is started. This ordering service is configured according to a network configuration called NC4, which grants administrative rights to organization R4. At the network level, a Certificate Authority (CA4) is used to provide identities to the administrators and nodes belonging to organization R4.

The ordering service, O4, acts as the initial administration point for the network. It is configured and started by an administrator in organization R4 and is hosted within R4. The configuration NC4 defines the policies that determine the initial set of administrative capabilities for the network. Initially, only organization R4 has rights over the network. However, this will change as we progress in the network setup. At this stage, R4 is the sole member of the network.

We use Certificate Authorities (CAs) for the following reasons:

- Identification: Allow different components of the blockchain network to identify themselves as belonging to a specific organization. These certificates help establish trust and ensure that only authorized entities participate in the network.

- Security: CAs play a crucial role in ensuring the security of the network. By issuing certificates, CAs verify the authenticity and integrity of the components within the network. This helps prevent unauthorized access, tampering, and impersonation.

<!-- - Endorsement: Certificates issued by CAs can be used to sign transactions. When a transaction is signed by a certificate, it indicates that the organization endorses the transaction result. This endorsement is necessary for the transaction to be accepted onto the ledger, providing a level of accountability and reliability. -->

- Multiple Organizations: In a blockchain network, different organizations often use different CAs. This allows each organization to have control over its own certificate issuance process, ensuring independence and flexibility in managing their identities within the network.

 We have a resource called "network N," which is accessed by a group of users defined by the Certificate Authority (CA4). These users possess specific rights over the resources within network N, which are outlined by policies contained in the network configuration (NC4). To bring this entire setup into operation, we configure and activate the ordering service node (O4). This process materializes the functionalities of the blockchain network.

 ## Adding Network Administrators

 <center><img class="image" src="./assets/images/network.diagram.3.png"></center>
<b><center class="img-label">Updating the network configuration to make organization R1 an administrator</center></b>

## Defining a Consortium

<center><img class="image" src="./assets/images/network.diagram.4.png"></center>
<b><center class="img-label">Updating the network configuration to make organization R1 an administrator</center></b>

The network administrator establishes consortium X1, which includes two organizations, R1 and R2. This information is saved in the network configuration NC4 and will be utilized in the future stages of network development. CA1 and CA2 serve as the Certificate Authorities for these organizations.

A consortium is a group of organizations in a network, like R1 and R2 in this case, that share a common need to conduct transactions with each other. It's logical to bring organizations together when they have a shared goal, and that's precisely what is happening here.

## Creating a channel for a consortium

<center><img class="image" src="./assets/images/network.diagram.5.png"></center>
<b><center class="img-label">Creating a channel for a consortium</center></b>

A channel serves as the main communication method for consortium members to interact with each other.

Using the consortium definition X1, a channel called C1 has been established specifically for R1 and R2. This channel operates independently from the network configuration NC4 and is governed by a separate channel configuration CC1. R1 and R2 have equal rights and authority over C1, while R4 has no rights or involvement in CC1.

Channels are valuable as they offer a means for confidential communication and sharing private data among consortium members. They ensure privacy not only from other channels but also from the overall network.

## Peers and Ledgers

<center><img class="image" src="./assets/images/network.diagram.6.png"></center>
<b><center class="img-label">Peers and Ledgers</center></b>

A peer node named P1 has become a part of channel C1. P1 is responsible for hosting a physical copy of the ledger L1. Through channel C1, P1 and O4 can communicate with each other. Peer nodes serve as network components where copies of the blockchain ledger are stored. P1's role in the network is solely to host a copy of the ledger L1, which is logically associated with channel C1.

When R1 administrator takes the action of joining peer P1 to channel C1, and the peer starts pulling blocks from the orderer O4, the orderer uses the channel configuration CC1 to determine P1’s permissions on this channel. For example, policy in CC1 determines whether P1 (or the organization R1) can read and/or write on the channel C1.

## Applications and Smart Contract chaincode

<center><img class="image" src="./assets/images/network.diagram.7.png"></center>
<b><center class="img-label">Applications and Smart Contract chaincode</center></b>

Now that the channel C1 has a ledger on it, we can start connecting client applications to consume some of the services provided by workhorse of the ledger, the peer!

Peer node P1 has been installed with a smart contract S5. Client application A1, belonging to organization R1, can utilize S5 to interact with the ledger through P1. All three entities, A1, P1, and O4, are connected to channel C1, enabling them to utilize the communication capabilities provided by the channel.

While it may seem that client application A1 can directly access ledger L1 through P1, the reality is that all access is controlled through a special program called a smart contract chaincode, represented by S5. Consider S5 as the defining framework for accessing the ledger. It offers a clear set of methods through which the ledger L1 can be queried or modified. In essence, A1 must interact with smart contract S5 in order to access ledger L1.

## Installing a chaincode package

Once a smart contract S5 is developed, an administrator from organization R1 needs to create a chaincode package and install it onto peer node P1. This process is relatively simple, and once completed, P1 will have complete knowledge of S5. Specifically, P1 can access the implementation logic of S5, which refers to the program code it uses to interact with the ledger L1. It's important to note that this is different from the S5 interface, which solely describes the inputs and outputs of S5 without considering its implementation details.

When an organization has multiple peers within a channel, it has the flexibility to choose the specific peers on which it installs smart contracts. It is not necessary to install a smart contract on every peer within the organization.

## Defining a chaincode

In simple terms, even though a chaincode (smart contract) is installed on the individual peers of different organizations, it is controlled and managed within a channel. Each organization has to agree on how the chaincode will be used on the channel by approving a set of parameters called a chaincode definition. This approval is necessary for organizations to use the installed smart contract to check the records and support transactions. In our example, with only one peer node called P1, an administrator from organization R1 needs to give approval for the chaincode definition of S5.

Imagine you have a channel where different components can connect and communicate with each other. In this channel, there is a special component called S5. Now, all the other components on the channel can access S5 and interact with it, but they cannot see or understand how S5 works internally. That information is private and only known to the nodes that have installed S5, like P1 in our example.

To make it clearer, think of it like this: the channel defines and commits to a standard way of interacting with the smart contract, which is called the smart contract interface. However, the actual implementation of the smart contract, the way it works behind the scenes, is installed on specific nodes. So when we say a smart contract is installed, we mean it is physically hosted on a specific node. But when we say a smart contract is defined on a channel, we mean it is logically hosted by the channel itself, and all the components on the channel can access and use it according to the defined interface.

**Endorsement policy: **

## Network completed

<center><img class="image" src="./assets/images/network.diagram.8.png"></center>
<b><center class="img-label"></center></b>

The network has grown by adding infrastructure from organization R2. They added a peer node called P2, which holds a copy of ledger L1 and a smart contract called S5. R2 approves the same definition of the smart contract as R1. P2 has also joined a communication channel called C1, along with application A2. Both A2 and P2 are identified using certificates from CA2. This means that both applications A1 and A2 can use the smart contract S5 on the channel C1, either through the peer node P1 or P2.

In simple words, organization R2 joined the network and added a new computer called P2, which stores important information and a set of rules. R2 also brought in a new application called A2, which can connect to the network. To make this happen, someone in R2's team created P2 and connected it to the network, just like someone in R1's team did before. Now, both A1 and A2 can do transactions using the rules and information stored in P2 and communicate through the channel C1.