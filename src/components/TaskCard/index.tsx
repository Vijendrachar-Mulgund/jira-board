import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ name, status, onDragStart, onEdit, onDelete, onView }: any) {
  return (
    <Card draggable onDragStart={onDragStart} sx={{ minWidth: "100%", marginY: 2, cursor: "pointer" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {status}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button onClick={onView} size="small">
            Details
          </Button>
        </div>
        <div>
          <Button onClick={onEdit} size="small">
            Edit
          </Button>
          <Button onClick={onDelete} color="error" size="small">
            Delete
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
