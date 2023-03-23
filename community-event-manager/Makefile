runTests:
	npm test -- --watchAll=false
	npm run lint

mockApi:
	docker run -d --mount type=bind,source=$(abspath $(CURDIR))/mockoon.json,target=/data,readonly -p 3001:3001 mockoon/cli:latest --data data --port 3001

startLocal: mockApi
	npm start

