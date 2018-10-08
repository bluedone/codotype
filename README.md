# Codotype

Upstream development repository for [github.com/codotype](https://github.com/codotype)

## Setup

1. Run the following command to set up your local environment for development:

```
npm run setup YOUR_GITHUB_USERNAME
```

**NOTE** - at the moment the `setup.sh` script depends on having a fork of each of the following repositories:

- [codotype-api](https://github.com/codotype/codotype-api)
- [codotype-blueprints](https://github.com/codotype/codotype-blueprints)
- [codotype-cli](https://github.com/codotype/codotype-cli)
- [codotype-flask-postgresql-generator](https://github.com/codotype/codotype-flask-postgresql-generator)
- [codotype-generator](https://github.com/codotype/codotype-generator)
- [codotype-nodejs-express-mongodb-generator](https://github.com/codotype/codotype-nodejs-express-mongodb-generator)
- [codotype-react-generator](https://github.com/codotype/codotype-react-generator)
- [codotype-runtime](https://github.com/codotype/codotype-runtime)
- [codotype-util](https://github.com/codotype/codotype-util)
- [codotype-vuejs-vuex-bootstrap-generator](https://github.com/codotype/codotype-vuejs-vuex-bootstrap-generator)
- [codotype-web](https://github.com/codotype/codotype-web)


2. Run the following command to automatically resolve local dependencies with [LernaJs](https://lernajs.io):

```
npm run bootstrap
```

3. Your environment should be ready for development - please consult the documentation in each repository for more detailed development instructions.
