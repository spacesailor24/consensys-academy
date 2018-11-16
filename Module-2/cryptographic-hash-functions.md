# Cryptographic Hash Functions

"A cryptographic hash function is a hash function which takes an input (or 'message') and returns a fixed-size alphanumeric string. The string is called the 'hash value', 'message digest', 'digital fingerprint', 'digest' or 'checksum'." ~ [Wikipedia: Cryptographic hash function](https://simple.wikipedia.org/wiki/Cryptographic_hash_function)

## Key Features of Hash Functions

- Takes arbitrary data of arbitrary length, and will always produce a hash of the same length
- The same input data will always produce the same hash
- Similar input data will produce radially different hashes - appearing to be random
- The difference in time it takes to hash a small amount of data v.s. a much larger amount of data should be nominal
- A hash should be one-way, meaning it should be infeasible to reverse a hash to obtain the original input - A.K.A. pre-image resistant
- Different input data should never produce the same hash - every hash of different data should be unique A.K.A. collision resistance

## Applications of Hash Functions

### Verify Data Integrity

Because the exact same input data must be given to a hash function to produce a hash, you can verify data integrity by taking any given data and comparing it to a known and trusted hash of the original data. If the given data produces a hash different from the know and trusted hash, then you know that your copy of the data does not match the original.

### Proof of Work

Hashes are used in Proof-of-Work based consensus methods, because the consensus protocol can generate a target value that's represented as a hash, and because a hash is a one-way function, miner's have to brute force their way to get a hash that reduces to a number below the target value. Miner's are unable to simply take the hash of the target value and reverse it to get the target value set by the network protocol.

Also, brute forcing a hash takes a lot of computational power, but verifying if a hash is correct and below the target value, is computational easy.

### Data Identification

Because hashes are unique, a hash of some unique identifying information can be used a uniformed identifier in a network.

### Pseudorandom Number Generation

A seemingly random number could be generated using a hashing function, but the number won't be truly random, given that hash functions are deterministic and require input data that will always return the same hash if not altered.

## Blockchain Underpinnings: Hashing by ConsenSys Media

- An Ethereum address is derived by hashing the public key using Keccak-256
- A Bitcoin address is derived by hashing the public key using RIPEMD160
- An identification string that also provides its own integrity is called a _self certifying identifier_
- [Merkling in Ethereum](https://ethereum.github.io/blog/2015/11/15/merkling-in-ethereum/)

### SHA-3 v.s. Keccak-256

- [Are you really using SHA-3 or old code?](https://medium.com/@ConsenSys/are-you-really-using-sha-3-or-old-code-c5df31ad2b0)

SHA-2 was published in 2001, and has since been used for cryptographic systems such as TLS, SSL, SSH, and Bitcoin. In 2007 NIST (the National Institute of Standards and Technology) announced a competition to determine SHA-3. In 2012, the Keccak team was announced the winner of said competition and users began implementing the standard in systems such as Ethereum. However, in 2014 NIST made slight changes to Keccak's submission and published the altered standard, FIPS 202, in 2014. FIPS 202 became he official SHA-3 standard in August 2015.

Old code using the Keccak  implementation of SHA-3 will produce a hash different from the FIPS 202 based standard. Hashing empty input using Keccak-256 will produce the following hash:

`c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470`

While hashing empty input using the current SHA-3 standard will produce:

`a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a`

## Additional Resources

- [Blockchain Underpinnings: Hashing by ConsenSys Media](https://medium.com/@ConsenSys/blockchain-underpinnings-hashing-7f4746cbd66b)
- [Cryptographic hash functions on Wikipedia](https://simple.wikipedia.org/wiki/Cryptographic_hash_function)
- [Cryptographic hash functions by the Kahn Academy](https://www.khanacademy.org/economics-finance-domain/core-finance/money-and-banking/bitcoin/v/bitcoin-cryptographic-hash-function)
- [Video: Hashing Algorithms and Security by Computerphile](https://www.youtube.com/watch?v=b4b8ktEV4Bg)