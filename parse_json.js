const parseJson = (obj) => {
  if (typeof (obj) !== 'object') return -1;
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

const obj = {
  "a": 1,
  "b": true,
  "c": {
    "d": 3,
    "e": true,
    "f": {
      "g": 42
    }
  }
};

const tests = [obj];

for (let i = 0; i < tests.length; i++) {
  console.log(parseJson(tests[i]));
}