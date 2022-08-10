# Book-site

## Usage
run `docker-compose up` command at the root of this project. This will start up backend and frontend applications as well as create database.
Both projects run on compose like they would be runnin individually on local development. I didn't feel the need to create separate "production" like
configuration because of I didn't want to use more time for this. Also in production frontend propably would come from cdn?

## Development

### Backned
Basic typescript node express project. At the root of project run `npm i` first and then `npm run dev`. If you don't have sqlite db already project will create that for youy and runs init migration with some data. `dev` is configured to use nodemon that reloads sever when files are changed. This is only dev dependency


### Frontend
Basic `create-react-app` template with typescript on top. Run `npm star` at the root of project to start local development. There are some common types that exists in both projects but because `create-react-app` doens't like outside dependencies for types I felst that easiest this is to duplicate them when their form is nomalized. Some documentation told that ejecting reat app and using custom webpack would solve this but again time was my contrain and didn't do this. Common types propably would exists in some common project only for types. Of course if backend would use some other language than javascript some runtime validation at frontend queries would be nice.


## Test
Both project have simple unit tests with `Jest`. They can be run with `npm run test`command at root of both projects. Also they are run at github actions every time `main` branch has push event. With team using actiona at branches would be nice. Did not create e2e test but playwright or something similar would be nice. Again time issue.
