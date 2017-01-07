import * as restify from 'restify';
import { logger } from '../services/logger';
import { AWSSettings } from '../config/config';
import * as aws from 'aws-sdk';

// AWS settings
aws.config.update(AWSSettings);

// Dynamo DB Sao Paulo
const docClient = new aws.DynamoDB.DocumentClient ();

export default class routeController {
   // POST EndPoint
    public post (req: restify.Request, res: restify.Response, next: restify.Next) {

        // String to Array Casting
        let casting =  req.params.cast.replace(/'/g, '"');
        casting = JSON.parse(casting);
        // Dynamo DB Operation Parameters
        let params = {
            TableName : 'Movies',
            Item : {
                id:  parseInt(req.params.id),
                title: req.params.title,
                description: req.params.description,
                cast: casting
            } 
        };
        // AWS SDK Promises
        let docClientPut = docClient.put(params).promise();

        docClientPut.then(function (data){
            res.json(200,"Added item:" + JSON.stringify(data, null, 2));
        }).catch(function(err){
            res.json(200,"Unable to add item. Error JSON:" +  JSON.stringify(err, null, 2));
        });
        return next();
    }
    // GET EndPoints (/api/movie fetchs All Movies - /api/movie/:id fetch specific movie)
	public get(req: restify.Request, res: restify.Response, next: restify.Next) {
        // Dynamo DB Operation Parameters
        let params : any = {} ;
        params.TableName = 'Movies';        
        // Fetch specific movie
        if (req.params.id) {
            // Dynamo DB Operation Parameters
            params.Key = {id: parseInt(req.params.id)}
            // AWS SDK Promises
            let docClientGet = docClient.get(params).promise(); 
            
            docClientGet.then (function (data){
                res.json (200, data);
            }).catch (function(err){
                res.json(200,"Unable to read item. Error JSON:" + JSON.stringify(err, null, 2));
            })
        // Scan all movies    
        } else {
            // Dynamo DB Operation Parameters
            params.ProjectionExpression =  'id, title, description, #cst';
            params.ExpressionAttributeNames = {"#cst": "cast"};
            // AWS SDK Promises
            let docClientScan = docClient.scan(params).promise();

            docClientScan.then (function(data) {
                res.json (200, data.Items);
            }).catch(function(err){
                res.json(200,"Unable to scan the table. Error JSON:" + JSON.stringify(err, null, 2));
            });         
        }
		return next();
	}
    // PUT EndPoint
    public put(req: restify.Request, res: restify.Response, next: restify.Next) {
        if (req.params.id) {
            // Dynamo DB Operation Parameters
            let params : any = {};
            params.TableName = 'Movies';
            params.Key = {id: parseInt(req.params.id)} 
            // AWS SDK Promises
            let docClientGet = docClient.get(params).promise(); 
            // Check if item exists and Update it
            docClientGet.then (function (data ){
                // Handle Data from Dynamo DB
                let handleData : any = data.Item;
                // Update set
                params.UpdateExpression = "set title = :t, description = :d, #cst = :c";
                params.ExpressionAttributeValues = {
                    ":t": req.params.title || handleData.title ,
                    ":d": req.params.description || handleData.description,
                    ":c": req.params.cast || handleData.cast
                }
                params.ExpressionAttributeNames = {"#cst": "cast"};
                params.ReturnValues = "UPDATED_NEW";
                // AWS SDK Promises
                let docClientUpdate = docClient.update(params).promise();

                docClientUpdate.then(function (data) {
                    res.json (200,"Update Item succeeded:" +  JSON.stringify(data, null, 2));
                }).catch(function(err){
                    res.json(200,"Unable to update item. Error JSON:" + JSON.stringify(err, null, 2));
                });

            }).catch (function(err){
                res.json(200,"Unable to read item. Item does not exists");
            })
        }
        return next();    
    }
    // DELETE EndPoint
    public delete(req: restify.Request, res: restify.Response, next: restify.Next) {
        // Dynamo DB Operation Parameters
        let params = {
            TableName : 'Movies',
            Key: {id: parseInt(req.params.id)}
        }
        // AWS SDK Promises
        let docClientDelete = docClient.delete(params).promise();
        docClientDelete.then(function(data){
            res.json (200,"Delete Item succeeded:" +  JSON.stringify(data, null, 2));
        }).catch(function(err){
            res.json(200,"Unable to delete item. Error JSON:" + JSON.stringify(err, null, 2));
        });
    }

}