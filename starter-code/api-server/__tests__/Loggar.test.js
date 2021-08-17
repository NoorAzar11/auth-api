'use strict'


const loggerTesting = require('../src/middleware/logger');

describe('Testing my api  ', ()=> { 

    let consoleSpy; 
    let req = {};
    let res = {};
    let next = jest.fn();

    beforeEach(()=> {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    })
    afterEach(()=> {
        consoleSpy.mockRestore();
    })

    it('Testing out put', ()=> {
        loggerTesting(req, res, next);
        expect(consoleSpy).toHaveBeenCalled();
    })
    
    it('Testing the next ', ()=> {
        loggerTesting(req, res, next);
        expect(next).toHaveBeenCalled()
    })
})