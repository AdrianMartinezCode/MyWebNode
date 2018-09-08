import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import { TwitterRouter } from './routes/TwitterRouter';

// Use { IndexRouter } when the class hasn't default export
import { IndexRouter } from './routes/IndexRouter';

export class App {
    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
    */
    public static bootstrap(): App {
        return new App();
    }

    constructor() {
        this.app = express();
        this.config();

        this.routes();
        
    }

    private config(): void {
        // add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        // configure pug
        this.app.set("views", path.join(__dirname, "public"));
        this.app.set("view engine", "pug");

        // use logger middleware
        this.app.use(logger('dev'));



        //use json form parser middlware
        this.app.use(bodyParser.json());

        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //use cookie parser middleware
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        
        //use override middlware
        this.app.use(methodOverride());

        //catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

    private routes() : void {
        let router : express.Router = express.Router();

        IndexRouter.getInstance(router);
        TwitterRouter.getInstance(router);

        this.app.use(router);


        // placeholder route handler

        

        /*router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
            //res.render('index');
        });
        router.get('/', (req, res, next) => {
            res.render(req.path);
        });*/

        /*
            That route is the main path, for load the files directly.
        */
        //this.express.use('/', PageRouter());

        /*
            This path is for twitter api

        */
        //this.express.use('/api/v1/twitter', TwitterRouter);
    }
}

//export default new App().express