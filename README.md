mkdir -p mongo-data
docker run --name some-mongo \
 -v $(pwd)/mongo-data:/data/db \
 -v $(pwd)/scripts:/scripts \
 -d -p "27017:27017" \
 mongo
 
 
 docker exec some-mongo mongo localhost:27017/express-app /scripts/create-admin-user.js
 