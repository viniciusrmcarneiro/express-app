mkdir -p mongo-data
docker run --rm --name some-mongo -v $(pwd)/mongo-data:/data/db -d -p "27017:27017" mongo