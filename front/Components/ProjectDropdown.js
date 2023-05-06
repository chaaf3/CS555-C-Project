import { Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Project from "./Project";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ProjectDropdown({ projectId }) {
  const [expanded, setExpanded] = React.useState(false);
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3001/project/${projectId}`
      );
      setProjectData(data);
      setLoading(false);
    }
    fetch();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (!loading)
    return (
      <Card
        style={{ backgroundColor: "gray" }}
        className="card"
        sx={{ width: 500 }}
      >
        <CardContent className="card-title">
          <Typography>{projectData.title}</Typography>
        </CardContent>

        <CardActions>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Typography>V</Typography>
          </ExpandMore>
        </CardActions>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <CardContent>
            <Project id={projectId} />
          </CardContent>
        </Collapse>
      </Card>
    );
}

export default ProjectDropdown;
