import React from 'react';
import PropTypes from "prop-types";
import {FormControl, FormHelperText, Grid, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const FormSelect = ({label, name, value, onChange, error, required, options, onClick}) => (
    <Grid item>
        <FormControl fullWidth error={Boolean(error)}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                required={required}
                labelId={`${name}-label`}
                fullWidth
                label={label}
                name={name}
                value={value}
                onChange={onChange}
            >
                {options.map(option => (
                    option.published ?
                        <MenuItem
                            key={option._id}
                            value={option._id}
                            onClick={onClick ? () => onClick(option._id) : null}
                        >
                            {option.name || option.title}
                        </MenuItem> : null
                ))}
            </Select>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    </Grid>
);

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(Object).isRequired,
};

export default FormSelect;