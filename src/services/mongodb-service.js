const MongoClient = require('mongodb').MongoClient;
const config = require('../config/const');


exports.insertOneByOne = async (_listToInsertOnMongoDB) =>
{
    let url = config.mongodbConnectionString;
    let dbName = 'teste';

    let client = new MongoClient(url, { useNewUrlParser : true });
    
    try
    {
        await client.connect();

        let db = client.db(dbName);

        let insertedAmount = 0;
        if(_listToInsertOnMongoDB && Array.isArray(_listToInsertOnMongoDB))
        {
            for(let i=0;i<_listToInsertOnMongoDB.length;i++)
            {
                await db.collection('testeInsercao').insertOne(_listToInsertOnMongoDB[i]);
                insertedAmount++;
            }

        }
        return {message: `Inserted [${insertedAmount}] items`};
    }
    catch(err)
    {
        console.error("Falha na insercao individual MongoDB");
        throw err;
    }
};

exports.insertMany = async (_listToInsertOnMongoDB) =>
{
    let url = config.mongodbConnectionString;
    let dbName = 'teste';

    let client = new MongoClient(url, { useNewUrlParser : true });

    try
    {
        await client.connect();

        let db = client.db(dbName);

        let insertedAmount = 0;
        if(_listToInsertOnMongoDB && Array.isArray(_listToInsertOnMongoDB))
        {
            let returnable = await db.collection('testeInsercao').insertMany(_listToInsertOnMongoDB);

            insertedAmount = returnable.insertedCount;
        }
        
        return {message: `Inserted [${insertedAmount}] items`};
    }
    catch(err)
    {
        console.error("Falha na insercao insertMany MongoDB");
        throw err;
    }
};

exports.insertBulk = async (_listToInsertOnMongoDB) =>
{
    let url = config.mongodbConnectionString;
    let dbName = 'teste';

    let client = new MongoClient(url, { useNewUrlParser : true });

    try
    {
        await client.connect();

        let db = client.db(dbName);

        let collection = db.collection('testeInsercao');

        let bulk = collection.initializeUnorderedBulkOp();

        let insertedAmount = 0;

        if(_listToInsertOnMongoDB && Array.isArray(_listToInsertOnMongoDB))
        {
            for(let i=0;i<_listToInsertOnMongoDB.length;i++)
            {
                bulk.insert(_listToInsertOnMongoDB[i]);
            }
        }

        let resultBulk = await bulk.execute();

        return {message: `Inserted all items`};
    }
    catch(err)
    {
        console.error("Falha na insercao bulk MongoDB");
        throw err;
    }
};