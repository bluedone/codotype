FROM node:8.12.0-jessie

# Create a directory where our app will be placed
RUN mkdir /app

# Get all the in this repository
COPY ./ /app

# Installs global NPM dependencies
# RUN npm install -g forever

# Change to the app directory
# Installs dependencies for the app
# Pulls generator repositories
WORKDIR /app
RUN npm install
RUN npm install https://github.com/codotype/codotype-mevn-generator.git
# RUN npm install https://github.com/codotype/codotype-vuejs-vuex-bootstrap-generator.git
# RUN npm install https://github.com/codotype/codotype-nodejs-express-mongodb-generator.git
# RUN npm install https://github.com/codotype/codotype-postman-collection-generator.git
# RUN npm install https://github.com/codotype/codotype-python-falcon-mongodb-generator.git
# RUN npm install https://github.com/codotype/codotype-mongodb-scripts-generator.git

# Serve the app
CMD ["node", "www.js"]
