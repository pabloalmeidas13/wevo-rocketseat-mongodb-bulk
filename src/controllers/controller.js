'use strict';

const service = require('../services/mongodb-service');

exports.insertOneByOne = async (req, res, next) => 
{
    try 
    {
        let myName = req.header('myname');
        let resp = await service.insertOneByOne(myName, req.body);

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
        let myName = req.header('myname');
        let resp = await service.insertMany(myName, req.body);

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
        let myName = req.header('myname');
        let resp = await service.insertBulk(myName, req.body);

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