var SimpleStorage = artifacts.require('SimpleStorage')

contract('SimpleStorage', async (accounts) => {
    
    it('Calling set(x) should set storedData in storage to x', async() => {
        let newValue = 2;
        let instance = await SimpleStorage.deployed()
    
        instance.set(newValue, {from: accounts[0]})
        let returnedValue = await instance.storedData.call()
    
        assert.equal(newValue, returnedValue, "The returned value should equal the new value.")
    })

})