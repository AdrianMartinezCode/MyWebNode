import { NextFunction, Request, Response } from "express";

/**
 * Constructor
 *
 * @class BaseRoute
 */
export abstract class BaseRouter {

    protected title: string;

    private scripts: string[];

    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    protected constructor() {
        //initialize variables
        this.title = "Tour of Heros";
        this.scripts = [];
    }

    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    public addScript(src: string): BaseRouter {
        this.scripts.push(src);
        return this;
    }

    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    public render(req: Request, res: Response, view: string, options?: Object) {
        //add constants
        res.locals.BASE_URL = "/";

        //add scripts
        res.locals.scripts = this.scripts;

        //add title
        res.locals.title = this.title;

        //render view
        res.render(view, options);
    }
}

/*
Brian Love comment about this class:

My BaseRoute is currently pretty thin. But, this will serve as a way to implement authentication in my application later, 
and possibly many other features that all routes need to have.

I have a title string variable that will hold the title for the route.

As an example the BaseRoute currently stores an array of scripts that are necessary for a specific route. You might also 
want to define scripts in your BaseRoute that all routes will require. This is just an example of a feature that you may 
want to implement in the BaseRoute that will be available to all of your routes.

Further, the BaseRoute class has a render() method. This will be invoked in each of the route methods in our extending 
classes. This provides us a single method to render a view with common local template variables defined.

In this example, I am setting BASE_URL, scripts and title into each view.


*/