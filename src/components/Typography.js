import React from 'react';
import Typography from '@material-ui/core/Typography';

const cardComponent = props => {
    const { align, color, display, gutterBottom, variant, text } = props
    return (
        <Typography align={align}
            color={color}
            display={display}
            gutterBottom={gutterBottom}
            variant={variant}>
            {text}
        </Typography>
    )
}
export default cardComponent