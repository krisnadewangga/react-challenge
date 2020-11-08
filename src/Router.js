import React, { lazy } from "react"
import { BrowserRouter as Router , Switch, Route } from "react-router-dom"
import history from "./history"

const dataTableComponent = lazy(() => import("../src/component/DataTableComponent/DataTableComp"))
const dataVisualComponent = lazy(() => import("../src/component/DataVisualComponent/DataVisualComponent"))


const RouteConfig = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <Component {...props} />
      )
    }}
  />
)

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <RouteConfig exact path="/" component={dataTableComponent} />
          <RouteConfig path="/data-table" component={dataTableComponent} />
          <RouteConfig path="/data-visual" component={dataVisualComponent} />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
