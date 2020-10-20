import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/addStore";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    name: '',
    area: '',
    address: ''
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width: "50%"
    }
})

const AddStoreForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.addStoreList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.name = values.name ? "" : "This field is required."
        temp.area = values.area ? "" : "This field is required."
        temp.message = values.message ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content="Submitted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (props.currentId == 0)
                props.createaddStore(values, onSuccess)
            else
                props.updateaddStore(props.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="name"
                variant="outlined"
                label="store name"
                fullWidth
                value={values.title}
                onChange={handleInputChange}
                {...(errors.name && { error: true, helperText: errors.name })}
            />
            <TextField
                name="area"
                variant="outlined"
                label="area"
                fullWidth
                
                value={values.area}
                onChange={handleInputChange}
                {...(errors.area && { error: true, helperText: errors.area })}
            />
            <TextField
                name="address"
                variant="outlined"
                label="address"
                fullWidth
                
                value={values.address}
                onChange={handleInputChange}
                {...(errors.address && { error: true, helperText: errors.address })}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
            >Submit</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    addStoreList: state.addStore.list
})

const mapActionToProps = {
    createaddStore: actions.create,
    updateaddStore: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AddStoreForm));