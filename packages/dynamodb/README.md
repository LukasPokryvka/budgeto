# How to setup local DynamoDB env

## Requirements:

1. [Docker](https://www.docker.com/products/docker-desktop)

2. [AWS CLI](https://aws.amazon.com/cli/)

3. [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)

4. [Node.js](https://nodejs.org/en/)

### Create Docker Network

```
docker network create local-api
```

### Run DynamoDB and connect to network

```
cd packages/dynamodb
docker compose up -d
```

You can confirm that it's running by executing:

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

You should get an empty array of TableNames

### Create a DynamoDB local connection in NoSQL Workbench

Go to operation builder and add a new connection (DynamoDB local). Give it a name and leave the default port.

In Data Modeler, create Data Model, then create Table.

In Visualiser -> Commit to Amazon DynamoDB -> Saved connections -> your connection.

In Operation builder -> your connection, you should see your table.

Now you can choose an operation and edit your table data.

On the same tab, you can see a key button under Connection name. Click it and it will show you your testing AWS credentials, which you can set up by running _aws configure_ in your terminal.
