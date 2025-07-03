"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom/client");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var factories_1 = require("./app/pages/factories");
var Wrapper_1 = require("./app/common/Wrapper");
require("./main.css");
var add_factory_1 = require("./app/pages/add-factory");
var report_1 = require("./app/pages/report");
var router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: '/',
        element: <Wrapper_1.Wrapper />,
        children: [
            {
                path: '',
                loader: function () { return (0, react_router_dom_1.redirect)('/factories'); },
            },
            {
                path: 'factories',
                element: <factories_1.FactoriesPage />,
            },
            {
                path: 'add',
                element: <add_factory_1.AddFactoryPage />,
            },
            {
                path: 'reports/:reportId',
                element: <report_1.ReportPage />,
            },
            {
                path: '*',
                element: <p>Not found.</p>,
            },
        ],
        errorElement: <p>An error has occurred.</p>,
    },
]);
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<react_1.default.StrictMode>
    <react_router_dom_1.RouterProvider router={router}/>
  </react_1.default.StrictMode>);
