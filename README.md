#### setup
```
npm install
npm start
```
To access the page go to [localhost:3000](http://127.0.0.1:3000) in your browser

#### Deployment
```
npm run build
aws s3 sync ./build s3://reachaf/
```

