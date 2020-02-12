const { calculateTip, fahrenheitToCelsius , celsiusToFahrenheit, add } = require('../src/math')
const math = 
test('Should calculate total with tip', ()=> {
    const total = calculateTip(10,0.3)
    expect(total).toBe(13)
} ) 
test('Should calculate total with no percentage provided', ()=> {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
} ) 
test('Celcius to F ', ()=> {
    const celcius = celsiusToFahrenheit(0)
    expect(celcius).toBe(32)
} ) 

test('F to Celcius ', ()=> {
    const farneiht = fahrenheitToCelsius(32)
    expect(farneiht).toBe(0)
} ) 

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(1)
//         done()
//     },5100)
//  }
//  )


test('should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})
test('should add two numbers asynch/await', async () => {
    const sum = await add(10,22)
    expect(sum).toBe(32)
})

