# Codotype

Upstream development repository for [github.com/codotype](https://github.com/codotype)

## Setup

1. Run the following command to set up your local environment for development:

```
lerna bootstrap
```

2. Your environment should be ready for development - please consult the documentation in each repository for more detailed development instructions.


Environment Setup
```
npm install -g @vue/cli
npm install -g lerna
```

Codotype Environment Setup
```
git clone https://github.com/codotype/codotype.git
cd ./codotype
git checkout -b dev
git reset --hard origin/dev
lerna bootstrap
```

Codotype Generator Setup
```
cd ./packages/@codotype
git clone https://github.com/codotype/codotype-mevn-generator.git
cd ./codotype-mevn-generator
../cli/bin/codotype.js serve
```