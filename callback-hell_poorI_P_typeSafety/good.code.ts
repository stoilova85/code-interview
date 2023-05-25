const data = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Smith', age: 30 },
    { name: 'Bob Johnson', age: 40 },
    { name: 'Alice Williams', age: 35 },
  ];
  
  const filterByName = (query, data) => data.filter(item => item.name.includes(query));
  const printResults = results => results.forEach(result => console.log(`Name: ${result.name}, Age: ${result.age}`));
  
  const searchByName = (query, data) => {
    return new Promise((resolve, reject) => {
      if (typeof query === 'string') {
        setTimeout(() => {
          let results = filterByName(query, data);
          resolve(results);
        }, 1000);
      } else {
        reject(Error('Invalid query type'));
      }
    });
  };
  
  const main = async () => {
    try {
      const query = 'John';
      const results = await searchByName(query, data);
      printResults(results);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  
  main();
  