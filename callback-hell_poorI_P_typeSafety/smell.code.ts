let data = [
    { name: 'John Doe', age: 25 },
    { name: 'Jane Smith', age: 30 },
    { name: 'Bob Johnson', age: 40 },
    { name: 'Alice Williams', age: 35 },
];

function filterByName(query) {
    return data.filter(item => item.name.includes(query));
}

function searchByName(query) {
    return new Promise((resolve, reject) => {
        if (typeof query === 'string') {
            setTimeout(() => {
                const results = filterByName(query);
                resolve(results);
            }, 1000);
        } else {
            reject('Error: Invalid query type');
        }
    });
}

function printResults(results) {
    results.forEach(result => {
        console.log(`Name: ${result.name}, Age: ${result.age}`);
    });
}

function main() {
    try {
        const query = 'John';
        const results = searchByName(query);
        printResults(results);
    } catch (error) {
        console.log(error);
    }
} 

main();
