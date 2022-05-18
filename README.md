# esm-hook

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/esm-hook.svg)](https://badge.fury.io/js/esm-hook)

Use ESM modules with zero setup.

```ts
require("esm-hook");

const fetch = require("node-fetch").default;
fetch("https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty")
  .then(req => req.json())
  .then(json => console.log(json))
  .catch(console.error);
```

## License

MIT
