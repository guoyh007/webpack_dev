// let str = require('./a')

// console.log('str: ', str);

require('./index.css');

require('./index.less');

function getName(params) {
  console.log('Whatis your name');
}
getName();

@log
class A {
  a = 1;
}
let a = new A;
console.log('a: ', a);
console.log('b: ', 1);

function log(target) {
  console.log('target: ', target, 23);
}