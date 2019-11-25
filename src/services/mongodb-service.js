const MongoClient = require('mongodb').MongoClient;
const config = require('../config/const');
const dbName = 'rocketseat';
const collectionName = 'insertion';
const url = config.mongodbConnectionString;
const client = new MongoClient(url, { useNewUrlParser : true });


exports.insertOneByOne = async (_identifier, _listToInsertOnMongoDB) =>
{
    try
    {
        await client.connect();

        let db = client.db(dbName);

        let insertedAmount = 0;
        if(_listToInsertOnMongoDB && Array.isArray(_listToInsertOnMongoDB))
        {
            for(let i=0;i<_listToInsertOnMongoDB.length;i++)
            {
                _listToInsertOnMongoDB[i].whois = _identifier;
                await db.collection(collectionName).insertOne(_listToInsertOnMongoDB[i]);
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

exports.insertMany = async (_identifier, _listToInsertOnMongoDB) =>
{
    try
    {
        await client.connect();

        let db = client.db(dbName);

        let insertedAmount = 0;
        if(_listToInsertOnMongoDB && Array.isArray(_listToInsertOnMongoDB))
        {
            _listToInsertOnMongoDB = _listToInsertOnMongoDB.map(l => {
                l.whois = _identifier;
                return l;
            });

            let returnable = await db.collection(collectionName).insertMany(_listToInsertOnMongoDB);

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

exports.insertBulk = async (_identifier, _listToInsertOnMongoDB) =>
{
    try
    {
        await client.connect();

        let db = client.db(dbName);

        let collection = db.collection(collectionName);

        let bulk = collection.initializeUnorderedBulkOp();

        let insertedAmount = 0;

        if(_listToInsertOnMongoDB && Array.isArray(_listToInsertOnMongoDB))
        {
            for(let i=0;i<_listToInsertOnMongoDB.length;i++)
            {
                _listToInsertOnMongoDB[i].whois = _identifier;
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