import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { user } from '../functions/auth';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { toast } from 'react-toastify';
import {updatedone, updateundone} from "../functions/todo"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom:"0.3em"
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightBold,
  }
}));

function Accordation({todos, handleDelete}) {
  const classes = useStyles();
  const [userId, setuserId] = useState(0);
  const email  = localStorage.getItem("email");
  const token  = localStorage.getItem("token");

  useEffect(() => {
      const value = async () => {
        await user(token, email)
        .then((res) => {
            setuserId(res.data.id);
        })
        .catch((err) => {
            console.log("Cannot get user", err)
        })
      }
      value()
  }, [userId]);

  //marking the task as done
  const handleCheckBox = async (id) => {
      await updatedone(token, id)
      .then(res => {
        toast.success('Congratulations on completing your task!')
      })
      .catch(err => {
          toast.error("Sorry! we could not update your action")
      })
  }

  //marking the task as undone
  const handleCheckBoxundo = async (id) => {
    await updateundone(token, id)
    .then(res => {
      toast.success('Your task has been marked UnDone!')
    })
    .catch(err => {
        toast.error("Sorry! we could not update your action")
    })
}

  return (
      <>
    {(todos)?(todos.filter((l) => {
        return l.user_id == userId
    }).map(list => <div key={list.id} className={classes.root}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
                >
                <Typography className={classes.heading}>{list.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography color="textSecondary">
                    {list.body?
                    <spam>
                        {list.body}
                    </spam>
                    :
                    (<>
                        <i className="text-danger">You have not added a comment!</i>
                    </>
                    )}
                </Typography>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                <Button size="small" className="clr text-danger" onClick={(e) => handleDelete(list.id)}>Delete</Button>
                {(list.is_completed == 0)?(<Button size="small" className="text-success" onClick={e => handleCheckBox(list.id)} >
                    Done
                </Button>):<Button size="small" className="text-success" onClick={(e) => handleCheckBoxundo(list.id)} >
                    UNDO
                </Button>}
                </AccordionActions>
            </Accordion>
        </div>
    )
    ):(<div className="text-center">Your List is empty!</div>)}
    </>
  );
}
export default Accordation
