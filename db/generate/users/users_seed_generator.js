const fs = require('fs')

const convert = function() {
  // INSERT INTO users (username) VALUES ('name');
  fs.writeFile('users_output.txt', '', { flag: 'w' }, err => {});
  const queryBase = "INSERT INTO users (username) VALUES ";
  fs.readFile('users_input.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    data = data.split('\n');
    for(let i=0; i<data.length-1; i++) {
      const queryBuilder = `${queryBase} ('${data[i]}');\n`;
      fs.writeFile('users_output.txt', queryBuilder, { flag: 'a+' }, err => {});
    }

  })

};

convert();
