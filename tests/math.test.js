const {calculateTip,fahrenheitToCelsius,celsiusToFahrenheit,add} = require('../src/math')

test('should calculate total with tip',()=>{
    const total = calculateTip(10,.3)
 /*    
    if(total!=13){
        throw new Error('Total tip should be 13. Got '+total)
    } */
    // jest test library
    expect(total).toBe(13) // assertion
})

test('should calculate total with defaulttip',()=>{
    const total = calculateTip(10)
    // jest test library
    expect(total).toBe(12) // assertion 
})

test('should test 32 F to 0C',()=>{
    const celcius = fahrenheitToCelsius(32)
    // jest test library
    expect(celcius).toBe(0) // assertion 
})

test('should test 0C to 32F',()=>{
    const fahrenheit = celsiusToFahrenheit(0)
    // jest test library
    expect(fahrenheit).toBe(32) // assertion 
})

/* test('Async test done',(done)=>{
    setTimeout(()=>{
        expect(1).toBe(2)
        done()
    },2000)
}) */

test('add two numbers',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    })
})


test('add two numbers async/await',async ()=>{
    const sum = await add(7,3)
    expect(sum).toBe(10)
    
})