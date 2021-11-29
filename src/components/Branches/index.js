import { Component } from "react";
import Cookies from "js-cookie";

export default class Branches extends Component {
  state = {
    branches: [],
  };

  componentDidMount() {
    this.getBranches();
  }

  getBranches = async (event) => {
    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken);
    const branchesUrl =
      "http://testing-intern-api.herokuapp.com/api/branch/branches";
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(branchesUrl, options);
    const data = await response.json();
    console.log(data);
    const updatedData = data.map((eachBranch) => ({
      branch_id: eachBranch.branchId,
      name: eachBranch.name,
      capacity: eachBranch.capacity,
    }));
    if (response.ok) {
      this.setState({
        branches: updatedData,
      });
    }
  };

  render() {
    const { branches } = this.state;

    return (
      <div className="branches">
        {branches.map((branch) => (
          <li className="each-branch" key={branch.branchId}>
            <p>{branch.name}</p>
            <p>{branch.capacity}</p>
          </li>
        ))}
      </div>
    );
  }
}
