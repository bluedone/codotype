#!/bin/bash
# Clones all codotype repositories for local development

# # # #

# List of repositories:

# "codotype-api"
# "codotype-blueprints"
# "codotype-cli"
# "codotype-flask-postgresql-generator"
# "codotype-generator"
# "codotype-nodejs-express-mongodb-generator"
# "codotype-react-generator"
# "codotype-runtime"
# "codotype-util"
# "codotype-vuejs-vuex-bootstrap-generator"
# "codotype-web"

# # # #

# Ensures presence of user argument
if [ $1 ]; then
  echo "Cloning repositories for GitHub user $1"
else
  echo "ERROR - please pass in a GitHub username, for example:\n\n\t sh ./setup.sh aeksco\n"
  exit 1
fi

# Shorter list of repos for testing
# repos="codotype-api"
repos="codotype-api codotype-blueprints codotype-cli codotype-flask-postgresql-generator codotype-generator codotype-nodejs-express-mongodb-generator codotype-react-generator codotype-runtime codotype-util codotype-vuejs-vuex-bootstrap-generator codotype-web"

# Iterate over each repository and bootstrap local copies
for repo in $repos
do
  # Clones repo into ./packages/$repo
  git clone git@github.com:$1/$repo.git ./packages/$repo

  # CDs into the cloned directory
  cd ./packages/$repo

  # Adds the upstream @codotype remote to the repository
  git remote add upstream git@github.com:codotype/$repo.git

  # Jumps back up into the root ./codotype repo directory
  cd ../../

  # Prints status message
  echo "Setup $repo repository\n"

  pwd
done

# You can access them using echo "${arr[0]}", "${arr[1]}" also

# # # #

# git clone git@github.com:rcos/rcos-handbook.git ./packages/rcos-handbook
