export const Role = {
  Leader: "Leader",
  Follower: "Follower",
  Candidate: "Candidate",
  Witness: "Witness",
};

export const RoleStyle = {
  [Role.Leader]: {
    color: "green",
    strokeColor: "black",
    strokeWidth: 2,
  },
  [Role.Follower]: {
    color: "blue",
    strokeColor: "black",
    strokeWidth: 2,
  },
  [Role.Candidate]: {
    color: "orange",
    strokeColor: "black",
    strokeWidth: 2,
  },
  [Role.Witness]: {
    color: "purple",
    strokeColor: "black",
    strokeWidth: 2,
  },
};

export class Voter {
  constructor(name, role) {
    this.name = name;
    this.role = role || role.Follower;
    this.term = 0;
    this.subterm = 0;
    this.replicationSet = [];

    this.down = false;
    this.isolated = false;

    this.x = this.y = 0;
    this.r = 50;
  }

  render(canvas) {
    this.vizCircle = canvas.append("circle");
    this.vizName = canvas.append("text");
    this.vizProperties = canvas.append("text");
    this.refresh();
  }

  refresh() {
    this.vizCircle
      .attr("cx", this.x)
      .attr("cy", this.y)
      .attr("r", this.r)
      .attr("fill", RoleStyle[this.role].color)
      .attr("stroke", RoleStyle[this.role].strokeColor)
      .attr("stroke-width", RoleStyle[this.role].strokeWidth)
      .attr("id", this.name);

    this.vizName
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("dy", ".3em")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "1.5em")
      .text(this.name);

    this.vizProperties
      .attr("x", this.x)
      .attr("y", this.y + this.r)
      .attr("text-anchor", "middle");

    this.vizProperties.selectAll("tspan").remove();

    this.vizProperties
      .selectAll("tspan")
      .data(() => {
        if (this.role == Role.Leader || this.role == Role.Witness) {
          return [
            "Term: " + this.term,
            "Subterm: " + this.subterm,
            "RS: {" + this.replicationSet.join(", ") + "}",
          ];
        } else {
          return ["Term: " + this.term];
        }
      })
      .enter()
      .append("tspan")
      .attr("x", this.x) // Keep x the same for centering
      .attr("dy", "1.2em") // Offset lines
      .text((d) => d);
  }
}
