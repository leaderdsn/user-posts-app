import { configure } from "mobx";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import { Home } from "../../pages/home";
import { Posts } from "../../pages/posts";
import { PostDetails } from "../../pages/post-details";
import "./app.css";

configure({
    enforceActions: "always",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true,
});

export const App = () => {
    return (
        <>
            <div className="app">
                <Router>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/posts/:user_id/:name/" exact component={Posts} />
                        <Route path="/post-details/:user_id/:name/:id/:title/:body" exact component={PostDetails} />
                        <Redirect to="/" />
                    </Switch>
                </Router>
            </div>
        </>
    );
};
