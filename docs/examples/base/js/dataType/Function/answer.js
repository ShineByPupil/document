instance.regularFunc() // "return method"
regularFunc() //  undefined
arrow() // "method"
method() // "method"
nested() // undefined
innerObj.nested() // "innerObj"
innerObj.nested.call(obj) // "obj"
