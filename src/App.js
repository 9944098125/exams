import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Branches from "./components/Branches";
import Home from "./components/Home";
import Exams from "./components/Exams";
import Questions from "./components/Questions";
import "./App.css";

export default function App() {
  return (
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/branches" component={Branches} />
      <Route exact path="/exams" component={Exams} />
      <Route exact path="/questions" component={Questions} />
    </Switch>
  );
}
