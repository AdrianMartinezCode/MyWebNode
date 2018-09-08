import {Router, Request, Response, NextFunction} from 'express';
import { BaseRouter } from "./BaseRouter";
/*import {    Entities as EntitiesData, 
            MediaEntity as MediaEntityData, 
            Status as StatusData,
            User as UserData } from 'twitter-d';*/
//import { Status as Tweet, User } from 'twitter-d';

var keys = require('../../security/api_keys_twitter.js');
var TwitterPack = require('twitter');
var Twitter = new TwitterPack(keys);


export class TwitterRouter extends BaseRouter {

    public static path : string = "/api/v1/twitter";
    private static twitterRouter : TwitterRouter = null;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
    */
    public static getInstance(router: Router) {
        if (TwitterRouter.twitterRouter == null) {
            TwitterRouter.twitterRouter = new TwitterRouter();
        }
        router.get(TwitterRouter.path, (req: Request, res: Response, next: NextFunction) => {
            TwitterRouter.twitterRouter.getLastTweetsPosted(req, res, next);
        });
        return TwitterRouter.twitterRouter;
    }

    router: Router;

    //twitter: Twitter;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
    */
    /*public static create(router: Router) {
        router.get("/api/v1/twitter", (req: Request, res: Response, next: NextFunction) => {
            new TwitterRouter().index(req, res, next);
        });
    }*/

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
    */
    private constructor() {
        super();
    }

    public getLastTweetsPosted(req: Request, res: Response, next: NextFunction) {
        //Twitter.
        
        var params = {count: '30'};

        Twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (error) {
                //res.end();
                res.send();
                //throw error;
            } else {
                res.send(tweets);
                //res.writeHeader(200, {"Content-Type": "application/json"});
                //res.end(JSON.stringify(tweets));
            }
        });

        //Tweet.
        //this._data.
    }
}
