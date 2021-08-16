import { Route, Redirect } from 'react-router-dom';

// Simple Auth check with out token just to stop us to navigate in any private route
export const CandidateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // Here need to check if Token exist because is unsecure
        sessionStorage.getItem("status") === "Candidate" ||
            sessionStorage.getItem("status") === "Admin" // TODO: TOKEN
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/Login',
                state: { from: props.location }
            }} />
    )} />
)

// Simple Auth check with out token just to stop us to navigate in any private route
export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // Here need to check if Token exist because is unsecure
        sessionStorage.getItem("status") === "Admin" // TODO: TOKEN
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/Login',
                state: { from: props.location }
            }} />
    )} />
)

// Simple Auth check with out token just to stop us to navigate in any private route
export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // Here need to check if Token exist because is unsecure
        !sessionStorage.getItem("status") // TODO: TOKEN
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/Login',
                state: { from: props.location }
            }} />
    )} />
)