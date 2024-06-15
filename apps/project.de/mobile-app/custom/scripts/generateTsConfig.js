const fs = require('fs');
const path = require('path');


const baseRoot = process.cwd();
const baseConfigName = 'tsconfig.base.json';
const baseConfigPath = path.resolve(baseRoot, baseConfigName)

const configName = 'tsconfig.json'
const configPath = path.resolve(__dirname, '..', '..', configName)


// Load the base config
const baseConfig = JSON.parse(
  fs.readFileSync(baseConfigPath, 'utf8')
)

const mainConfig = JSON.parse(
  fs.readFileSync(configPath, 'utf8')
)



const addPrefixOrSuffix = ({
  items = [],
  isPrefix = true,
  addAble = ''
}) => {
  if (Array.isArray(items)) {
    if (isPrefix) {
      return items.map((item) => addAble + item)
    }
    return items.map((item) => item + addAble)
  }
  if (typeof items === 'string') {
    if (isPrefix) {
      return addAble + items
    }
    return items + addAble
  }
}
const addPrefix = (item, prefix) => prefix + item
const addSufix = (item, suffix) => item + suffix

const getModifiedConfig = (obj) => {
  const newObj = {}
  for (const [k, v] of Object.entries(obj)) {
    newObj[k] = v.map(item => path.resolve(baseRoot, item));
  }
  return newObj
}

// console.log(getModifiedConfig(baseConfig.compilerOptions.paths))
// console.log(baseConfig.compilerOptions.paths);

mainConfig.compilerOptions.baseUrl = "."
mainConfig.compilerOptions.paths = {
  "@/*": [
    "src/app/*"
  ],
  "@@/*": [
    "./*"
  ],
  ...getModifiedConfig(baseConfig.compilerOptions.paths),
}


// Write the merged config to tsconfig.json
fs.writeFileSync(
  path.resolve(configPath),
  JSON.stringify(mainConfig, null, 2),
  'utf8'
)

console.log(configName + ' has been generated')
