# esm-hook

[![License](https://img.shields.io/badge/License-MIT_0-blue.svg)](https://opensource.org/licenses/MIT-0)
[![npm version](https://badge.fury.io/js/esm-hook.svg)](https://badge.fury.io/js/esm-hook)

Use ESM modules with zero setup.

```ts
require("esm-hook/register");

const fetch = require("node-fetch").default;
fetch("https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty")
  .then(req => req.json())
  .then(json => console.log(json))
  .catch(console.error);
```

## License

MIT No Attribution.
