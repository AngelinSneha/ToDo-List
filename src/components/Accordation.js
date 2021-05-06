import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {list} from "../functions/todo"
import { user } from '../functions/auth';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginBottom:"0.3em"
  },
});

function Accordation({todos}) {
  const classes = useStyles();
  const [userId, setuserId] = useState(0);
  const email  = localStorage.getItem("email");
  const token  = localStorage.getItem("token");

  useEffect(() => {
      const value = async () => {
        await user(token, email)
        .then((res) => {
            console.log('user', res.data)
            setuserId(res.data.id);
            console.log('user id', userId)
        })
        .catch(err => {
            console.log("Cannot get user")
        })
      }
      value()
  }, [userId])

  const handleCheckBox = () => {
      console.log("CheckBox Clicked")
  }
  console.log('acordation', todos)

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
                <FormControlLabel
                    aria-label="Acknowledge"
                    onClick={handleCheckBox}
                    onFocus={(event) => event.stopPropagation()}
                    control={<Checkbox />}
                    label={list.title}
                />
                </AccordionSummary>
                <AccordionDetails>
                <Typography color="textSecondary">
                    {list.body?list.body:(<i className="text-danger">You have not added a comment!</i>)}
                </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
    ):(<div>Your List is empty!</div>)}
    </>
  );
}
export default Accordation
