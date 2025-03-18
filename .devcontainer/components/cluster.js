import { Role, Voter } from "./voter.js";

export class Cluster {
  constructor(names) {
    this.names = names;
    this.x = 0;
    this.y = 0;
    this.r = 100;
    this.offsetAngle = 0;
    this.voters = [];
  }

  render(canvas) {
    const angles = d3
      .range(this.names.length)
      .map((i) => (i * 2 * Math.PI) / this.names.length);

    for (let i = 0; i < this.names.length; i++) {
      const angle = (i * 2 * Math.PI) / this.names.length + this.offsetAngle;
      const x = this.x + this.r * Math.cos(angle);
      const y = this.y + this.r * Math.sin(angle);
      let v = new Voter(this.names[i], Role.Follower);
      v.x = x;
      v.y = y;
      v.render(canvas);
      this.voters.push(v);
    }
    this.canvas = canvas;
  }

  elect(name) {
    let v = this.voter(name);
    if (v) {
      v.role = Role.Leader;
      v.refresh();
    }
  }

  voter(name) {
    return this.voters.find((v) => v.name === name);
  }

  send(from, to) {
    let vFrom = this.voter(from);
    let vTo = this.voter(to);
    if (vFrom && vTo) {
      this.canvas
        .append("circle")
        .attr("cx", vFrom.x)
        .attr("cy", vFrom.y)
        .attr("r", 15)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .transition()
        .duration(2000)
        .attr("cx", vTo.x)
        .attr("cy", vTo.y)
        .on("end", function () {
          d3.select(this).remove();
        });
    }
  }
}
