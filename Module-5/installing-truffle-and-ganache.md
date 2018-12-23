# Installing Truffle and Ganache

## Installing Truffle

### Windows

In this lesson, we are going to cover how to install Truffle.

If you are on a windows machine follow the next couple of steps. Install [chocolatey](https://chocolatey.org/).

Once it is installed, open a Powershell prompt as an Administrator and run the following commands (last command optional):

`choco install nodejs.install –y`
`choco install git –y`
`npm install -g npm`
`npm install -g -production windows-build-tools`
`choco install VisualStudioCode -y`

## OSes Other Than Windows

The rest of the tutorial is relevant for everyone regardless of your operating system.

Check if npm is installed on your machine. You can do this by entering `npm -v` in your terminal. If npm is installed, it will return the version number.

If npm is not installed you can install it from https://www.npmjs.com/get-npm

Run the following commands in the command lins as root/administrator.

`sudo npm install -g ganache-cli`
`sudo npm install -g truffle`

The previous commands should execute without error.

Ganache CLI and Truffle are now installed on your machine!

If you are still running into problems on Windows check this Truffle documentation about resolving naming conflicts.

Additional Resources:

- [How to install Truffle and Ganache CLI on Windows for blockchain development](http://truffleframework.com/tutorials/how-to-install-truffle-and-testrpc-on-windows-for-blockchain-development)
- [The Truffle docs quickstart on working with Ganache](https://truffleframework.com/docs/ganache/quickstart)
- [Configuring Visual Studio Code for Blockchain Development](http://truffleframework.com/tutorials/configuring-visual-studio-code)
- [Resolving naming conflicts on Windows](http://truffleframework.com/docs/advanced/configuration#resolving-naming-conflicts-on-windows)

