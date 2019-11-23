'use strict';

const service = require('../services/mongodb-service');

exports.insertOneByOne = async (req, res, next) => 
{
    try 
    {
        let resp = await service.insertOneByOne(req.body);

        res.status(200).send({
            message: resp
        });
    }
    catch (err) 
    {
        console.log(err);
        res.status(500).send({
            message: 'Falha no cadastro do pedido'
        });
    }
};

exports.insertMany = async (req, res, next) => 
{
    try 
    {
        let resp = await service.insertMany(req.body);

        res.status(200).send({
            message: resp
        });
    }
    catch (err) 
    {
        console.log(err);
        res.status(500).send({
            message: 'Falha no cadastro do pedido'
        });
    }
};

exports.insertBulk = async (req, res, next) => 
{
    try 
    {
        let resp = await service.insertBulk(req.body);

        res.status(200).send({
            message: resp
        });
    }
    catch (err) 
    {
        console.log(err);
        res.status(500).send({
            message: 'Falha no cadastro do pedido'
        });
    }
};