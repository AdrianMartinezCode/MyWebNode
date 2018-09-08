import {Router, Request, Response, NextFunction} from 'express';
import * as path from 'path';
import { BaseRouter } from "./BaseRouter";



export class IndexRouter extends BaseRouter {

    public static path : string = "/";
    private static indexRouter : IndexRouter = null;

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
    */
    public static getInstance(router: Router) {
        if (IndexRouter.indexRouter == null) {
            IndexRouter.indexRouter = new IndexRouter();
        }
        router.get(IndexRouter.path, (req: Request, res: Response, next: NextFunction) => {
            IndexRouter.indexRouter.index(req, res, next);
        });
        return IndexRouter.indexRouter;
    }

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
    */
    private constructor() {
        super();
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "Home | Tour of Heros";

        //set options
        let options: Object = {
            "message": "Welcome to the Tour of Heros"
        };

        //render template
        this.render(req, res, "index", options);
    }


    /*public servePage(req: Request, res: Response, next: NextFunction) {
        try {
            res = Fs.readSync(req.path);
        }
        //logger.arguments(req.path);
        //console.log(req.path);

        res.sendFile(path.join(__dirname, '../../www' + req.path));
    }*/

}

