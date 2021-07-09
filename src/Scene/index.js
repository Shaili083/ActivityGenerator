import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SelectComponent from "../Components/SelectComponent";
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';





const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
});
const Generator = (props) => {
    const { classes } = props;

    const [activity, setActivity] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('none');
    const [selectedFilter, setSelectedFilter] = useState('none')


    //To add an activity
    const addActivity = async () => {
        const fetchedActivity = await axios.get("https://www.boredapi.com/api/activity/");
        if (fetchedActivity.data) {
            let obj = fetchedActivity.data
            obj["status"] = 'none'
            setActivity([...activity, obj])
        }

    }
    //Sorting activity in desc
    const sortArray = () => {
        const tobeSorted = activity;
        const sorted = tobeSorted.sort((a, b) => b.participants - a.participants)
        setActivity([...sorted]);
    }

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
        event.stopPropagation();
    };



    return <div>
        <button onClick={() => addActivity()} className="genrate-button">Generate A New Activity</button>
        <button onClick={() => sortArray()} className="genrate-button">Sort By Number Of Participants</button>

        <div>{activity.map(item =>

            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="detail-container">


                        <div>
                            <div className="activity-details">Activity: {item.activity}</div>
                            <div className="activity-details">Type: {item.type}</div>
                        </div>
                        <div>
                            <div className="activity-details">No.of participants: {item.participants}</div>
                            <div className="activity-details">link: {item.link}</div>
                        </div>

                        <div className="status-container">Status:&nbsp;
                        <SelectComponent />
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Activity Description :  <input className="descr-input" onChange={(e) => e.target.value} />
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        )}</div>
    </div>
}


export default withStyles(styles)(Generator);