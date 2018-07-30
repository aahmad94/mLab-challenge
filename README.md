# Parse JSON

## Run

To run the file, simply navigate to the mLab directory containing the file "parse_json.js" in terminal and execute the command "node parse_json.js".
To tests different inputs, copy and paste the desired input in the tests array in "parse_json.js" and execute the above node command again.

NB: this code was written and executed with Node 8.9.4.

## Implementation

The "parseJson" function will key into every entry in the JSON object to check if it points to an object, in which the case the function will call a recursive helper function with that key as an initial "path" argument that will be used to define the new key in our result object.

If the recursive function keys into a deeper object, it will call itself with (1) that object and (2) an updated "path", otherwise it will assign the "item" to the current "path" in the result object.

```javascript
const parseJson = (obj) => {
  if (typeof(obj) !== 'object') return -1;
  const res = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (typeof(obj[key]) === 'object') {
      rec(obj[key], key, res);
    } else {
      res[key] = obj[key];
    }
  }
  return res;
};

const rec = (item, path, res) => {
  if (typeof(item) !== 'object') {
    res[path] = item;
  }
  const keys = Object.keys(item);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    rec(item[key], path.concat(`.${key}`), res);
  }
};
```

## Time and Space Complexity

The time complexity is also O(n) where n is the number of keys in the root JSON object.

The function creates a new variable for the result map and, therefore, utilizes at least n space. Each recursive call also utilizes additional space on the call stack. The function has an overall space complexity of O(n).

## Considerations

The problem statement stated that no keys pointed to an array, however, this is a case we may want to address. We can iterate and recurse through an array (in the case it may be nested) and update our path simply with "Array" at each level and extract any JSON entries it may contain as in the recursive helper function above. Our result would still have a key that will point to the array but all the entries JSON entries within the array would be defined in our result object.
