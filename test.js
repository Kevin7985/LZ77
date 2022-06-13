const fs = require('fs');

let testString = 'heykrasotkavtrinadcatomryadudfljkfghpsrhgpufhgopfgjkjsjhgirehljkgbrighroeihheykrasotkavtrinadcatomryaduldjflekjnwerngwerjgporjgoiwehfriheykrasotkavtrinadcatomryaduldjflekjnwerngwerjgporjgoiwehfri';

let lz1 = new (require('./lz77')) ();

console.log(testString);
let encoded = lz1.encode(testString);
console.log(encoded);
let decoded = lz1.decode(encoded);
console.log(decoded);

console.log(testString === decoded);

//console.log(testString.length);
let encode_results = [];

for (let buffer_size = 0; buffer_size < 10000; buffer_size++) {
  let lz = new (require('./lz77')) (buffer_size);
  let res = lz.encode(testString);
  let result = {
    size: buffer_size,
    result_size: res.length,
    percent: `${Math.round((res.length / testString.length) * 100)}%`,
    result: res
  };
  encode_results.push(result);
}

let res = '';
encode_results.forEach(item => {
  res += `${JSON.stringify(item)}\n`;
});

fs.writeFile('results.txt', res, (err) => { });