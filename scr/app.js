const obj1=require('./logger')
obj1.loggingfunction()
obj1.wel()
console.log(obj1.point)

console.log("------------------------------------------------------")

const obj2=require('./util/helper')
obj2.date()
obj2.month()
obj2.batch()

console.log("------------------------------------------------------")

const obj3=require('../validator/formatter')
obj3.trimStr("  Nikhil Patil    ")
obj3.toLowerCase("ABCgVD")
obj3.changeToUpperCase("abbgsA")

console.log("------------------------------------------------------")

const pakageLodash= require("lodash")
console.log(pakageLodash.chunk(["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"],3))
console.log(pakageLodash.tail([1,3,5,7,9,11,13,15,17,19]))
console.log(pakageLodash.union([5,2,3,5,7],[8,2,3],[9,2,3,5,4],[1,2,3,5,2],[9,2,3,4,2]))
console.log(pakageLodash.fromPairs([["a",1],["b",2],["c",3]]))
